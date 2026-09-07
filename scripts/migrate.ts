// Körs vid container-start (se Dockerfile CMD): applicerar migrationerna i ./drizzle och
// seedar första admin om user-tabellen är tom. Idempotent — säkert att köra vid varje deploy.
// Buntas med `bun build --target=bun` i builder-steget så runtime-imagen inte behöver src/.
//
// Lokalt mot en tom databas: DATABASE_URL="…" bun scripts/migrate.ts

import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { count } from 'drizzle-orm';
import * as schema from '../src/lib/server/db/schema';
import { createAdmin } from '../src/lib/server/admins';

const url = process.env.DATABASE_URL;
if (!url) {
	console.error('migrate: DATABASE_URL saknas i miljön.');
	process.exit(1);
}

// onnotice: tysta Postgres NOTICE ("already exists, skipping") från drizzles idempotenta migrations-setup.
const client = postgres(url, { max: 1, onnotice: () => {} });
const db = drizzle(client, { schema });

try {
	await migrate(db, { migrationsFolder: './drizzle' });
	console.log('migrate: schemat är uppdaterat.');

	// Första admin. Lösenordet är slumpat och okänt — första inloggningen görs via
	// "Glömt lösenord?" på /admin/login, som mailar en sätt-lösenord-länk.
	const [{ n }] = await db.select({ n: count() }).from(schema.user);
	if (n === 0) {
		const email = process.env.ADMIN_SEED_EMAIL ?? 'jonas@hejkombucha.se';
		const name = process.env.ADMIN_SEED_NAME ?? 'Jonas Olsson';
		await createAdmin(db, { email, name, password: crypto.randomUUID() });
		console.log(`migrate: första admin skapad (${email}). Sätt lösenord via "Glömt lösenord?".`);
	}
} finally {
	await client.end();
}
