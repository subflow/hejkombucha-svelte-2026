import { hashPassword } from 'better-auth/crypto';
import { and, eq } from 'drizzle-orm';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from './db/schema';

const { user, account } = schema;

type Db = PostgresJsDatabase<typeof schema>;

/**
 * Skapar ett admin-konto med mail + lösenord, eller byter lösenord om mailen redan finns.
 * Delas av seed-scriptet (första admin, utanför SvelteKit) och inbjudan i /admin
 * (slumplösenord + sätt-lösenord-länk). Registrering via Better Auth är avstängd,
 * så det här är enda vägen in — tabellen `user` är allowlisten.
 */
export async function createAdmin(
	db: Db,
	a: { email: string; name: string; password: string }
): Promise<{ id: string; created: boolean }> {
	const email = a.email.trim().toLowerCase();
	const password = await hashPassword(a.password);
	const now = new Date();

	const [existing] = await db.select({ id: user.id }).from(user).where(eq(user.email, email));
	if (existing) {
		const updated = await db
			.update(account)
			.set({ password, updatedAt: now })
			.where(and(eq(account.userId, existing.id), eq(account.providerId, 'credential')))
			.returning({ id: account.id });
		if (updated.length === 0) {
			await db.insert(account).values({
				id: crypto.randomUUID(),
				userId: existing.id,
				accountId: existing.id,
				providerId: 'credential',
				password,
				updatedAt: now
			});
		}
		return { id: existing.id, created: false };
	}

	const id = crypto.randomUUID();
	await db.insert(user).values({ id, email, name: a.name.trim(), emailVerified: true });
	await db.insert(account).values({
		id: crypto.randomUUID(),
		userId: id,
		accountId: id,
		providerId: 'credential',
		password,
		updatedAt: now
	});
	return { id, created: true };
}
