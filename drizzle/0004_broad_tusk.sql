ALTER TABLE "monitors" RENAME COLUMN "interval" TO "frequency";--> statement-breakpoint
ALTER TABLE "monitors" DROP CONSTRAINT "interval_range_check";--> statement-breakpoint
ALTER TABLE "monitors" ADD CONSTRAINT "interval_range_check" CHECK ("monitors"."frequency" >= 1 AND "monitors"."frequency" <= 1440);