import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { subscribers } from '$lib/server/db/schema';
import { addContact, notify } from '$lib/server/mail';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Delad form action för nyhetsbrevet — används av både / och /about.
 * @type {import('@sveltejs/kit').Action}
 */
export async function subscribe({ request }) {
	const f = await request.formData();

	// Honeypot: bottar fyller i alla fält. Låtsas lyckas, spara ingenting.
	if (f.get('website')) return { ok: true };

	const firstName = String(f.get('firstName') ?? '').trim();
	const lastName = String(f.get('lastName') ?? '').trim() || null;
	const email = String(f.get('email') ?? '')
		.trim()
		.toLowerCase();
	const address = String(f.get('address') ?? '').trim() || null;

	if (!firstName || !EMAIL.test(email) || !f.get('updatesConsent')) {
		return fail(400, { error: 'Fyll i förnamn, en giltig mailadress och kryssa i rutan.' });
	}

	const resendContactId = await addContact({ email, firstName, lastName: lastName ?? undefined });

	await db
		.insert(subscribers)
		.values({ firstName, lastName, email, address, resendContactId })
		// Samma adress igen = uppdatera namn/adress istället för att krascha på unique.
		.onConflictDoUpdate({ target: subscribers.email, set: { firstName, lastName, address } });

	await notify(
		'Ny prenumerant',
		`${firstName} ${lastName ?? ''} <${email}>${address ? `\n${address}` : ''}`.trim()
	);

	return { ok: true };
}
