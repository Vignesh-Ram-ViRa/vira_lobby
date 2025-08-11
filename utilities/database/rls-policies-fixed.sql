-- ViRa's Lobby - Fixed Row Level Security Policies
-- Owner: vickyram.vira@gmail.com (full CRUD access to own records)
-- Super Admin: vigneshuramu@gmail.com (read/write access to all records)
-- Guest Users: read-only access to owner's public records

-- Drop existing policies first (if they exist)
DROP POLICY IF EXISTS "bookworm_owner_all" ON bookworm;
DROP POLICY IF EXISTS "bookworm_super_admin_all" ON bookworm;
DROP POLICY IF EXISTS "bookworm_guest_read" ON bookworm;
DROP POLICY IF EXISTS "bingescape_owner_all" ON bingescape;
DROP POLICY IF EXISTS "bingescape_super_admin_all" ON bingescape;
DROP POLICY IF EXISTS "bingescape_guest_read" ON bingescape;
DROP POLICY IF EXISTS "film_frenzy_owner_all" ON film_frenzy;
DROP POLICY IF EXISTS "film_frenzy_super_admin_all" ON film_frenzy;
DROP POLICY IF EXISTS "film_frenzy_guest_read" ON film_frenzy;
DROP POLICY IF EXISTS "otaku_hub_owner_all" ON otaku_hub;
DROP POLICY IF EXISTS "otaku_hub_super_admin_all" ON otaku_hub;
DROP POLICY IF EXISTS "otaku_hub_guest_read" ON otaku_hub;
DROP POLICY IF EXISTS "wanderlog_owner_all" ON wanderlog;
DROP POLICY IF EXISTS "wanderlog_super_admin_all" ON wanderlog;
DROP POLICY IF EXISTS "wanderlog_guest_read" ON wanderlog;
DROP POLICY IF EXISTS "scribbles_owner_all" ON scribbles;
DROP POLICY IF EXISTS "scribbles_super_admin_all" ON scribbles;
DROP POLICY IF EXISTS "scribbles_guest_read" ON scribbles;
DROP POLICY IF EXISTS "shutter_tales_owner_all" ON shutter_tales;
DROP POLICY IF EXISTS "shutter_tales_super_admin_all" ON shutter_tales;
DROP POLICY IF EXISTS "shutter_tales_guest_read" ON shutter_tales;
DROP POLICY IF EXISTS "spot_light_owner_all" ON spot_light;
DROP POLICY IF EXISTS "spot_light_super_admin_all" ON spot_light;
DROP POLICY IF EXISTS "spot_light_guest_read" ON spot_light;

-- Drop the helper function if it exists
DROP FUNCTION IF EXISTS get_user_email();

-- Enable RLS on all hobby tables
ALTER TABLE bookworm ENABLE ROW LEVEL SECURITY;
ALTER TABLE bingescape ENABLE ROW LEVEL SECURITY;
ALTER TABLE film_frenzy ENABLE ROW LEVEL SECURITY;
ALTER TABLE otaku_hub ENABLE ROW LEVEL SECURITY;
ALTER TABLE wanderlog ENABLE ROW LEVEL SECURITY;
ALTER TABLE scribbles ENABLE ROW LEVEL SECURITY;
ALTER TABLE shutter_tales ENABLE ROW LEVEL SECURITY;
ALTER TABLE spot_light ENABLE ROW LEVEL SECURITY;

-- Get the owner's user ID (replace with actual UUID)
-- You'll need to run: SELECT id FROM auth.users WHERE email = 'vickyram.vira@gmail.com';
-- Then replace 'OWNER_USER_ID_HERE' with the actual UUID

-- BOOKWORM POLICIES
-- Owner can do everything with their own records
CREATE POLICY "bookworm_owner_all" ON bookworm
    FOR ALL USING (
        user_id = auth.uid() AND 
        auth.jwt() ->> 'email' = 'vickyram.vira@gmail.com'
    );

-- Super admin can do everything with all records
CREATE POLICY "bookworm_super_admin_all" ON bookworm
    FOR ALL USING (
        auth.jwt() ->> 'email' = 'vigneshuramu@gmail.com'
    );

-- Guests can read owner's records (using the owner's UUID)
CREATE POLICY "bookworm_guest_read" ON bookworm
    FOR SELECT USING (
        user_id = 'OWNER_USER_ID_HERE'::uuid
    );

-- BINGESCAPE POLICIES
CREATE POLICY "bingescape_owner_all" ON bingescape
    FOR ALL USING (
        user_id = auth.uid() AND 
        auth.jwt() ->> 'email' = 'vickyram.vira@gmail.com'
    );

