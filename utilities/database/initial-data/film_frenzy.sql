-- Initial data for Film Frenzy (Movies) table
-- Based on Initial_data.md

-- NOTE: Replace 'bf7f746f-bba4-40bb-87a3-dab4574589a1' with your actual user UUID from Supabase

INSERT INTO film_frenzy (user_id, title, verse, part, genres, language, date, imdb_rating, star_rating, watch_download_link, poster_image_url, comment) VALUES

-- Disney and Family Movies
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Secret Society of Second Born Royals', '', '', ARRAY['Action', 'Adventure', 'Fantasy', 'Kids & Family'], 'English', '12/20', 5.0, 3, 'Disney+', 'https://m.media-amazon.com/images/I/81bXjP474AL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Artemis Fowl', '', '', ARRAY['Science Fantasy', 'Adventure'], 'English', '06/20', 4.3, 3, 'Disney+', 'https://m.media-amazon.com/images/I/81NzLelRRTL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Herbie Fully Loaded', 'Herbie', '', ARRAY['Family', 'Comedy', 'Sports'], 'English', '05/06', 5.7, 3, 'Disney+', 'https://m.media-amazon.com/images/I/61mz3I4dXOL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Tomorrowland', '', '', ARRAY['Action', 'Adventure', 'Sci-Fi'], 'English', '05/15', 6.4, 3, 'Disney+', 'https://m.media-amazon.com/images/I/71C09g2aybL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Aladdin', '', '2019', ARRAY['Adventure', 'Family', 'Fantasy'], 'English', '05/19', 6.9, 3, 'Disney+', 'https://m.media-amazon.com/images/I/81wZKbhO8yL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Night at the Museum', '', '', ARRAY['Adventure', 'Comedy', 'Family'], 'English', '12/06', 6.5, 3, 'Disney+', 'https://m.media-amazon.com/images/I/81e-JpkQPrL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'John Carter', '', '', ARRAY['Action', 'Adventure', 'Sci-Fi'], 'English', '12/03', 6.6, 3, 'Disney+', 'https://m.media-amazon.com/images/I/91TgFlzZshL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Prince of Persia', '', '', ARRAY['Action', 'Adventure', 'Fantasy'], 'English', '10/05', 6.6, 3, 'Disney+', 'https://m.media-amazon.com/images/I/91LMZ9sMMzL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Race to Witch Mountain', '', '', ARRAY['Action', 'Adventure', 'Family'], 'English', '09/03', 5.7, 3, 'Disney+', 'https://m.media-amazon.com/images/I/81Y1deHVw5L._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Jungle Cruise', '', '2021', ARRAY['Action', 'Adventure', 'Comedy'], 'English', '21/07', 6.7, 3, 'Disney+', 'https://m.media-amazon.com/images/I/91vL+UcHhkL._AC_SY679_.jpg', 'NA'),

