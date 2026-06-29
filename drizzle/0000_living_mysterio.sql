CREATE TYPE "public"."auth_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."check_status" AS ENUM('up', 'down');--> statement-breakpoint
CREATE TYPE "public"."incident_status" AS ENUM('investigating', 'identified');--> statement-breakpoint
CREATE TYPE "public"."monitor_status" AS ENUM('active', 'paused');--> statement-breakpoint
CREATE TYPE "public"."monitor_type" AS ENUM('http', 'ping', 'dns');--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"proivder" text NOT NULL,
	"provider_account_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "checks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"monitor_id" uuid NOT NULL,
	"status" "check_status" NOT NULL,
	"latency" integer NOT NULL,
	"status_code" integer,
	"error_message" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "incidents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"monitor_id" uuid NOT NULL,
	"status" "incident_status" DEFAULT 'investigating' NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"resolved_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "monitors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"status" "monitor_status" DEFAULT 'active' NOT NULL,
	"interval" integer DEFAULT 60 NOT NULL,
	"timeout" integer DEFAULT 5 NOT NULL,
	"is_up" boolean DEFAULT true NOT NULL,
	"last_checked_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"role" "auth_role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "checks" ADD CONSTRAINT "checks_monitor_id_monitors_id_fk" FOREIGN KEY ("monitor_id") REFERENCES "public"."monitors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_monitor_id_monitors_id_fk" FOREIGN KEY ("monitor_id") REFERENCES "public"."monitors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "monitors" ADD CONSTRAINT "monitors_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "check_monitor_date_index" ON "checks" USING btree ("monitor_id","created_at");--> statement-breakpoint
CREATE INDEX "incident_monitor_idx" ON "incidents" USING btree ("monitor_id");--> statement-breakpoint
CREATE INDEX "monitor_user_idx" ON "monitors" USING btree ("user_id");