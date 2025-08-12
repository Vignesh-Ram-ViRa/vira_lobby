-- Initial data for Otaku Hub (Anime) table
-- Based on Initial_data.md

-- NOTE: Replace 'bf7f746f-bba4-40bb-87a3-dab4574589a1' with your actual user UUID from Supabase

INSERT INTO otaku_hub (user_id, title, verse, season, genres, language, start_date, end_date, star_rating, watch_download_link, poster_image_url, comment) VALUES

-- Popular Anime
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'One Piece', 'Anime', '1', ARRAY['Action', 'Adventure', 'Fantasy'], 'Japanese', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/6/73245.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Bleach', 'Anime', '1', ARRAY['Action', 'Supernatural', 'Shounen'], 'Japanese', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/3/40451.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Death Note', 'Anime', '1', ARRAY['Supernatural', 'Thriller', 'Mystery'], 'Japanese', '08/25', '08/25', 3, 'Netflix', 'https://cdn.myanimelist.net/images/anime/9/9453.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Fairy Tail', 'Anime', '1', ARRAY['Action', 'Adventure', 'Fantasy'], 'Japanese', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/10/73274.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Naruto', 'Anime', '1', ARRAY['Action', 'Adventure', 'Ninja'], 'Japanese', '08/25', '08/25', 3, 'Plex', 'https://cdn.myanimelist.net/images/anime/13/17405.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Hunter x Hunter', 'Anime', '1', ARRAY['Action', 'Adventure', 'Fantasy'], 'Japanese', '08/25', '08/25', 3, 'MX Player', 'https://cdn.myanimelist.net/images/anime/11/33627.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Boku no Hero Academia', 'Anime', '1', ARRAY['Action', 'Superhero'], 'Japanese', '08/25', '08/25', 3, 'Ani.ME', 'https://cdn.myanimelist.net/images/anime/10/78745.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Seven Deadly Sins', 'Anime', '1', ARRAY['Action', 'Adventure', 'Fantasy'], 'Japanese', '08/25', '08/25', 3, 'Netflix', 'https://cdn.myanimelist.net/images/anime/7/79469.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Black Clover', 'Anime', '1', ARRAY['Action', 'Magic', 'Fantasy'], 'Japanese', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/9/9453.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Dragon Ball Z', 'Anime', '1', ARRAY['Action', 'Adventure', 'Martial Arts'], 'Japanese', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/5/32489.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Attack on Titan', 'Anime', '1', ARRAY['Action', 'Dark Fantasy', 'Post-Apocalyptic'], 'Japanese', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/10/47347.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Magi', 'Anime', '1', ARRAY['Action', 'Adventure', 'Fantasy'], 'Japanese', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/4/22045.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Assassination Classroom', 'Anime', '1', ARRAY['Action', 'Comedy', 'School'], 'Japanese', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/8/76011.jpg', 'ok'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Demon Slayer', 'Anime', '1', ARRAY['Action', 'Adventure', 'Supernatural'], 'Japanese', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/10/78745.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'One Punch Man', 'Anime', '1', ARRAY['Action', 'Comedy', 'Superhero'], 'Japanese', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/10/76014.jpg', 'ok'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Fullmetal Alchemist', 'Anime', '1', ARRAY['Action', 'Adventure', 'Fantasy'], 'Japanese', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Shaman King', 'Anime', '1', ARRAY['Action', 'Adventure', 'Supernatural'], 'Japanese', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/8/76011.jpg', 'ok'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Dr. Stone', 'Anime', '1', ARRAY['Action', 'Sci-Fi', 'Adventure'], 'Japanese', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/1502/100672.jpg', 'ok'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Jujutsu Kaisen', 'Anime', '1', ARRAY['Action', 'Supernatural', 'Fantasy'], 'Japanese', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/1171/103550.jpg', 'ok'),

-- Manhwa/Isekai
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'High School DxD', 'Manhwa', '1', ARRAY['Action', 'Supernatural', 'Ecchi'], 'Japanese', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/11/71281.jpg', 'bad'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Prison School', 'Manhwa', '1', ARRAY['Comedy', 'Drama', 'Ecchi'], 'Japanese', '08/25', '08/25', 3, 'Prime Video', 'https://cdn.myanimelist.net/images/anime/7/73037.jpg', 'bad'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'That Time I Got Reincarnated as a Slime', 'Manhwa', '1', ARRAY['Fantasy', 'Isekai'], 'Japanese', '08/25', '08/25', 3, 'Hulu', 'https://cdn.myanimelist.net/images/anime/11/94533.jpg', 'ok'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'In Another World With My Smartphone', 'Manhwa', '1', ARRAY['Fantasy', 'Adventure'], 'Japanese', '08/25', '08/25', 3, 'Prime Video', 'https://cdn.myanimelist.net/images/anime/9/94042.jpg', 'bad'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'BOFURI: I Don''t Want to Get Hurt so I''ll Max Out My Defense', 'Manhwa', '1', ARRAY['Fantasy', 'Comedy'], 'Japanese', '08/25', '08/25', 3, 'YouTube', 'https://cdn.myanimelist.net/images/anime/2/88009.jpg', 'bad'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Welcome to Demon School! Iruma-kun', 'Manhwa', '1', ARRAY['Fantasy', 'Comedy', 'School'], 'Japanese', '08/25', '08/25', 3, 'YouTube', 'https://cdn.myanimelist.net/images/anime/14/85660.jpg', 'bad'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'The Daily Life of the Immortal King', 'Manhwa', '1', ARRAY['Action', 'Fantasy'], 'Chinese', '08/25', '08/25', 3, 'Dailymotion', 'https://cdn.myanimelist.net/images/anime/1558/131969.jpg', 'ok'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Mushoku Tensei', 'Anime', '1', ARRAY['Adventure', 'Fantasy', 'Isekai'], 'Japanese', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/8/88043.jpg', 'ok'),

