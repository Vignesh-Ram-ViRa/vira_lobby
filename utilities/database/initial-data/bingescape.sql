-- Initial data for Bingescape (Web Series) table
-- Based on Initial_data.md

-- NOTE: Replace 'bf7f746f-bba4-40bb-87a3-dab4574589a1' with your actual user UUID from Supabase

INSERT INTO bingescape (user_id, title, verse, description, season, genres, language, start_date, end_date, star_rating, watch_download_link, poster_image_url, comment) VALUES

-- Crime Genre
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Bones', 'Crime', 'Anthropologist helps FBI solve cases', '1', ARRAY['Crime', 'Drama', 'Mystery'], 'English', '05/09', '03/17', 3, 'Hotstar', 'https://m.media-amazon.com/images/I/91RtJuxrFYL._SL1200_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Brooklyn Nine-Nine', 'Crime', 'Comical police story', '1', ARRAY['Comedy', 'Crime'], 'English', '09/13', '09/21', 3, 'Netflix', 'https://m.media-amazon.com/images/I/81wGmMsqc4L._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Castle', 'Crime', 'Mystery writer helps police', '1', ARRAY['Crime', 'Drama', 'Mystery'], 'English', '03/09', '05/16', 3, 'Torrent (Full Series)', 'https://m.media-amazon.com/images/I/71e1npBwQ6L._SL1500_.jpg', 'Torrent link for full series'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Cold Case', 'Crime', 'Philly PD takes cold cases', '1', ARRAY['Crime', 'Drama', 'Mystery'], 'English', '03/09', '10/05', 3, 'HBO Max', 'https://m.media-amazon.com/images/I/91RtJuxrFYL._SL1200_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Deception', 'Crime', 'Illusionist helps police', '1', ARRAY['Crime', 'Drama', 'Mystery', 'Thriller'], 'English', '03/18', '05/18', 3, 'Prime Video', 'https://m.media-amazon.com/images/I/81wGmMsqc4L._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Elementary', 'Crime', 'Sherlock Holmes', '1', ARRAY['Crime', 'Drama', 'Mystery'], 'English', '12/09', '08/19', 3, 'Voot', 'https://m.media-amazon.com/images/I/71e1npBwQ6L._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Fringe', 'Crime', 'Scientists help police', '1', ARRAY['Drama', 'Mystery', 'Sci-Fi'], 'English', '08/09', '01/13', 3, 'Prime Video', 'https://m.media-amazon.com/images/I/81wGmMsqc4L._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Lucifer', 'Crime', 'Devil helps police', '1', ARRAY['Crime', 'Drama', 'Fantasy'], 'English', '01/16', '09/21', 3, 'Netflix', 'https://m.media-amazon.com/images/I/81wGmMsqc4L._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Mentalist', 'Crime', 'Mentalist helps police', '1', ARRAY['Crime', 'Drama', 'Mystery'], 'English', '08/09', '02/15', 3, 'Netflix', 'https://m.media-amazon.com/images/I/81wGmMsqc4L._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'NCIS', 'Crime', 'NCIS federal agency', '1', ARRAY['Crime', 'Drama', 'Action'], 'English', '03/09', 'Present', 3, 'Prime Video', 'https://m.media-amazon.com/images/I/81wGmMsqc4L._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Psych', 'Crime', 'Psychic helps police', '1', ARRAY['Comedy', 'Crime', 'Mystery'], 'English', '06/07', '03/14', 3, 'Netflix', 'https://m.media-amazon.com/images/I/81wGmMsqc4L._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Rizzoli and Isles', 'Crime', 'Coroner helps police', '1', ARRAY['Crime', 'Drama', 'Mystery'], 'English', '10/07', '09/16', 3, 'Hallmark Channel', 'https://m.media-amazon.com/images/I/81wGmMsqc4L._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Scorpion', 'Crime', 'Nerds help police', '1', ARRAY['Action', 'Crime', 'Drama'], 'English', '09/14', '04/18', 3, 'CBS', 'https://m.media-amazon.com/images/I/81wGmMsqc4L._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Sherlock', 'Crime', 'Sherlock Holmes', '1', ARRAY['Crime', 'Drama', 'Mystery'], 'English', '10/07', '01/17', 3, 'BBC iPlayer', 'https://m.media-amazon.com/images/I/81wGmMsqc4L._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'White Collar', 'Crime', 'Forger helps FBI', '1', ARRAY['Crime', 'Drama'], 'English', '09/10', '12/14', 3, 'Netflix', 'https://m.media-amazon.com/images/I/81wGmMsqc4L._SL1500_.jpg', 'NA'),

