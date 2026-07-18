CREATE TYPE "public"."notificationMethod" AS ENUM('email', 'webhook', 'none');--> statement-breakpoint
ALTER TABLE "accounts" RENAME TO "account";--> statement-breakpoint
ALTER TABLE "sessions" RENAME TO "session";--> statement-breakpoint
ALTER TABLE "users" RENAME TO "user";--> statement-breakpoint
ALTER TABLE "verification_tokens" RENAME TO "verificationToken";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "accounts_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "monitors" DROP CONSTRAINT "monitors_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "sessions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "monitors" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "monitors" ALTER COLUMN "type" SET DEFAULT 'GET'::text;--> statement-breakpoint
DROP TYPE "public"."monitor_type";--> statement-breakpoint
CREATE TYPE "public"."monitor_type" AS ENUM('GET', 'POST', 'HEAD');--> statement-breakpoint
ALTER TABLE "monitors" ALTER COLUMN "type" SET DEFAULT 'GET'::"public"."monitor_type";--> statement-breakpoint
ALTER TABLE "monitors" ALTER COLUMN "type" SET DATA TYPE "public"."monitor_type" USING "type"::"public"."monitor_type";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "accounts_provider_provider_account_id_pk";--> statement-breakpoint
ALTER TABLE "verificationToken" DROP CONSTRAINT "verification_tokens_identifier_token_pk";--> statement-breakpoint
ALTER TABLE "monitors" ALTER COLUMN "interval" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id");--> statement-breakpoint
ALTER TABLE "verificationToken" ADD CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token");--> statement-breakpoint
ALTER TABLE "monitors" ADD COLUMN "expected_status_code" integer DEFAULT 200 NOT NULL;--> statement-breakpoint
ALTER TABLE "monitors" ADD COLUMN "payload" text;--> statement-breakpoint
ALTER TABLE "monitors" ADD COLUMN "notification_method" "notificationMethod" DEFAULT 'email' NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "monitors" ADD CONSTRAINT "monitors_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "monitors" ADD CONSTRAINT "interval_range_check" CHECK ("monitors"."interval" >= 1 AND "monitors"."interval" <= 1440);