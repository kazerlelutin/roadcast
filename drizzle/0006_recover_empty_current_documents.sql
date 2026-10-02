-- Re-run the targeted recovery as a separate migration. The previous data
-- migration was recorded without affecting older databases that already had
-- the version table repaired.
WITH latest_non_empty_version AS (
  SELECT DISTINCT ON (chronicle_id) chronicle_id, document
  FROM chronicle_versions
  WHERE COALESCE(document ->> 'html', '') NOT IN ('', '<p></p>')
  ORDER BY chronicle_id, saved_at DESC
)
UPDATE chronicles AS chronicle
SET document = version.document
FROM latest_non_empty_version AS version
WHERE chronicle.id = version.chronicle_id
  AND COALESCE(chronicle.document ->> 'html', '') IN ('', '<p></p>');
