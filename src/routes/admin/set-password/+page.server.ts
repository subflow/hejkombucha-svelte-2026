import { fail, redirect } from '@sveltejs/kit';
import { APIError } from 'better-auth/api';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';

export const load: PageServerLoad = ({ url }) => {
	// Better Auth skickar hit med ?token=… när länken är giltig, annars ?error=INVALID_TOKEN.
	const token = url.searchParams.has('error') ? null : url.searchParams.get('token');
	return { token };
};

export const actions: Actions = {
	reset: async ({ request }) => {
		const f = await request.formData();
		const token = String(f.get('token') ?? '');
		const password = String(f.get('password') ?? '');
		const confirm = String(f.get('confirm') ?? '');

		if (password.length < 8) return fail(400, { error: 'Lösenordet måste vara minst 8 tecken.' });
		if (password !== confirm) return fail(400, { error: 'Lösenorden matchar inte.' });

		try {
			await auth.api.resetPassword({ body: { newPassword: password, token } });
		} catch (e) {
			if (e instanceof APIError) {
				return fail(400, {
					error: 'Länken är ogiltig eller har gått ut. Be om en ny på inloggningen.'
				});
			}
			throw e;
		}
		redirect(303, '/admin/login?reset=1');
	}
};
