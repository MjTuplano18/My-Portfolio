-- Allow public uploads and reads for all portfolio buckets
-- Run this in Supabase SQL Editor

INSERT INTO storage.buckets (id, name, public) VALUES 
  ('avatars', 'avatars', true),
  ('gallery', 'gallery', true),
  ('certifications', 'certifications', true),
  ('recommendations', 'recommendations', true),
  ('cv', 'cv', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow anyone to upload (insert) to all buckets
CREATE POLICY "Allow public uploads to avatars" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Allow public uploads to gallery" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Allow public uploads to certifications" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'certifications');

CREATE POLICY "Allow public uploads to recommendations" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'recommendations');

CREATE POLICY "Allow public uploads to cv" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'cv');

-- Allow anyone to read from all buckets
CREATE POLICY "Allow public reads from avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Allow public reads from gallery" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Allow public reads from certifications" ON storage.objects
  FOR SELECT USING (bucket_id = 'certifications');

CREATE POLICY "Allow public reads from recommendations" ON storage.objects
  FOR SELECT USING (bucket_id = 'recommendations');

CREATE POLICY "Allow public reads from cv" ON storage.objects
  FOR SELECT USING (bucket_id = 'cv');

-- Allow updates/overwrites (upsert)
CREATE POLICY "Allow public updates to avatars" ON storage.objects
  FOR UPDATE USING (bucket_id = 'avatars');

CREATE POLICY "Allow public updates to gallery" ON storage.objects
  FOR UPDATE USING (bucket_id = 'gallery');

CREATE POLICY "Allow public updates to certifications" ON storage.objects
  FOR UPDATE USING (bucket_id = 'certifications');

CREATE POLICY "Allow public updates to recommendations" ON storage.objects
  FOR UPDATE USING (bucket_id = 'recommendations');

CREATE POLICY "Allow public updates to cv" ON storage.objects
  FOR UPDATE USING (bucket_id = 'cv');
