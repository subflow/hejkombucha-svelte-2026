import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

const NOTIFY_TO = 'yo@hejkombucha.se';

// ponytail: ingen nyckel → logga istället för att skicka, så lokal dev funkar utan Resend-konto.
const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

// Måste vara en adress på en domän som är verifierad i Resend. Sätt RESEND_FROM i miljön.
const from = () => env.RESEND_FROM || 'Hej Kombucha <onboarding@resend.dev>';

/** Skickar ett klartextmail. Best effort — kastar aldrig, returnerar om det gick. */
export async function send(to: string, subject: string, text: string): Promise<boolean> {
	if (!resend) {
		console.log(`[mail → ${to}] ${subject}\n${text}`);
		return false;
	}
	try {
		const { error } = await resend.emails.send({ from: from(), to, subject, text });
		if (error) {
			console.error('send: Resend svarade med fel', error);
			return false;
		}
		return true;
	} catch (e) {
		console.error('send: kunde inte skicka', e);
		return false;
	}
}

/** Internt notis-mail till bryggeriet. Får aldrig fälla formuläret som anropar. */
export async function notify(subject: string, text: string): Promise<void> {
	await send(NOTIFY_TO, subject, text);
}

/**
 * Speglar en prenumerant till Resend som kontakt, i segmentet om RESEND_SEGMENT_ID är satt.
 * Returnerar Resends kontakt-id, eller null om det inte gick (kontakten finns redan, nätfel …).
 */
export async function addContact(c: {
	email: string;
	firstName: string;
	lastName?: string;
}): Promise<string | null> {
	if (!resend) return null;
	try {
		const { data, error } = await resend.contacts.create({
			...c,
			unsubscribed: false,
			...(env.RESEND_SEGMENT_ID ? { segments: [{ id: env.RESEND_SEGMENT_ID }] } : {})
		});
		if (error) console.error('addContact: Resend svarade med fel', error);
		return data?.id ?? null;
	} catch (e) {
		console.error('addContact: kunde inte skapa kontakt', e);
		return null;
	}
}

/** Skapar och skickar ett nyhetsbrev till hela segmentet. Kastar vid fel så admin ser varför. */
export async function sendNewsletter(subject: string, html: string): Promise<string> {
	if (!resend) throw new Error('RESEND_API_KEY är inte satt på servern.');
	if (!env.RESEND_SEGMENT_ID) throw new Error('RESEND_SEGMENT_ID är inte satt på servern.');

	const { data, error } = await resend.broadcasts.create({
		segmentId: env.RESEND_SEGMENT_ID,
		from: from(),
		subject,
		html,
		send: true
	});
	if (error || !data) throw new Error(error?.message ?? 'Kunde inte skapa utskicket.');
	return data.id;
}