-- Fantasy and Action Movies
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'The Sorcerer''s Apprentice', '', '', ARRAY['Action', 'Adventure', 'Fantasy'], 'English', '10/07', 6.1, 3, 'Amazon', 'https://m.media-amazon.com/images/I/510RTVJUYWL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Horns', '', '', ARRAY['Comedy', 'Drama', 'Fantasy', 'Horror'], 'English', '13/10', 6.0, 3, 'Amazon', 'https://m.media-amazon.com/images/I/51QON6EveOL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Immortals', '', '', ARRAY['Action', 'Adventure', 'Fantasy'], 'English', '11/11', 6.0, 3, 'Amazon', 'https://m.media-amazon.com/images/I/51O2c+iC28L._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Jack the Giant Slayer', '', '', ARRAY['Action', 'Adventure', 'Fantasy'], 'English', '13/03', 6.3, 3, 'Amazon', 'https://m.media-amazon.com/images/I/51QvK9AEnHL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'RIPD', '', '', ARRAY['Action', 'Comedy', 'Fantasy'], 'English', '13/07', 5.6, 3, 'Amazon', 'https://m.media-amazon.com/images/I/51v7R+nJ5HL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Mortal Kombat', '', '2021', ARRAY['Action', 'Adventure', 'Fantasy'], 'English', '21/04', 6.1, 3, 'Amazon', 'https://m.media-amazon.com/images/I/71ssYXKNkYL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Assassin''s Creed', '', '', ARRAY['Action', 'Adventure', 'Sci-Fi'], 'English', '16/12', 5.6, 3, 'Amazon', 'https://m.media-amazon.com/images/I/81fAv89xKVL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'I, Frankenstein', '', '', ARRAY['Action', 'Fantasy', 'Horror'], 'English', '14/01', 5.1, 3, 'Amazon', 'https://m.media-amazon.com/images/I/91ZqGqPgLxL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Abraham Lincoln: Vampire Hunter', '', '', ARRAY['Action', 'Fantasy', 'Horror'], 'English', '12/06', 5.9, 3, 'Amazon', 'https://m.media-amazon.com/images/I/71zjFikrGsL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Hansel & Gretel: Witch Hunters', '', '', ARRAY['Action', 'Fantasy', 'Horror'], 'English', '13/01', 6.1, 3, 'Amazon', 'https://m.media-amazon.com/images/I/91EY3X1-P-L._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Snow White and the Huntsman', '', '', ARRAY['Action', 'Adventure', 'Drama'], 'English', '12/06', 6.1, 3, 'Amazon', 'https://m.media-amazon.com/images/I/81RGrvJwVqL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Jumper', '', '', ARRAY['Action', 'Sci-Fi', 'Adventure'], 'English', '08/02', 6.1, 3, 'Amazon', 'https://m.media-amazon.com/images/I/718x8eRjZ3L._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Beowulf', '', '', ARRAY['Animation', 'Action', 'Adventure'], 'English', '07/11', 6.2, 3, 'Amazon', 'https://m.media-amazon.com/images/I/71o-5lVvGFL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Eragon', '', '', ARRAY['Action', 'Adventure', 'Family'], 'English', '06/12', 5.0, 3, 'Amazon', 'https://m.media-amazon.com/images/I/81ANmZsV5bL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Warcraft', '', '', ARRAY['Action', 'Adventure', 'Fantasy'], 'English', '16/06', 6.7, 3, 'Amazon', 'https://m.media-amazon.com/images/I/91z9x0g6K5L._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Gods of Egypt', '', '', ARRAY['Action', 'Fantasy', 'Adventure'], 'English', '16/02', 5.4, 3, 'Amazon', 'https://m.media-amazon.com/images/I/91TmtEnKKjL._AC_SY679_.jpg', 'NA'),

-- Mythology and Ancient
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Wrath of the Titans', '', '', ARRAY['Action', 'Adventure', 'Fantasy'], 'English', '12/03', 5.7, 3, 'Amazon', 'https://m.media-amazon.com/images/I/91FTVmW5XUL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Clash of the Titans', '', '', ARRAY['Action', 'Adventure', 'Fantasy'], 'English', '10/04', 5.8, 3, 'Amazon', 'https://m.media-amazon.com/images/I/91W3sOXcM-L._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Hercules', '', '2014', ARRAY['Action', 'Adventure', 'Fantasy'], 'English', '14/07', 6.0, 3, 'Amazon', 'https://m.media-amazon.com/images/I/71IXeX8XkqL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Conan the Barbarian', '', '2011', ARRAY['Action', 'Adventure', 'Fantasy'], 'English', '11/08', 5.2, 3, 'Amazon', 'https://m.media-amazon.com/images/I/91MRtUhnMML._AC_SY679_.jpg', 'NA'),

