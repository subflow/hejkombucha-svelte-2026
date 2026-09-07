import { fail, redirect } from '@sveltejs/kit';
import { APIError } from 'better-auth/api';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) redirect(303, '/admin');
	return {};
};

export const actions: Actions = {
	login: async ({ request }) => {
		const f = await request.formData();
		const email = String(f.get('email') ?? '')
			.trim()
			.toLowerCase();
		const password = String(f.get('password') ?? '');

		try {
			await auth.api.signInEmail({ body: { email, password } });
		} catch (e) {
			// Samma svar oavsett om kontot finns — avslöja inte vilka mail som är admins.
			if (e instanceof APIError) return fail(400, { error: 'Fel mail eller lösenord.', email });
			throw e;
		}
		redirect(303, '/admin');
	},

	forgot: async ({ request }) => {
		const f = await request.formData();
		const email = String(f.get('email') ?? '')
			.trim()
			.toLowerCase();
		if (!email) return fail(400, { error: 'Fyll i din mailadress.' });

		try {
			await auth.api.requestPasswordReset({ body: { email, redirectTo: '/admin/set-password' } });
		} catch (e) {
			// Better Auth svarar lika för okända mail, så ett APIError här är ett riktigt fel (t.ex. rate limit).
			if (e instanceof APIError) return fail(400, { error: e.message });
			throw e;
		}
		return { sent: true };
	}
};
