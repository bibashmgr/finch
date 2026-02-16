DROP INDEX "email_index";--> statement-breakpoint
CREATE INDEX "refresh_token_lookup_index" ON "refresh_tokens" USING btree ("token");--> statement-breakpoint
CREATE INDEX "user_email_index" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "verification_email_index" ON "verification_codes" USING btree ("email");--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_token_unique" UNIQUE("token");