-- Sci-Fi and Thriller
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Catch Me If You Can', '', '', ARRAY['Biography', 'Crime', 'Drama'], 'English', '02/12', 8.1, 3, 'Netflix', 'https://m.media-amazon.com/images/I/51rOnIjLqzL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'The Prestige', '', '', ARRAY['Drama', 'Mystery', 'Thriller'], 'English', '06/10', 8.5, 3, 'Amazon', 'https://m.media-amazon.com/images/I/51Q7r1gHBkL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'The Illusionist', '', '', ARRAY['Animation', 'Drama'], 'English', '06/12', 7.5, 3, 'Amazon', 'https://m.media-amazon.com/images/I/51lLqrSoX9L._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Teenage Mutant Ninja Turtles', '', '2014', ARRAY['Action', 'Adventure', 'Comedy'], 'English', '14/08', 5.8, 3, 'Amazon', 'https://m.media-amazon.com/images/I/91yRMUU7i6L._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Aliens in the Attic', '', '', ARRAY['Adventure', 'Comedy', 'Family'], 'English', '09/07', 5.4, 3, 'Amazon', 'https://m.media-amazon.com/images/I/81T7i0w-8iL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Men in Black (MIB)', '', '1997', ARRAY['Action', 'Adventure', 'Comedy'], 'English', '97/07', 7.3, 3, 'Amazon', 'https://m.media-amazon.com/images/I/91TY-VEg5kL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'The Great Wall', '', '', ARRAY['Action', 'Adventure', 'Fantasy'], 'English', '17/02', 5.9, 3, 'Amazon', 'https://m.media-amazon.com/images/I/81WEu2YF2xL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Uncharted', '', '2022', ARRAY['Action', 'Adventure'], 'English', '22/02', 6.3, 3, 'Amazon', 'https://m.media-amazon.com/images/I/81YYmB1L6BL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Cowboys & Aliens', '', '', ARRAY['Action', 'Sci-Fi', 'Western'], 'English', '11/07', 6.0, 3, 'Amazon', 'https://m.media-amazon.com/images/I/91O2fV2gAvL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'War of the Worlds', '', '2005', ARRAY['Adventure', 'Sci-Fi', 'Thriller'], 'English', '05/06', 6.5, 3, 'Amazon', 'https://m.media-amazon.com/images/I/81sov2rkCQL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Rampage', '', '2018', ARRAY['Action', 'Adventure', 'Sci-Fi'], 'English', '18/04', 6.1, 3, 'Amazon', 'https://m.media-amazon.com/images/I/91kQms7R2ML._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Doom', '', '2005', ARRAY['Action', 'Horror', 'Sci-Fi'], 'English', '05/10', 5.2, 3, 'Amazon', 'https://m.media-amazon.com/images/I/91nkJuqb7KL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Riddick', '', '2013', ARRAY['Action', 'Sci-Fi', 'Thriller'], 'English', '13/09', 6.4, 3, 'Amazon', 'https://m.media-amazon.com/images/I/91rz6G7Nh5L._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Pacific Rim', '', '2013', ARRAY['Action', 'Adventure', 'Sci-Fi'], 'English', '13/07', 6.9, 3, 'Amazon', 'https://m.media-amazon.com/images/I/91MZl0alUuL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'I Am Legend', '', '2007', ARRAY['Action', 'Drama', 'Sci-Fi'], 'English', '07/12', 7.2, 3, 'Amazon', 'https://m.media-amazon.com/images/I/91p9xK2bJhL._AC_SY679_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Bright', '', '2017', ARRAY['Action', 'Fantasy', 'Thriller'], 'English', '17/12', 6.3, 3, 'Netflix', 'https://m.media-amazon.com/images/I/91-8VRAw+vL._AC_SY679_.jpg', 'NA'),

-- Romance and Drama
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Twilight', '', '2008', ARRAY['Drama', 'Fantasy', 'Romance'], 'English', '08/11', 5.3, 3, 'Amazon', 'https://m.media-amazon.com/images/I/91ZqYyqtMZL._AC_SY679_.jpg', 'NA'); 