-- Fantasy Genre
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Wednesday (Addams Family)', 'Fantasy', 'Dark comedy focusing on Wednesday Addams at Nevermore Academy', '1', ARRAY['Fantasy', 'Mystery', 'Comedy'], 'English', '12/22', '', 3, 'Netflix', 'https://m.media-amazon.com/images/I/81wGmMsqc4L._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Game of Thrones', 'Fantasy', 'Epic fantasy drama by George R.R. Martin', '1', ARRAY['Drama', 'Fantasy'], 'English', '11/04', '05/19', 3, 'HBO', 'https://m.media-amazon.com/images/I/81wGmMsqc4L._SL1500_.jpg', 'Torrent link available online'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Good Omens', 'Fantasy', 'Angel and demon try to prevent apocalypse', '1', ARRAY['Comedy', 'Fantasy'], 'English', '05/19', '06/19', 3, 'Amazon Prime', 'https://m.media-amazon.com/images/I/81wGmMsqc4L._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Grimm', 'Fantasy', 'Detective fights supernatural creatures', '1', ARRAY['Fantasy', 'Crime', 'Drama'], 'English', '11/10', '03/17', 3, 'NBC', 'https://m.media-amazon.com/images/I/81wGmMsqc4L._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Heroes', 'Fantasy', 'Ordinary people discover remarkable powers; epic drama', '1', ARRAY['Drama', 'Sci-Fi'], 'English', '06/09', '10/02', 3, 'JioHotstar', 'https://m.media-amazon.com/images/I/71Q+e2yIX7L._SL1000_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'His Dark Materials', 'Fantasy', 'Epic fantasy trilogy following young Lyra''s quest', '3', ARRAY['Fantasy', 'Adventure'], 'English', '19/11', '22/11', 3, 'Showmax', 'https://m.media-amazon.com/images/I/91l-P4RbWEL._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'House of Dragon', 'Fantasy', 'Prequel to Game of Thrones, houses vie for Iron Throne', '1', ARRAY['Fantasy', 'Drama'], 'English', '22/08', 'Ongoing', 3, 'JioHotstar', 'https://m.media-amazon.com/images/I/81nNuh7iD-L._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Rings of Power', 'Fantasy', 'Middle-earth Second Age epic, fight for the Rings of Power', '2', ARRAY['Fantasy', 'Adventure'], 'English', '22/09', 'Ongoing', 3, 'Prime Video', 'https://m.media-amazon.com/images/I/91nqa8CojNL._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Sabrina', 'Fantasy', 'Teenage witch life and adventures', '1', ARRAY['Fantasy', 'Drama'], 'English', '18/10', '20/05', 3, 'Airtel Xstream', 'https://m.media-amazon.com/images/I/51vPIaL7iyL._SL1000_.jpg', 'Hindi version'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Sandman', 'Fantasy', 'Modern dark fantasy closely following the comic series', '1', ARRAY['Fantasy', 'Drama'], 'English', '22/08', 'Ongoing', 3, 'Netflix', 'https://m.media-amazon.com/images/I/71EVAlvDNkL._SL1000_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Stranger Things', 'Fantasy', 'Kids battle supernatural forces in 80s small town', '4', ARRAY['Drama', 'Fantasy'], 'English', '16/07', 'Ongoing', 3, 'Netflix', 'https://m.media-amazon.com/images/I/81LxV3Gb7UL._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'The Magicians', 'Fantasy', 'University students mastering magic, dark twists', '5', ARRAY['Fantasy', 'Drama'], 'English', '15/12', '20/04', 3, 'SyFy', 'https://m.media-amazon.com/images/I/81VyJ7ft9YL._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Vikings', 'Fantasy', 'Historical saga about Viking clans', '6', ARRAY['Action', 'Drama'], 'English', '13/03', '20/12', 3, 'Prime Video', 'https://m.media-amazon.com/images/I/91257JNxTTL._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Witcher', 'Fantasy', 'Monster hunter Geralt in dark fantasy world', '3', ARRAY['Fantasy', 'Adventure'], 'English', '19/12', 'Ongoing', 3, 'Netflix', 'https://m.media-amazon.com/images/I/81nMygdz5YL._SL1500_.jpg', 'NA'),

