ALTER TABLE "settings" ALTER COLUMN "currency" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "settings" ALTER COLUMN "currency" SET DEFAULT 'npr'::text;--> statement-breakpoint
DROP TYPE "public"."currency";--> statement-breakpoint
CREATE TYPE "public"."currency" AS ENUM('npr');--> statement-breakpoint
ALTER TABLE "settings" ALTER COLUMN "currency" SET DEFAULT 'npr'::"public"."currency";--> statement-breakpoint
ALTER TABLE "settings" ALTER COLUMN "currency" SET DATA TYPE "public"."currency" USING "currency"::"public"."currency";