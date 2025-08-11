-- ViRa's Lobby - Database Schema
-- All hobby tables for personal hobby management portal

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. BOOKWORM (Books) Table
CREATE TABLE IF NOT EXISTS bookworm (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  series VARCHAR(255),
  authors TEXT[], -- Array of author names
  genres TEXT[], -- Array of genre tags
  language VARCHAR(100),
  start_date VARCHAR(7), -- MM/YY format
  end_date VARCHAR(7), -- MM/YY format
  star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
  read_download_link VARCHAR(500),
  pricing VARCHAR(20) CHECK (pricing IN ('Free', 'Paid')),
  cover_image_url VARCHAR(500),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. BINGESCAPE (Web Series) Table
CREATE TABLE IF NOT EXISTS bingescape (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  verse VARCHAR(255),
  description TEXT,
  season VARCHAR(50),
  genres TEXT[],
  language VARCHAR(100),
  start_date VARCHAR(7),
  end_date VARCHAR(7),
  star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
  watch_download_link VARCHAR(500),
  poster_image_url VARCHAR(500),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. FILM FRENZY (Movies) Table
CREATE TABLE IF NOT EXISTS film_frenzy (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  verse VARCHAR(255),
  part VARCHAR(100),
  genres TEXT[],
  language VARCHAR(100),
  date VARCHAR(7),
  imdb_rating DECIMAL(3,1),
  star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
  watch_download_link VARCHAR(500),
  poster_image_url VARCHAR(500),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. OTAKU HUB (Anime) Table
CREATE TABLE IF NOT EXISTS otaku_hub (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  verse VARCHAR(255),
  season VARCHAR(50),
  genres TEXT[],
  language VARCHAR(100),
  start_date VARCHAR(7),
  end_date VARCHAR(7),
  star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
  watch_download_link VARCHAR(500),
  poster_image_url VARCHAR(500),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. WANDERLOG (Travel) Table
CREATE TABLE IF NOT EXISTS wanderlog (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  city VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  area VARCHAR(255),
  attractions TEXT[], -- Array of attraction tags
  highlight TEXT,
  date VARCHAR(7),
  star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
  photos_link VARCHAR(500),
  sample_images TEXT[], -- Array of image URLs
  cover_image_url VARCHAR(500),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. SCRIBBLES (Doodles & Sketches) Table
CREATE TABLE IF NOT EXISTS scribbles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  genre VARCHAR(100),
  category VARCHAR(100),
  date VARCHAR(7),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. SHUTTER TALES (Photography) Table
CREATE TABLE IF NOT EXISTS shutter_tales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  location VARCHAR(255),
  genre VARCHAR(100),
  category VARCHAR(100),
  date VARCHAR(7),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. SPOT LIGHT (Personal Portfolio) Table
CREATE TABLE IF NOT EXISTS spot_light (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  location VARCHAR(255),
  genre VARCHAR(100),
  category VARCHAR(100),
  date VARCHAR(7),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookworm_user_id ON bookworm(user_id);
CREATE INDEX IF NOT EXISTS idx_bookworm_title ON bookworm(title);
CREATE INDEX IF NOT EXISTS idx_bookworm_authors ON bookworm USING GIN(authors);
CREATE INDEX IF NOT EXISTS idx_bookworm_genres ON bookworm USING GIN(genres);

CREATE INDEX IF NOT EXISTS idx_bingescape_user_id ON bingescape(user_id);
CREATE INDEX IF NOT EXISTS idx_bingescape_title ON bingescape(title);
CREATE INDEX IF NOT EXISTS idx_bingescape_genres ON bingescape USING GIN(genres);

CREATE INDEX IF NOT EXISTS idx_film_frenzy_user_id ON film_frenzy(user_id);
CREATE INDEX IF NOT EXISTS idx_film_frenzy_title ON film_frenzy(title);
CREATE INDEX IF NOT EXISTS idx_film_frenzy_genres ON film_frenzy USING GIN(genres);

CREATE INDEX IF NOT EXISTS idx_otaku_hub_user_id ON otaku_hub(user_id);
CREATE INDEX IF NOT EXISTS idx_otaku_hub_title ON otaku_hub(title);
CREATE INDEX IF NOT EXISTS idx_otaku_hub_genres ON otaku_hub USING GIN(genres);

CREATE INDEX IF NOT EXISTS idx_wanderlog_user_id ON wanderlog(user_id);
CREATE INDEX IF NOT EXISTS idx_wanderlog_city ON wanderlog(city);
CREATE INDEX IF NOT EXISTS idx_wanderlog_country ON wanderlog(country);
CREATE INDEX IF NOT EXISTS idx_wanderlog_attractions ON wanderlog USING GIN(attractions);

CREATE INDEX IF NOT EXISTS idx_scribbles_user_id ON scribbles(user_id);
CREATE INDEX IF NOT EXISTS idx_scribbles_name ON scribbles(name);

CREATE INDEX IF NOT EXISTS idx_shutter_tales_user_id ON shutter_tales(user_id);
CREATE INDEX IF NOT EXISTS idx_shutter_tales_name ON shutter_tales(name);

CREATE INDEX IF NOT EXISTS idx_spot_light_user_id ON spot_light(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_bookworm_updated_at BEFORE UPDATE ON bookworm 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bingescape_updated_at BEFORE UPDATE ON bingescape 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_film_frenzy_updated_at BEFORE UPDATE ON film_frenzy 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_otaku_hub_updated_at BEFORE UPDATE ON otaku_hub 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wanderlog_updated_at BEFORE UPDATE ON wanderlog 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_scribbles_updated_at BEFORE UPDATE ON scribbles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_shutter_tales_updated_at BEFORE UPDATE ON shutter_tales 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_spot_light_updated_at BEFORE UPDATE ON spot_light 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 