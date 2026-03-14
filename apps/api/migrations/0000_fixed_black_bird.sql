CREATE TYPE "public"."provider" AS ENUM('google', 'email');--> statement-breakpoint
CREATE TYPE "public"."asset_type" AS ENUM('image', 'video', 'raw');--> statement-breakpoint
CREATE TYPE "public"."category_type" AS ENUM('income', 'expense');--> statement-breakpoint
CREATE TYPE "public"."currency" AS ENUM('usd', 'aud', 'npr');--> statement-breakpoint
CREATE TYPE "public"."language" AS ENUM('en', 'ne');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('cash', 'card', 'online');--> statement-breakpoint
CREATE TYPE "public"."theme" AS ENUM('light', 'dark', 'system');--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"provider" "provider" NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "accounts_provider_unique" UNIQUE("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE "assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"public_id" varchar(255) NOT NULL,
	"asset_type" "asset_type" NOT NULL,
	"original_filename" varchar(255),
	"format" varchar(50),
	"bytes" bigint,
	"width" integer,
	"height" integer,
	"duration" varchar(20),
	"url" text NOT NULL,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "assets_public_id_unique" UNIQUE("public_id")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" "category_type" NOT NULL,
	"title" varchar(20) NOT NULL,
	"description" varchar(255) NOT NULL,
	"icon" text NOT NULL,
	"color" varchar(7) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "categories_user_title_unique" UNIQUE("user_id","title")
);
--> statement-breakpoint
CREATE TABLE "refresh_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token" text NOT NULL,
	"user_agent" text,
	"ip_address" varchar(45),
	"expires_at" timestamp NOT NULL,
	"revoked_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "refresh_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"currency" "currency" DEFAULT 'usd' NOT NULL,
	"language" "language" DEFAULT 'en' NOT NULL,
	"theme" "theme" DEFAULT 'system' NOT NULL,
	"budget_alerts" boolean DEFAULT true NOT NULL,
	"tips_articles_alerts" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "settings_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "transaction_attachments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"transaction_id" uuid NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"currency" varchar(3) NOT NULL,
	"amount" numeric NOT NULL,
	"notes" varchar(255) NOT NULL,
	"payment_method" "payment_method" NOT NULL,
	"issued_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification_codes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"code_hash" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"consumed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "settings" ADD CONSTRAINT "settings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction_attachments" ADD CONSTRAINT "transaction_attachments_transaction_id_transactions_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transactions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "assets_user_id_index" ON "assets" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "categories_user_id_index" ON "categories" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "refresh_token_lookup_index" ON "refresh_tokens" USING btree ("token");--> statement-breakpoint
CREATE INDEX "settings_user_id_index" ON "settings" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "attachments_transaction_id_index" ON "transaction_attachments" USING btree ("transaction_id");--> statement-breakpoint
CREATE INDEX "transactions_user_id_index" ON "transactions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "transactions_category_id_index" ON "transactions" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "user_email_index" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "verification_email_index" ON "verification_codes" USING btree ("email");