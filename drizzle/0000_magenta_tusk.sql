CREATE TYPE "public"."access_mode" AS ENUM('edit', 'read', 'slider');--> statement-breakpoint
CREATE TYPE "public"."media_provider" AS ENUM('local', 's3', 'youtube');--> statement-breakpoint
CREATE TYPE "public"."plan" AS ENUM('free', 'complete');--> statement-breakpoint
CREATE TYPE "public"."slider" AS ENUM('alpha', 'bravo', 'charly');--> statement-breakpoint
CREATE TABLE "access_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"roadcast_id" uuid NOT NULL,
	"token" varchar(80) NOT NULL,
	"mode" "access_mode" NOT NULL,
	"expires_at" timestamp with time zone,
	CONSTRAINT "access_links_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "chronicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"roadcast_id" uuid NOT NULL,
	"title" varchar(180) NOT NULL,
	"position" integer NOT NULL,
	"document" jsonb NOT NULL,
	"estimated_minutes" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"roadcast_id" uuid NOT NULL,
	"provider" "media_provider" NOT NULL,
	"key" text NOT NULL,
	"mime_type" varchar(120),
	"bytes" integer,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "roadcasts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(140) NOT NULL,
	"slug" varchar(90) NOT NULL,
	"plan" "plan" DEFAULT 'free' NOT NULL,
	"interactive_slider" "slider",
	"last_activity_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "roadcasts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "slider_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chronicle_id" uuid NOT NULL,
	"slider" "slider" NOT NULL,
	"position" integer NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
ALTER TABLE "access_links" ADD CONSTRAINT "access_links_roadcast_id_roadcasts_id_fk" FOREIGN KEY ("roadcast_id") REFERENCES "public"."roadcasts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chronicles" ADD CONSTRAINT "chronicles_roadcast_id_roadcasts_id_fk" FOREIGN KEY ("roadcast_id") REFERENCES "public"."roadcasts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_roadcast_id_roadcasts_id_fk" FOREIGN KEY ("roadcast_id") REFERENCES "public"."roadcasts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "slider_items" ADD CONSTRAINT "slider_items_chronicle_id_chronicles_id_fk" FOREIGN KEY ("chronicle_id") REFERENCES "public"."chronicles"("id") ON DELETE cascade ON UPDATE no action;