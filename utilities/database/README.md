# ViRa's Lobby Database Setup

This directory contains all the necessary SQL scripts to set up the complete database structure for ViRa's Lobby hobbies portal.

## 📁 File Structure

```
utilities/database/
├── setup.sql                 # Master setup script (run this first)
├── schema.sql                # Table creation and indexes
├── rls-policies.sql          # Row Level Security policies
├── initial-data/
│   ├── bookworm.sql          # Books initial data
│   ├── bingescape.sql        # Web series initial data
│   ├── film_frenzy.sql       # Movies initial data
│   ├── otaku_hub.sql         # Anime initial data
│   └── remaining_hobbies.sql # Placeholder for empty tables
└── README.md                 # This file
```

## 🚀 Quick Setup

### Method 1: One-Command Setup
```bash
psql -h your_supabase_host -U postgres -d postgres -f utilities/database/setup.sql
```

### Method 2: Step-by-Step Setup
```bash
# 1. Create tables and indexes
psql -h your_supabase_host -U postgres -d postgres -f utilities/database/schema.sql

# 2. Set up security policies
psql -h your_supabase_host -U postgres -d postgres -f utilities/database/rls-policies.sql

# 3. Insert initial data
psql -h your_supabase_host -U postgres -d postgres -f utilities/database/initial-data/bookworm.sql
psql -h your_supabase_host -U postgres -d postgres -f utilities/database/initial-data/bingescape.sql
psql -h your_supabase_host -U postgres -d postgres -f utilities/database/initial-data/film_frenzy.sql
psql -h your_supabase_host -U postgres -d postgres -f utilities/database/initial-data/otaku_hub.sql
```

## 🔧 Supabase Setup

### Connection Details
- **Host**: `db.uqrlvppsnppobzowlcqw.supabase.co`
- **Database**: `postgres`
- **Username**: `postgres`
- **Password**: `N@rutoUzumaki130892`
- **Port**: `5432`

### Connection String
```
postgresql://postgres:N@rutoUzumaki130892@db.uqrlvppsnppobzowlcqw.supabase.co:5432/postgres
```

## 📊 Database Schema Overview

### Created Tables
1. **bookworm** - Books and reading records
2. **bingescape** - Web series and TV shows
3. **film_frenzy** - Movies and films
4. **otaku_hub** - Anime and animated content
5. **wanderlog** - Travel experiences (empty)
6. **scribbles** - Doodles and sketches (empty)
7. **shutter_tales** - Photography (empty)
8. **spot_light** - Personal portfolio photos (empty)

### Sample Data Counts
- **Bookworm**: ~25 books (English + Tamil)
- **Bingescape**: ~18 web series
- **Film Frenzy**: ~28 movies
- **Otaku Hub**: ~30 anime titles
- **Remaining**: Empty (to be populated via app)

## 👥 User Access Levels

### Owner (`vickyram.vira@gmail.com`)
- Full CRUD access to own records
- All hobby categories available
- Export and bulk upload capabilities

### Super Admin (`vigneshuramu@gmail.com`)
- Read/write access to all records
- System administration capabilities
- Full data oversight

### Guest Users
- Read-only access to owner's public records
- No modification capabilities
- Limited browsing and viewing

## 🔐 Row Level Security (RLS)

All tables have RLS enabled with policies for:
- **SELECT**: Read access based on user permissions
- **INSERT**: Only owner/admin can create records
- **UPDATE**: Only owner (own records) and admin can modify
- **DELETE**: Only owner (own records) and admin can delete

## 🖼️ Image Storage Strategy

### Cloudinary Organization
- **Folder Structure**: `/vira_lobby/{hobby_category}/`
- **Optimization**: Different strategies per hobby type

### Media-Focused Hobbies (Books, Series, Movies, Anime)
- **Thumbnails**: 200x300px (~10-15KB)
- **Medium**: 400x600px (~30-50KB)
- **Policy**: Delete originals after optimization

### Image-Focused Hobbies (Travel, Art, Photography)
- **Thumbnails**: 300x300px (~15-25KB)
- **Display**: 800x800px (~100-200KB)  
- **High Quality**: 1920x1920px (<10MB)
- **Policy**: Keep high-quality versions

## ✅ Verification Queries

After setup, run these queries to verify everything is working:

```sql
-- Check table creation
SELECT tablename FROM pg_tables 
WHERE tablename LIKE '%bookworm%' OR tablename LIKE '%bingescape%' 
   OR tablename LIKE '%film_frenzy%' OR tablename LIKE '%otaku_hub%';

-- Check data counts
SELECT 'bookworm' as table_name, COUNT(*) as records FROM bookworm
UNION SELECT 'bingescape', COUNT(*) FROM bingescape
UNION SELECT 'film_frenzy', COUNT(*) FROM film_frenzy  
UNION SELECT 'otaku_hub', COUNT(*) FROM otaku_hub;

-- Test RLS policies
SELECT tablename, policyname FROM pg_policies 
WHERE tablename IN ('bookworm', 'bingescape', 'film_frenzy', 'otaku_hub');
```

## 🚨 Important Notes

1. **Shared Users Table**: This setup uses the existing `auth.users` table from ViRa Verse
2. **User Dependencies**: Ensure users `vickyram.vira@gmail.com` and `vigneshuramu@gmail.com` exist
3. **RLS Functions**: Helper functions are created to check user permissions
4. **Array Fields**: Genre and author fields use PostgreSQL arrays for flexible storage

## 🔄 Next Steps

After database setup:
1. Configure Supabase environment variables in frontend
2. Set up Cloudinary integration
3. Test authentication flows
4. Begin frontend development with database integration
5. Implement image upload functionality

## 🛠️ Troubleshooting

### Common Issues
- **Permission Denied**: Ensure you're using the service role key for setup
- **User Not Found**: Create the required users in Supabase Auth first
- **RLS Errors**: Check that helper functions are created before policies
- **Connection Issues**: Verify connection string and network access

### Reset Database
To start fresh:
```sql
-- Drop all hobby tables (careful!)
DROP TABLE IF EXISTS bookworm, bingescape, film_frenzy, otaku_hub, 
                     wanderlog, scribbles, shutter_tales, spot_light CASCADE;

-- Re-run setup
\i utilities/database/setup.sql
``` 