-- Marvel Genre
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Falcon and Winter Soldier', 'Marvel', 'Superhero action drama', '1', ARRAY['Action', 'Drama'], 'English', '21/03', '21/05', 3, 'Hotstar', 'https://m.media-amazon.com/images/I/81OWy1UbLtL._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Hawkeye', 'Marvel', 'Superhero action', '1', ARRAY['Action', 'Adventure'], 'English', '21/11', '21/12', 3, 'Hotstar', 'https://m.media-amazon.com/images/I/91OVPfvvTEL._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Loki', 'Marvel', 'Superhero fantasy', '1', ARRAY['Action', 'Adventure'], 'English', '21/06', '21/07', 3, 'Disney+ Hotstar', 'https://m.media-amazon.com/images/I/91Nq9pPZNmL._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Ms. Marvel', 'Marvel', 'Superhero coming of age', '1', ARRAY['Action', 'Adventure'], 'English', '22/06', '22/07', 3, 'Hotstar', 'https://m.media-amazon.com/images/I/71zG1xohlpL._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'WandaVision', 'Marvel', 'Superhero sitcom', '1', ARRAY['Comedy', 'Fantasy'], 'English', '21/01', '21/03', 3, 'Disney+ Hotstar', 'https://m.media-amazon.com/images/I/713Ai9ULOcL._SL1500_.jpg', 'NA'),

-- Other Genres
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Money Heist', 'Other', 'Heist crime drama', '5', ARRAY['Crime', 'Drama'], 'Spanish', '17/05', '20/12', 3, 'Netflix', 'https://m.media-amazon.com/images/I/81wGmMsqc4L._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Prison Break', 'Other', 'Prison escape drama', '5', ARRAY['Crime', 'Drama'], 'English', '05/08', '17/05', 3, 'Netflix', 'https://m.media-amazon.com/images/I/81ABoFQdUyL._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Suits', 'Other', 'Lawyers drama', '9', ARRAY['Crime', 'Drama'], 'English', '11/06', '19/09', 3, 'Amazon', 'https://m.media-amazon.com/images/I/71e1npBwQ6L._SL1500_.jpg', 'NA'),

-- Sitcom
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Big Bang Theory', 'Sitcom', 'Comedy about socially awkward scientists', '12', ARRAY['Comedy'], 'English', '07/09', '19/05', 3, 'CBS', 'https://m.media-amazon.com/images/I/71xRhGYEHyL._SL1500_.jpg', 'NA'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Friends', 'Sitcom', 'Friends navigating life in NYC', '10', ARRAY['Comedy'], 'English', '94/09', '04/05', 3, 'Torrent', 'https://m.media-amazon.com/images/I/71ktaHTGTUL._SL1500_.jpg', 'Torrent link'),
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'How I Met Your Mother', 'Sitcom', 'Comedy, Romance', '9', ARRAY['Comedy', 'Romance'], 'English', '05/09', '14/03', 3, 'Hulu', 'https://m.media-amazon.com/images/I/81z3l7wZckL._SL1500_.jpg', 'NA'); 