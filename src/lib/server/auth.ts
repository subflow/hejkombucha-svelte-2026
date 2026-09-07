import { env } from '$env/dynamic/private';
import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { building } from '$app/environment';
import { db } from '$lib/server/db';
import { send } from '$lib/server/mail';

export const auth = betterAuth({
	baseURL: env.ORIGIN,
	// SvelteKits byggsteg konstruerar auth utan miljö — placeholder då, riktig hemlighet krävs vid körning.
	secret: env.BETTER_AUTH_SECRET ?? (building ? 'build-time-placeholder' : undefined),
	database: drizzleAdapter(db, { provider: 'pg' }),
	emailAndPassword: {
		enabled: true,
		// Ingen publik registrering. Admins skapas via `bun run seed:admin` eller inbjudan i /admin.
		disableSignUp: true,
		// Samma länk används för inbjudan och "Glömt lösenord?" — ett dygn så en inbjudan hinner läsas.
		resetPasswordTokenExpiresIn: 60 * 60 * 24,
		sendResetPassword: async ({ user, url }) => {
			await send(
				user.email,
				'Sätt ditt lösenord för Hej Kombucha admin',
				[
					`Hej ${user.name}!`,
					'',
					'Klicka på länken för att sätta ett lösenord till admin på hejkombucha.se:',
					'',
					url,
					'',
					'Länken gäller i 24 timmar. Har du inte bett om det här kan du ignorera mailet.'
				].join('\n')
			);
		}
	},
	plugins: [
		sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
	]
});
