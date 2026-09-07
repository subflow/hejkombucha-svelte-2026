import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { retailerApplications } from '$lib/server/db/schema';
import { notify } from '$lib/server/mail';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** @satisfies {import('./$types').Actions} */
export const actions = {
	apply: async ({ request }) => {
		const f = await request.formData();

		// Honeypot: bottar fyller i alla fält. Låtsas lyckas, spara ingenting.
		if (f.get('website')) return { ok: true };

		/** @param {string} k */
		const v = (k) => String(f.get(k) ?? '').trim();
		const company = v('company');
		const contactName = v('contactName');
		const email = v('email').toLowerCase();
		const phone = v('phone') || null;
		const city = v('city') || null;
		const message = v('message') || null;

		if (!company || !contactName || !EMAIL.test(email)) {
			return fail(400, {
				error: 'Fyll i företag, kontaktperson och en giltig mailadress.',
				values: { company, contactName, email, phone, city, message }
			});
		}

		await db
			.insert(retailerApplications)
			.values({ company, contactName, email, phone, city, message });

		await notify(
			`Ny återförsäljaransökan: ${company}`,
			[
				`Företag: ${company}`,
				`Kontakt: ${contactName}`,
				`Mail: ${email}`,
				phone && `Telefon: ${phone}`,
				city && `Ort: ${city}`,
				message && `\n${message}`
			]
				.filter(Boolean)
				.join('\n')
		);

		return { ok: true };
	}
};
