ALTER TABLE "access_links" ADD COLUMN "slider" "slider";
--> statement-breakpoint
ALTER TABLE "chronicles" ADD COLUMN "client_id" varchar(120);
--> statement-breakpoint
UPDATE "chronicles" SET "client_id" = "id"::text WHERE "client_id" IS NULL;
--> statement-breakpoint
ALTER TABLE "chronicles" ALTER COLUMN "client_id" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "chronicles" ADD COLUMN "author" varchar(120) DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE "chronicles" ADD COLUMN "versions" jsonb DEFAULT '[]'::jsonb NOT NULL;
--> statement-breakpoint
CREATE UNIQUE INDEX "chronicles_roadcast_client_id_unique" ON "chronicles" USING btree ("roadcast_id", "client_id");
