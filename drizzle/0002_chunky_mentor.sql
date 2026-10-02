CREATE TABLE "chronicle_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chronicle_id" uuid NOT NULL,
	"client_id" varchar(120) NOT NULL,
	"saved_at" timestamp with time zone DEFAULT now() NOT NULL,
	"title" varchar(180) NOT NULL,
	"author" varchar(120) DEFAULT '' NOT NULL,
	"document" jsonb NOT NULL
);
--> statement-breakpoint
ALTER TABLE "chronicle_versions" ADD CONSTRAINT "chronicle_versions_chronicle_id_chronicles_id_fk" FOREIGN KEY ("chronicle_id") REFERENCES "public"."chronicles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "chronicle_versions_chronicle_client_id_unique" ON "chronicle_versions" USING btree ("chronicle_id","client_id");--> statement-breakpoint
INSERT INTO "chronicle_versions" ("chronicle_id", "client_id", "saved_at", "title", "author", "document")
SELECT "chronicles"."id", "version"->>'id', ("version"->>'savedAt')::timestamp with time zone, COALESCE("version"->>'title', "chronicles"."title"), COALESCE("version"->>'author', "chronicles"."author"), jsonb_build_object('html', "version"->>'document')
FROM "chronicles"
CROSS JOIN LATERAL jsonb_array_elements("chronicles"."versions") AS "version"
WHERE jsonb_typeof("chronicles"."versions") = 'array';--> statement-breakpoint
ALTER TABLE "chronicles" DROP COLUMN "versions";
