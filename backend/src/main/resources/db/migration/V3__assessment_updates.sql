ALTER TABLE assessments ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE assessments ADD COLUMN revision BIGINT NOT NULL DEFAULT 0;
ALTER TABLE assessments ADD COLUMN last_update_id UUID;
UPDATE assessments SET updated_at = completed_at;
