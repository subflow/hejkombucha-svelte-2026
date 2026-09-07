import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { building } from '$app/environment';

// SvelteKits byggsteg importerar server-moduler för att läsa route-config — kasta inte då.
if (!building && !env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(env.DATABASE_URL ?? '');

export const db = drizzle(client, { schema });
