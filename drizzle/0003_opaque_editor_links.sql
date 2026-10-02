UPDATE "roadcasts" SET "slug" = replace(gen_random_uuid()::text, '-', '');
