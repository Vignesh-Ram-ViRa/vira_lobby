-- ViRa's Lobby - Row Level Security Policies
-- Owner: vickyram.vira@gmail.com (full CRUD access to own records)
-- Super Admin: vigneshuramu@gmail.com (read/write access to all records)
-- Guest Users: read-only access to owner's public records

-- Enable RLS on all hobby tables
ALTER TABLE bookworm ENABLE ROW LEVEL SECURITY;
ALTER TABLE bingescape ENABLE ROW LEVEL SECURITY;
ALTER TABLE film_frenzy ENABLE ROW LEVEL SECURITY;
ALTER TABLE otaku_hub ENABLE ROW LEVEL SECURITY;
ALTER TABLE wanderlog ENABLE ROW LEVEL SECURITY;
ALTER TABLE scribbles ENABLE ROW LEVEL SECURITY;
ALTER TABLE shutter_tales ENABLE ROW LEVEL SECURITY;
ALTER TABLE spot_light ENABLE ROW LEVEL SECURITY;

-- Helper function to get user email
CREATE OR REPLACE FUNCTION get_user_email()
RETURNS TEXT AS $$
BEGIN
    RETURN (SELECT email FROM auth.users WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- BOOKWORM POLICIES
-- Owner can do everything with their own records
CREATE POLICY "bookworm_owner_all" ON bookworm
    FOR ALL USING (
        user_id = auth.uid() AND 
        get_user_email() = 'vickyram.vira@gmail.com'
    );

-- Super admin can do everything with all records
CREATE POLICY "bookworm_super_admin_all" ON bookworm
    FOR ALL USING (
        get_user_email() = 'vigneshuramu@gmail.com'
    );

-- Guests can read owner's records
CREATE POLICY "bookworm_guest_read" ON bookworm
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE id = bookworm.user_id 
            AND email = 'vickyram.vira@gmail.com'
        )
    );

-- BINGESCAPE POLICIES
CREATE POLICY "bingescape_owner_all" ON bingescape
    FOR ALL USING (
        user_id = auth.uid() AND 
        get_user_email() = 'vickyram.vira@gmail.com'
    );

CREATE POLICY "bingescape_super_admin_all" ON bingescape
    FOR ALL USING (
        get_user_email() = 'vigneshuramu@gmail.com'
    );

CREATE POLICY "bingescape_guest_read" ON bingescape
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE id = bingescape.user_id 
            AND email = 'vickyram.vira@gmail.com'
        )
    );

-- FILM FRENZY POLICIES
CREATE POLICY "film_frenzy_owner_all" ON film_frenzy
    FOR ALL USING (
        user_id = auth.uid() AND 
        get_user_email() = 'vickyram.vira@gmail.com'
    );

CREATE POLICY "film_frenzy_super_admin_all" ON film_frenzy
    FOR ALL USING (
        get_user_email() = 'vigneshuramu@gmail.com'
    );

CREATE POLICY "film_frenzy_guest_read" ON film_frenzy
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE id = film_frenzy.user_id 
            AND email = 'vickyram.vira@gmail.com'
        )
    );

-- OTAKU HUB POLICIES
CREATE POLICY "otaku_hub_owner_all" ON otaku_hub
    FOR ALL USING (
        user_id = auth.uid() AND 
        get_user_email() = 'vickyram.vira@gmail.com'
    );

CREATE POLICY "otaku_hub_super_admin_all" ON otaku_hub
    FOR ALL USING (
        get_user_email() = 'vigneshuramu@gmail.com'
    );

CREATE POLICY "otaku_hub_guest_read" ON otaku_hub
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE id = otaku_hub.user_id 
            AND email = 'vickyram.vira@gmail.com'
        )
    );

-- WANDERLOG POLICIES
CREATE POLICY "wanderlog_owner_all" ON wanderlog
    FOR ALL USING (
        user_id = auth.uid() AND 
        get_user_email() = 'vickyram.vira@gmail.com'
    );

CREATE POLICY "wanderlog_super_admin_all" ON wanderlog
    FOR ALL USING (
        get_user_email() = 'vigneshuramu@gmail.com'
    );

CREATE POLICY "wanderlog_guest_read" ON wanderlog
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE id = wanderlog.user_id 
            AND email = 'vickyram.vira@gmail.com'
        )
    );

-- SCRIBBLES POLICIES
CREATE POLICY "scribbles_owner_all" ON scribbles
    FOR ALL USING (
        user_id = auth.uid() AND 
        get_user_email() = 'vickyram.vira@gmail.com'
    );

CREATE POLICY "scribbles_super_admin_all" ON scribbles
    FOR ALL USING (
        get_user_email() = 'vigneshuramu@gmail.com'
    );

CREATE POLICY "scribbles_guest_read" ON scribbles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE id = scribbles.user_id 
            AND email = 'vickyram.vira@gmail.com'
        )
    );

-- SHUTTER TALES POLICIES
CREATE POLICY "shutter_tales_owner_all" ON shutter_tales
    FOR ALL USING (
        user_id = auth.uid() AND 
        get_user_email() = 'vickyram.vira@gmail.com'
    );

CREATE POLICY "shutter_tales_super_admin_all" ON shutter_tales
    FOR ALL USING (
        get_user_email() = 'vigneshuramu@gmail.com'
    );

CREATE POLICY "shutter_tales_guest_read" ON shutter_tales
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE id = shutter_tales.user_id 
            AND email = 'vickyram.vira@gmail.com'
        )
    );

-- SPOT LIGHT POLICIES
CREATE POLICY "spot_light_owner_all" ON spot_light
    FOR ALL USING (
        user_id = auth.uid() AND 
        get_user_email() = 'vickyram.vira@gmail.com'
    );

CREATE POLICY "spot_light_super_admin_all" ON spot_light
    FOR ALL USING (
        get_user_email() = 'vigneshuramu@gmail.com'
    );

CREATE POLICY "spot_light_guest_read" ON spot_light
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE id = spot_light.user_id 
            AND email = 'vickyram.vira@gmail.com'
        )
    ); 