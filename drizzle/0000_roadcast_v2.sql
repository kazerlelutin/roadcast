CREATE TYPE "plan" AS ENUM ('free', 'complete');
CREATE TYPE "access_mode" AS ENUM ('edit', 'read', 'slider');
CREATE TYPE "slider" AS ENUM ('alpha', 'bravo', 'charly');
CREATE TYPE "media_provider" AS ENUM ('local', 's3', 'youtube');
CREATE TABLE "roadcasts" ("id" uuid PRIMARY KEY DEFAULT gen_random_uuid(), "title" varchar(140) NOT NULL, "slug" varchar(90) NOT NULL UNIQUE, "plan" "plan" NOT NULL DEFAULT 'free', "interactive_slider" "slider", "last_activity_at" timestamptz NOT NULL DEFAULT now(), "created_at" timestamptz NOT NULL DEFAULT now());
CREATE TABLE "access_links" ("id" uuid PRIMARY KEY DEFAULT gen_random_uuid(), "roadcast_id" uuid NOT NULL REFERENCES "roadcasts"("id") ON DELETE CASCADE, "token" varchar(80) NOT NULL UNIQUE, "mode" "access_mode" NOT NULL, "expires_at" timestamptz);
CREATE TABLE "chronicles" ("id" uuid PRIMARY KEY DEFAULT gen_random_uuid(), "roadcast_id" uuid NOT NULL REFERENCES "roadcasts"("id") ON DELETE CASCADE, "title" varchar(180) NOT NULL, "position" integer NOT NULL, "document" jsonb NOT NULL, "estimated_minutes" integer NOT NULL DEFAULT 1);
CREATE TABLE "media" ("id" uuid PRIMARY KEY DEFAULT gen_random_uuid(), "roadcast_id" uuid NOT NULL REFERENCES "roadcasts"("id") ON DELETE CASCADE, "provider" "media_provider" NOT NULL, "key" text NOT NULL, "mime_type" varchar(120), "bytes" integer, "deleted_at" timestamptz);
CREATE TABLE "slider_items" ("id" uuid PRIMARY KEY DEFAULT gen_random_uuid(), "chronicle_id" uuid NOT NULL REFERENCES "chronicles"("id") ON DELETE CASCADE, "slider" "slider" NOT NULL, "position" integer NOT NULL, "enabled" boolean NOT NULL DEFAULT true);
