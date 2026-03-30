CREATE TYPE "public"."notification_type" AS ENUM('budget_threshold', 'budget_exceeded', 'monthly_summary', 'tips_article');--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" "notification_type" NOT NULL,
	"title" varchar(255) NOT NULL,
	"body" text NOT NULL,
	"data" jsonb,
	"category_id" uuid,
	"budget_id" uuid,
	"transaction_id" uuid,
	"read_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_budget_id_budgets_id_fk" FOREIGN KEY ("budget_id") REFERENCES "public"."budgets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_transaction_id_transactions_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transactions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "notifications_user_id_index" ON "notifications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "notifications_user_unread_index" ON "notifications" USING btree ("user_id","read_at");