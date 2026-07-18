import { sql } from "drizzle-orm";
import { boolean, check, index, integer, pgEnum, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const authRoleEnum = pgEnum('auth_role', ['user', 'admin']);
export const notificationMethodEnum = pgEnum('notification_method', ['email', 'webhook', 'none']);
export const monitorTypeEnum = pgEnum('monitor_type', ['GET', 'POST', 'HEAD']);
export const monitorStatusEnum = pgEnum('monitor_status', ['active', 'paused']);
export const checkStatusEnum = pgEnum('check_status', ['up','down']);
export const incidentStatusEnum = pgEnum('incident_status', ['investigating', 'identified']);


export const user = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date'}),
  name: text('name'),
  image: text('image'),
  role: authRoleEnum('role').default('user').notNull(),
  createdAt: timestamp('created_at', { mode: 'date'}).defaultNow().notNull(), 
  updatedAt: timestamp('updated_at', {mode: 'date'}).defaultNow().notNull(),
});

export const account = pgTable('account', {
  userId: uuid('userId')
    .notNull()
    .references(() => user.id, {onDelete: 'cascade'}),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text("providerAccountId").notNull(),

  refreshToken: text('refresh_token'),
  accessToken: text('access_token'),
  expiresAt: integer('expires_at'),
  tokenType: text('token_type'),
  scope: text('scope'),
  idToken: text('id_token'),
  sessionState: text('session_state'),
},
(table) => [
  primaryKey({columns: [table.provider, table.providerAccountId]})
]);

export const session = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(), 
  userId: uuid('userId')
    .notNull()
    .references(() => user.id, {onDelete: 'cascade'}),
  expires: timestamp('expires', {mode: 'date'}).notNull(),
});

export const verificationToken = pgTable(
  'verification_token', 
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', {mode: 'date'}).notNull(),
  },
  (table) => [
    primaryKey({columns: [table.identifier, table.token]})
  ]
);

export const monitor = pgTable('monitor', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => user.id, { onDelete: 'cascade'}).notNull(),
  name: text('name').notNull(),
  url: text('url').notNull(),
  method: monitorTypeEnum('method').default('GET').notNull(),
  expectedStatusCode: integer('expected_status_code').default(200).notNull(),
  payload: text('payload'),
  webhookUrl: text('webhook_url'), // Safely mapping to unique 'webhook_url' column
  notificationMethod: notificationMethodEnum('notification_method').default('email').notNull(),
  status: monitorStatusEnum('status').default('active').notNull(),

  frequency: integer('frequency').default(1).notNull(),
  timeout: integer('timeout').default(5).notNull(),

  isUp: boolean('is_up').default(true).notNull(),
  lastCheckedAt: timestamp('last_checked_at'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
}, (table) => [
  check(
    'interval_range_check',
    sql `${table.frequency} >= 1 AND ${table.frequency} <= 1440`
  ),
  index('monitor_user_idx').on(table.userId)
]);


export const monitorCheck = pgTable('monitor_check', {
  id: uuid('id').primaryKey().defaultRandom(),
  monitorId: uuid('monitor_id').references(() => monitor.id, {onDelete: 'cascade'}).notNull(),
  status: checkStatusEnum('status').notNull(),
  latency: integer('latency').notNull(),
  statusCode: integer('status_code'),
  errorMessage: text('error_message'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('check_monitor_date_index').on(table.monitorId, table.createdAt)
]);


export const incident = pgTable('incident', {
  id: uuid('id').primaryKey().defaultRandom(),
  monitorId: uuid('monitor_id').references(() => monitor.id, {onDelete: 'cascade'}).notNull(),
  status: incidentStatusEnum('status').default('investigating').notNull(),

  startedAt: timestamp('started_at').defaultNow().notNull(),
  resolvedAt: timestamp('resolved_at'),
}, (table) => [
  index('incident_monitor_idx').on(table.monitorId),
]);