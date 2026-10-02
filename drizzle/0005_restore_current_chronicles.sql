-- The former automatic persistence loop could overwrite the current document
-- with an empty editor state. Restore only those empty current documents from
-- their latest non-empty explicit version, once.
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
