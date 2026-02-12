CREATE TYPE "public"."asset_type" AS ENUM('image', 'video', 'raw');--> statement-breakpoint
CREATE TABLE "assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"public_id" varchar(255) NOT NULL,
	"asset_type" "asset_type" NOT NULL,
	"original_filename" varchar(255),
	"format" varchar(50),
	"bytes" varchar(20),
	"width" varchar(10),
	"height" varchar(10),
	"duration" varchar(20),
	"secure_url" text NOT NULL,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "assets_public_id_unique" UNIQUE("public_id")
);
--> statement-breakpoint
ALTER TABLE "assets" ADD CONSTRAINT "assets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "assets_user_id_index" ON "assets" USING btree ("user_id");