// Skapar första admin-kontot — eller byter lösenord på ett befintligt.
// Körs utanför SvelteKit, så miljön läses från process.env (Bun laddar .env automatiskt).
// Mot prod: DATABASE_URL="<prod-url>" bun run seed:admin ...
//
//   bun run seed:admin <mail> "<namn>" <lösenord>

import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../src/lib/server/db/schema';
import { createAdmin } from '../src/lib/server/admins';

const [email, name, password] = process.argv.slice(2);

if (!email || !name || !password) {
	console.error('Användning: bun run seed:admin <mail> "<namn>" <lösenord>');
	process.exit(1);
}
if (password.length < 8) {
	console.error('Lösenordet måste vara minst 8 tecken.');
	process.exit(1);
}
if (!process.env.DATABASE_URL) {
	console.error('DATABASE_URL saknas i miljön.');
	process.exit(1);
}

const client = postgres(process.env.DATABASE_URL, { max: 1 });
const db = drizzle(client, { schema });

try {
	const { created } = await createAdmin(db, { email, name, password });
	console.log(created ? `Admin skapad: ${email}` : `Lösenord bytt för befintlig admin: ${email}`);
} finally {
	await client.end();
}
