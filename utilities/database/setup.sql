-- ViRa's Lobby Database Setup Script
-- Execute this script to set up the complete database structure and initial data

-- ============================================================================
-- Step 1: Create Database Schema (Tables, Indexes, Triggers)
-- ============================================================================
\i utilities/database/schema.sql

-- ============================================================================
-- Step 2: Set up Row Level Security Policies
-- ============================================================================
\i utilities/database/rls-policies.sql

-- ============================================================================
-- Step 3: Insert Initial Data for All Hobby Categories
-- ============================================================================

-- Insert Bookworm data (Books)
\i utilities/database/initial-data/bookworm.sql

-- Insert Bingescape data (Web Series)
\i utilities/database/initial-data/bingescape.sql

-- Insert Film Frenzy data (Movies)
\i utilities/database/initial-data/film_frenzy.sql

-- Insert Otaku Hub data (Anime)
\i utilities/database/initial-data/otaku_hub.sql

-- Remaining hobbies (empty placeholders)
\i utilities/database/initial-data/remaining_hobbies.sql

-- ============================================================================
-- Verification Queries
-- ============================================================================

-- Check table creation
SELECT schemaname, tablename, tableowner 
FROM pg_tables 
WHERE tablename IN (
  'bookworm', 'bingescape', 'film_frenzy', 'otaku_hub',
  'wanderlog', 'scribbles', 'shutter_tales', 'spot_light'
)
ORDER BY tablename;

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename IN (
  'bookworm', 'bingescape', 'film_frenzy', 'otaku_hub',
  'wanderlog', 'scribbles', 'shutter_tales', 'spot_light'
)
ORDER BY tablename, policyname;

-- Check data counts
SELECT 
  'bookworm' as table_name, COUNT(*) as record_count FROM bookworm
UNION ALL
SELECT 
  'bingescape' as table_name, COUNT(*) as record_count FROM bingescape  
UNION ALL
SELECT 
  'film_frenzy' as table_name, COUNT(*) as record_count FROM film_frenzy
UNION ALL
SELECT 
  'otaku_hub' as table_name, COUNT(*) as record_count FROM otaku_hub
UNION ALL
SELECT 
  'wanderlog' as table_name, COUNT(*) as record_count FROM wanderlog
UNION ALL
SELECT 
  'scribbles' as table_name, COUNT(*) as record_count FROM scribbles
UNION ALL
SELECT 
  'shutter_tales' as table_name, COUNT(*) as record_count FROM shutter_tales
UNION ALL
SELECT 
  'spot_light' as table_name, COUNT(*) as record_count FROM spot_light
ORDER BY table_name;

-- ============================================================================
-- Setup Complete
-- ============================================================================

-- Display success message
SELECT 'ViRa''s Lobby database setup completed successfully!' as status;

-- Instructions for next steps:
-- 1. Verify all tables are created with proper indexes
-- 2. Confirm RLS policies are active  
-- 3. Test authentication with owner/admin/guest users
-- 4. Begin frontend development with database integration 