-- Add cover_image and cv_url columns to profile table
ALTER TABLE profile ADD COLUMN IF NOT EXISTS cover_image TEXT;
ALTER TABLE profile ADD COLUMN IF NOT EXISTS cv_url TEXT;
