import { boolean, index, integer, pgEnum, pgTable, PrimaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const authRoleEnum = pgEnum('auth_role', ['user', 'admin']);
export const monitorTypeEnum = pgEnum('monitor_type', ['http', 'ping', 'dns']);
export const monitorStatusEnum = pgEnum('monitor_status', ['active', 'paused']);
export const checkStatusEnum = pgEnum('check_status', ['up','down']);
export const incidentStatusEnum = pgEnum ('incident_status', ['investigating', 'identified']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  role: authRoleEnum('role').default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const accounts = pgTable('accounts', {
  userId: uuid('user_id').notNull().references(() => users.id, {onDelete: 'cascade'}),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text("provider_account_id").notNull(),

  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
},
(table) => ({
  columns: [table.provider, table.providerAccountId],
}));

export const sessions = pgTable('sessions', {
  sessionToken: text('session_token').primaryKey(),
  userId: uuid('user_id')
  .notNull()
  .references(() => users.id, {onDelete: 'cascade'}),
  expires: timestamp('expires').notNull(),
});

export const verificationTokens = pgTable(
  'verification_tokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires').notNull(),
  },
  (table) => ({
      columns: [table.identifier, table.token],
    })
);

export const monitors = pgTable('monitors', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade'}).notNull(),
  name: text('name').notNull(),
  url: text('url').notNull(),
  type: monitorTypeEnum('status').default('http').notNull(),
  status: monitorStatusEnum('status').default('active').notNull(),
  interval: integer('interval').default(60).notNull(),
  timeout: integer('timeout').default(5).notNull(),

  isUp: boolean('is_up').default(true).notNull(),
  lastCheckedAt: timestamp('last_checked_at'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
}, (table) => [
  index('monitor_user_idx').on(table.userId)
]);

export const checks = pgTable('checks', {
  id: uuid('id').primaryKey().defaultRandom(),
  monitorId: uuid('monitor_id').references(() => monitors.id, {onDelete: 'cascade'}).notNull(),
  status: checkStatusEnum('status').notNull(),
  latency: integer('latency').notNull(),
  statusCode: integer('status_code'),
  errorMessage: text('error_message'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('check_monitor_date_index').on(table.monitorId, table.createdAt)
]);

export const incidents = pgTable('incidents', {
  id: uuid('id').primaryKey().defaultRandom(),
  monitorId: uuid('monitor_id').references(() => monitors.id, {onDelete: 'cascade'}).notNull(),
  status: incidentStatusEnum('status').default('investigating').notNull(),

  startedAt: timestamp('started_at').defaultNow().notNull(),
  resolvedAt: timestamp('resolved_at'),
}, (table) => [
  index('incident_monitor_idx').on(table.monitorId),
]);

// different monitor types?? What's the difference between just http and pinging a service and also dns?

// need to find a way to delete old data