CREATE POLICY "bingescape_super_admin_all" ON bingescape
    FOR ALL USING (
        auth.jwt() ->> 'email' = 'vigneshuramu@gmail.com'
    );

CREATE POLICY "bingescape_guest_read" ON bingescape
    FOR SELECT USING (
        user_id = 'OWNER_USER_ID_HERE'::uuid
    );

-- FILM FRENZY POLICIES
CREATE POLICY "film_frenzy_owner_all" ON film_frenzy
    FOR ALL USING (
        user_id = auth.uid() AND 
        auth.jwt() ->> 'email' = 'vickyram.vira@gmail.com'
    );

CREATE POLICY "film_frenzy_super_admin_all" ON film_frenzy
    FOR ALL USING (
        auth.jwt() ->> 'email' = 'vigneshuramu@gmail.com'
    );

CREATE POLICY "film_frenzy_guest_read" ON film_frenzy
    FOR SELECT USING (
        user_id = 'OWNER_USER_ID_HERE'::uuid
    );

-- OTAKU HUB POLICIES
CREATE POLICY "otaku_hub_owner_all" ON otaku_hub
    FOR ALL USING (
        user_id = auth.uid() AND 
        auth.jwt() ->> 'email' = 'vickyram.vira@gmail.com'
    );

CREATE POLICY "otaku_hub_super_admin_all" ON otaku_hub
    FOR ALL USING (
        auth.jwt() ->> 'email' = 'vigneshuramu@gmail.com'
    );

CREATE POLICY "otaku_hub_guest_read" ON otaku_hub
    FOR SELECT USING (
        user_id = 'OWNER_USER_ID_HERE'::uuid
    );

-- WANDERLOG POLICIES
CREATE POLICY "wanderlog_owner_all" ON wanderlog
    FOR ALL USING (
        user_id = auth.uid() AND 
        auth.jwt() ->> 'email' = 'vickyram.vira@gmail.com'
    );

CREATE POLICY "wanderlog_super_admin_all" ON wanderlog
    FOR ALL USING (
        auth.jwt() ->> 'email' = 'vigneshuramu@gmail.com'
    );

CREATE POLICY "wanderlog_guest_read" ON wanderlog
    FOR SELECT USING (
        user_id = 'OWNER_USER_ID_HERE'::uuid
    );

-- SCRIBBLES POLICIES
CREATE POLICY "scribbles_owner_all" ON scribbles
    FOR ALL USING (
        user_id = auth.uid() AND 
        auth.jwt() ->> 'email' = 'vickyram.vira@gmail.com'
    );

CREATE POLICY "scribbles_super_admin_all" ON scribbles
    FOR ALL USING (
        auth.jwt() ->> 'email' = 'vigneshuramu@gmail.com'
    );

CREATE POLICY "scribbles_guest_read" ON scribbles
    FOR SELECT USING (
        user_id = 'OWNER_USER_ID_HERE'::uuid
    );

-- SHUTTER TALES POLICIES
CREATE POLICY "shutter_tales_owner_all" ON shutter_tales
    FOR ALL USING (
        user_id = auth.uid() AND 
        auth.jwt() ->> 'email' = 'vickyram.vira@gmail.com'
    );

CREATE POLICY "shutter_tales_super_admin_all" ON shutter_tales
    FOR ALL USING (
        auth.jwt() ->> 'email' = 'vigneshuramu@gmail.com'
    );

CREATE POLICY "shutter_tales_guest_read" ON shutter_tales
    FOR SELECT USING (
        user_id = 'OWNER_USER_ID_HERE'::uuid
    );

-- SPOT LIGHT POLICIES
CREATE POLICY "spot_light_owner_all" ON spot_light
    FOR ALL USING (
        user_id = auth.uid() AND 
        auth.jwt() ->> 'email' = 'vickyram.vira@gmail.com'
    );

CREATE POLICY "spot_light_super_admin_all" ON spot_light
    FOR ALL USING (
        auth.jwt() ->> 'email' = 'vigneshuramu@gmail.com'
    );

CREATE POLICY "spot_light_guest_read" ON spot_light
    FOR SELECT USING (
        user_id = 'OWNER_USER_ID_HERE'::uuid
    );

-- Instructions:
-- 1. First, get the owner's UUID by running:
--    SELECT id FROM auth.users WHERE email = 'vickyram.vira@gmail.com';
-- 2. Replace all instances of 'OWNER_USER_ID_HERE' with the actual UUID
-- 3. Run this script in Supabase SQL Editor 