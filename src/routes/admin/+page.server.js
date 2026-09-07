import { fail, redirect } from '@sveltejs/kit';
import { asc, desc, eq } from 'drizzle-orm';
import { APIError } from 'better-auth/api';
import { auth } from '$lib/server/auth';
import { createAdmin } from '$lib/server/admins';
import { db } from '$lib/server/db';
import { retailerApplications, subscribers, user } from '$lib/server/db/schema';

const STATUSES = ['ny', 'kontaktad', 'klar'];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	// Hooken har redan spärrat oinloggade; det här smalnar bara av typen.
	if (!locals.user) redirect(303, '/admin/login');

	const [subs, apps, admins] = await Promise.all([
		db.select().from(subscribers).orderBy(desc(subscribers.consentedAt)),
		db.select().from(retailerApplications).orderBy(desc(retailerApplications.createdAt)),
		db
			.select({ id: user.id, name: user.name, email: user.email, createdAt: user.createdAt })
			.from(user)
			.orderBy(asc(user.createdAt))
	]);
	return { user: locals.user, subscribers: subs, applications: apps, statuses: STATUSES, admins };
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
	logout: async ({ request }) => {
		await auth.api.signOut({ headers: request.headers });
		redirect(303, '/admin/login');
	},

	/**
	 * Bjuder in en ny admin: kontot skapas med ett slumplösenord ingen känner, och personen
	 * sätter sitt eget via Better Auths sätt-lösenord-länk. Finns mailen redan skickas bara
	 * länken igen — befintligt lösenord rörs inte.
	 */
	invite: async ({ request }) => {
		const f = await request.formData();
		const name = String(f.get('name') ?? '').trim();
		const email = String(f.get('email') ?? '')
			.trim()
			.toLowerCase();
		if (!name || !EMAIL.test(email)) {
			return fail(400, { inviteError: 'Fyll i namn och en giltig mailadress.', name, email });
		}

		const [existing] = await db.select({ id: user.id }).from(user).where(eq(user.email, email));
		if (!existing) await createAdmin(db, { email, name, password: crypto.randomUUID() });

		try {
			await auth.api.requestPasswordReset({ body: { email, redirectTo: '/admin/set-password' } });
		} catch (e) {
			return fail(500, {
				inviteError: e instanceof APIError ? e.message : 'Kunde inte skicka inbjudan.',
				name,
				email
			});
		}
		return { invited: email };
	},

	setStatus: async ({ request }) => {
		const f = await request.formData();
		const id = Number(f.get('id'));
		const status = String(f.get('status') ?? '');
		if (!id || !STATUSES.includes(status)) return fail(400);
		await db.update(retailerApplications).set({ status }).where(eq(retailerApplications.id, id));
	}
};
