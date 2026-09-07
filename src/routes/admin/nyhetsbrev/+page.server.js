import { fail, redirect } from '@sveltejs/kit';
import { count } from 'drizzle-orm';
import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { subscribers } from '$lib/server/db/schema';
import { send, sendNewsletter } from '$lib/server/mail';
import { parseBlocks, renderNewsletter } from '$lib/server/newsletter';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	if (!locals.user) redirect(303, '/admin/login');
	const [{ n }] = await db.select({ n: count() }).from(subscribers);
	return { user: locals.user, subscriberCount: n };
}

/**
 * Läser och validerar formuläret och renderar mailet. Samma steg för förhandsgranskning,
 * test och skarpt utskick — det som förhandsgranskas är exakt det som skickas.
 * @param {Request} request
 */
async function build(request) {
	const f = await request.formData();
	const subject = String(f.get('subject') ?? '').trim();
	const previewText = String(f.get('previewText') ?? '').trim();
	if (!subject) return { error: 'Skriv ett ämne.' };

	const parsed = parseBlocks(String(f.get('blocks') ?? '[]'));
	if ('error' in parsed) return { error: parsed.error };
	if (parsed.blocks.length === 0) return { error: 'Lägg till minst ett block.' };

	const { html, text } = await renderNewsletter({
		subject,
		previewText,
		blocks: parsed.blocks,
		origin: env.ORIGIN ?? ''
	});
	return { subject, previewText, html, text, confirmed: !!f.get('confirm') };
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
	preview: async ({ request }) => {
		const r = await build(request);
		if ('error' in r) return fail(400, { error: r.error });
		return { html: r.html };
	},

	test: async ({ request, locals }) => {
		if (!locals.user) redirect(303, '/admin/login');
		const r = await build(request);
		if ('error' in r) return fail(400, { error: r.error });
		const ok = await send(locals.user.email, `[TEST] ${r.subject}`, r.text, r.html);
		if (!ok) {
			return fail(500, {
				error: 'Kunde inte skicka testmailet — kontrollera RESEND_API_KEY och RESEND_FROM.',
				html: r.html
			});
		}
		return { html: r.html, tested: locals.user.email };
	},

	send: async ({ request }) => {
		const r = await build(request);
		if ('error' in r) return fail(400, { error: r.error });
		if (!r.confirmed) return fail(400, { error: 'Bekräfta utskicket först.', html: r.html });
		try {
			const id = await sendNewsletter(r.subject, r.html, r.text, r.previewText);
			return { sent: id };
		} catch (e) {
			return fail(500, {
				error: e instanceof Error ? e.message : 'Utskicket misslyckades.',
				html: r.html
			});
		}
	}
};