-- Western Animation
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Dragon Knight', 'Western', '1', ARRAY['Action', 'Fantasy'], 'English', '08/25', '08/25', 3, 'No official streaming link found', 'https://vignette.wikia.nocookie.net/dragonknight/images/7/79/Dragon_Knight_to_BE.png', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Kung Fu Panda: The Paws of Destiny', 'Western', '1', ARRAY['Family', 'Adventure'], 'English', '08/25', '08/25', 3, 'Netflix', 'https://occ-0-3003-3666.1.nflxso.net/art/5fce78a746fdcf4cc4788e9324999453a3815ae9.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Dragons: Riders of Berk', 'Western', '3', ARRAY['Action', 'Adventure', 'Fantasy'], 'English', '08/25', '08/25', 3, 'Netflix', 'https://cdn.myanimelist.net/images/anime/13/18377.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Dragons: Race to the Edge', 'Western', '6', ARRAY['Action', 'Adventure', 'Fantasy'], 'English', '08/25', '08/25', 3, 'Netflix', 'https://cdn.myanimelist.net/images/anime/9/76749.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Trollhunters: Tales of Arcadia', 'Western', '3', ARRAY['Fantasy', 'Adventure'], 'English', '08/25', '08/25', 3, 'Netflix', 'https://cdn.myanimelist.net/images/anime/11/99985.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Wizards: Tales of Arcadia', 'Western', '2', ARRAY['Fantasy', 'Adventure'], 'English', '08/25', '08/25', 3, 'Netflix', 'https://cdn.myanimelist.net/images/anime/14/110781.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', '3Below: Tales of Arcadia', 'Western', '2', ARRAY['Fantasy', 'Adventure'], 'English', '08/25', '08/25', 3, 'Netflix', 'https://cdn.myanimelist.net/images/anime/16/128089.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Arcane: League of Legends', 'Western', '1', ARRAY['Action', 'Adventure', 'Fantasy'], 'English', '08/25', '08/25', 3, 'Netflix', 'https://cdn.myanimelist.net/images/anime/17/94037.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'The Dragon Prince', 'Western', '4', ARRAY['Adventure', 'Fantasy'], 'English', '08/25', '08/25', 3, 'Netflix', 'https://cdn.myanimelist.net/images/anime/1/72066.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'The Dragon Prince: Mystery of Aaravos', 'Western', '1', ARRAY['Adventure', 'Fantasy'], 'English', '08/25', '08/25', 3, 'Netflix', 'https://cdn.myanimelist.net/images/anime/18/80898.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'The Legend of Vox Machina', 'Western', '1', ARRAY['Fantasy', 'Adventure'], 'English', '08/25', '08/25', 3, 'Prime Video', 'https://m.media-amazon.com/images/I/91SoWDGtuTL._AC_SY679_.jpg', 'good'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Dragon Age: Absolution', 'Western', '1', ARRAY['Fantasy', 'Action'], 'English', '08/25', '08/25', 3, 'Prime Video', 'https://m.media-amazon.com/images/I/81GgN9dTGwL._AC_SY679_.jpg', 'good'),

-- Recent Anime
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Hell''s Paradise', 'Anime', '1', ARRAY['Action', 'Supernatural'], 'Japanese', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/8/88331.jpg', 'ok'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Boruto: Naruto Next Generations', 'Anime', '1', ARRAY['Action', 'Adventure', 'Ninja'], 'Japanese', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/11/92634.jpg', 'ok'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Tower of God', 'Anime', '1', ARRAY['Action', 'Fantasy', 'Adventure'], 'Korean', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/6/72699.jpg', 'ok'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Record of Ragnarok', 'Anime', '1', ARRAY['Action', 'Fantasy', 'Supernatural'], 'Japanese', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/14/92948.jpg', 'ok'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Parasyte', 'Anime', '1', ARRAY['Horror', 'Sci-Fi', 'Thriller'], 'Japanese', '08/25', '08/25', 3, 'Crunchyroll', 'https://cdn.myanimelist.net/images/anime/11/24079.jpg', 'ok'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'My Daemon', 'Japanese', '1', ARRAY['Supernatural', 'Fantasy'], 'Japanese', '08/25', '08/25', 3, 'Not found', 'Not found', 'ok'); 