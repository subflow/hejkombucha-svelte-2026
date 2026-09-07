import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

/** Nyhetsbrevsprenumeranter. Speglas till en Resend-audience vid signup. */
export const subscribers = pgTable('subscribers', {
	id: serial('id').primaryKey(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name'),
	email: text('email').notNull().unique(),
	address: text('address'),
	consentedAt: timestamp('consented_at', { withTimezone: true }).notNull().defaultNow(),
	resendContactId: text('resend_contact_id')
});

/** Ansökningar från formuläret på /bli-aterforsaljare. */
export const retailerApplications = pgTable('retailer_applications', {
	id: serial('id').primaryKey(),
	company: text('company').notNull(),
	contactName: text('contact_name').notNull(),
	email: text('email').notNull(),
	phone: text('phone'),
	city: text('city'),
	message: text('message'),
	status: text('status').notNull().default('ny'),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});

export * from './auth.schema';
