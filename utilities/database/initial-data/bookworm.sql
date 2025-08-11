-- Initial data for bookworm table based on existing collection
-- Replace 'bf7f746f-bba4-40bb-87a3-dab4574589a1' with your actual user ID from auth.users table

-- English Books
INSERT INTO bookworm (user_id, title, series, authors, genres, language, start_date, end_date, star_rating, read_download_link, pricing, cover_image_url, comment) VALUES

-- Fantasy & Adventure
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Devil''s Paintbox', 'The Witching Legacy', ARRAY['Robin Jarvis'], ARRAY['Fantasy', 'Dark fantasy'], 'English', '2025-08', '2025-08', 3, 'https://www.penguinrandomhouse.com/books/111991/the-devils-paintbox-by-victoria-mckernan/', 'Paid', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'The Exorcist', null, ARRAY['William Peter Blatty'], ARRAY['Horror', 'Occult'], 'English', '2025-08', '2025-08', 3, 'https://yourbookshelf.net/books/the-exorcist/', 'Free', 'https://upload.wikimedia.org/wikipedia/en/a/a9/TheExorcistNovel.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Spook''s Apprentice', 'The Wardstone Chronicles', ARRAY['Joseph Delaney'], ARRAY['Dark fantasy', 'Children'], 'English', '2025-08', '2025-08', 3, 'https://in.pinterest.com/pin/free-download-the-spooks-apprentice-book-1-the-wardstone-chronicles--838091811891281014/', 'Free', 'https://upload.wikimedia.org/wikipedia/en/5/5f/Spook%27s_Apprentice_cover.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'The Slayers of Seth', null, ARRAY['Paul Doherty'], ARRAY['Mystery', 'Historical fiction'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/0751502316', 'Paid', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Fire Chronicle', 'Books of Beginning', ARRAY['John Stephens'], ARRAY['Fantasy', 'Adventure'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/Fire-Chronicle-Books-Beginning-Book-ebook/dp/B008A3ZPQ6', 'Paid', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'How to Train Your Dragon', 'How to Train Your Dragon', ARRAY['Cressida Cowell'], ARRAY['Children', 'Fantasy', 'Adventure'], 'English', '2025-08', '2025-08', 3, 'https://cdn.bookey.app/files/pdf/book/en/how-to-train-your-dragon.pdf', 'Free', 'https://upload.wikimedia.org/wikipedia/en/c/c9/How_to_Train_Your_Dragon_%28Book_1%29.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Necropolis', 'Alex Rider (spin-off)', ARRAY['Anthony Horowitz'], ARRAY['Spy', 'Young Adult'], 'English', '2025-08', '2025-08', 3, 'https://www.goodreads.com/book/show/2870651-necropolis', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/4/4a/Necropolis_cover.jpeg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Origin', 'Robert Langdon series', ARRAY['Dan Brown'], ARRAY['Thriller', 'Mystery'], 'English', '2025-08', '2025-08', 3, 'https://bookzoo.in/products/origin-ad20249', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/a/a1/Origin_by_Dan_Brown.png', null),

-- Children's Fantasy
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Fun with Worst Witch', 'The Worst Witch', ARRAY['Jill Murphy'], ARRAY['Children', 'Humor', 'Fantasy'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/0141323379', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/1/11/Fun_With_Worst_Witch.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'A Bad Spell for the Worst Witch', 'The Worst Witch', ARRAY['Jill Murphy'], ARRAY['Children', 'Fantasy', 'Humor'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/0763672571', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/5/59/ABadSpellForTheWorstWitch.jpg', null),

-- Rick Riordan Series
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Percy Jackson – The Titan''s Curse', 'Percy Jackson & the Olympians (#3)', ARRAY['Rick Riordan'], ARRAY['Fantasy', 'Mythology', 'Young Adult'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/0142414189', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/4/44/Percy_Jackson_and_the_Titan%27s_Curse.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Magnus Chase – The Ship of the Dead', 'Magnus Chase and the Gods of Asgard', ARRAY['Rick Riordan'], ARRAY['Fantasy', 'Mythology', 'Young Adult'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/1423160932', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/3/30/Ship_of_the_Dead_cover.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Trials of Apollo – The Dark Prophecy', 'Trials of Apollo', ARRAY['Rick Riordan'], ARRAY['Fantasy', 'Mythology', 'Young Adult'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/1484746421', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/1/1e/The_Dark_Prophecy.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Trials of Apollo – The Burning Maze', 'Trials of Apollo', ARRAY['Rick Riordan'], ARRAY['Fantasy', 'Mythology', 'Young Adult'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/148474643X', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/8/80/The_Burning_Maze.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Trials of Apollo – The Tyrant''s Tomb', 'Trials of Apollo', ARRAY['Rick Riordan'], ARRAY['Fantasy', 'Mythology', 'Young Adult'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/1484746448', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/0/07/The_Tyrant%27s_Tomb.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Trials of Apollo – The Tower of Nero', 'Trials of Apollo', ARRAY['Rick Riordan'], ARRAY['Fantasy', 'Mythology', 'Young Adult'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/1484746456', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/4/43/The_Tower_of_Nero.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Trials of Apollo – The Hidden Oracle', 'Trials of Apollo', ARRAY['Rick Riordan'], ARRAY['Fantasy', 'Mythology', 'Young Adult'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/1484746413', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/2/28/The_Hidden_Oracle.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Kane Chronicles – The Red Pyramid', 'The Kane Chronicles', ARRAY['Rick Riordan'], ARRAY['Fantasy', 'Mythology', 'Adventure'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/142314189X', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/3/3c/Kane_Chronicles_Red_Pyramid.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Kane Chronicles – The Throne of Fire', 'The Kane Chronicles', ARRAY['Rick Riordan'], ARRAY['Fantasy', 'Mythology', 'Adventure'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/1423140567', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/f/fb/Kane_Chronicles_Throne_of_Fire.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Kane Chronicles – The Serpent''s Shadow', 'The Kane Chronicles', ARRAY['Rick Riordan'], ARRAY['Fantasy', 'Mythology', 'Adventure'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/1423140575', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/2/25/Kane_Chronicles_Serpents_Shadow.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Heroes of Olympus – House of Hades', 'Heroes of Olympus', ARRAY['Rick Riordan'], ARRAY['Fantasy', 'Mythology', 'Young Adult'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/1423146727', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/0/0d/House_of_Hades_cover.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Heroes of Olympus – Blood of Olympus', 'Heroes of Olympus', ARRAY['Rick Riordan'], ARRAY['Fantasy', 'Mythology', 'Young Adult'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/1423146735', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/1/19/Blood_of_Olympus_cover.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Percy Jackson – Chalice of the Gods', 'Percy Jackson & the Olympians', ARRAY['Rick Riordan'], ARRAY['Fantasy', 'Mythology', 'Young Adult'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/136809817X', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/3/30/Chalice_of_the_Gods_cover.jpeg', null),

-- Clive Cussler Adventure Series
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Valhalla Rising', 'Standalone (Cussler)', ARRAY['Clive Cussler'], ARRAY['Adventure', 'Historical fiction'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/0425199582', 'Paid', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Inca Gold', 'Dirk Pitt series', ARRAY['Clive Cussler'], ARRAY['Adventure', 'Thriller'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/0425190682', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/6/6c/Inca_Gold.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Romanov Ransom', 'Dirk Pitt series', ARRAY['Clive Cussler'], ARRAY['Adventure', 'Thriller'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/0399575574', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/4/4f/Romanov_Ransom.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Pacific Vortex', 'Dirk Pitt series', ARRAY['Clive Cussler'], ARRAY['Adventure', 'Thriller'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/0425197393', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/c/ca/Pacific_Vortex_Cussler_cover.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Eye of Heaven', 'Dirk Pitt series', ARRAY['Clive Cussler'], ARRAY['Adventure', 'Thriller'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/0399167142', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/4/44/Eye_of_Heaven_cover.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'The Chase', 'Dirk Pitt series', ARRAY['Clive Cussler'], ARRAY['Adventure', 'Thriller'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/0425229194', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/2/2e/The_Chase_book_cover.jpg', null),

-- Harry Potter Series
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Harry Potter – Prisoner of Azkaban', 'Harry Potter series (#3)', ARRAY['J.K. Rowling'], ARRAY['Fantasy', 'Young Adult'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/0439136369', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/5/5e/HP3_book_cover.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Harry Potter – Deathly Hallows', 'Harry Potter series (#7)', ARRAY['J.K. Rowling'], ARRAY['Fantasy', 'Young Adult'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/0545010225', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/a/a9/Harry_Potter_and_the_Deathly_Hallows.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Harry Potter – Sorcerer''s Stone', 'Harry Potter series (#1)', ARRAY['J.K. Rowling'], ARRAY['Fantasy', 'Young Adult'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/0439708184', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Harry Potter – Chamber of Secrets', 'Harry Potter series (#2)', ARRAY['J.K. Rowling'], ARRAY['Fantasy', 'Young Adult'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/0439064872', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/5/5c/Chamber_of_Secrets_cover.jpg', null),

-- Indian Authors
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Revolution 2020', null, ARRAY['Chetan Bhagat'], ARRAY['Romance', 'Fiction', 'Contemporary'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.in/dp/8129135536', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/d/d0/Revolution_2020_cover.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', '2 States', null, ARRAY['Chetan Bhagat'], ARRAY['Romance', 'Fiction', 'Contemporary'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.in/dp/8129115301', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/c/c0/2_States_Book_Cover.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Half Girlfriend', null, ARRAY['Chetan Bhagat'], ARRAY['Romance', 'Fiction', 'Contemporary'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.in/dp/8129135722', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/7/71/Half_Girlfriend.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', '3 Mistakes of My Life', null, ARRAY['Chetan Bhagat'], ARRAY['Romance', 'Fiction', 'Contemporary'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.in/dp/8129115301', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/7/78/3_Mistakes_of_My_Life.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'I Too Had a Love Story', null, ARRAY['Ravinder Singh'], ARRAY['Romance', 'Fiction'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.in/dp/0143418769', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/e/ee/I_Too_Had_A_Love_Story.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Secret of Nagas', 'Shiva Trilogy', ARRAY['Amish Tripathi'], ARRAY['Mythology', 'Fantasy', 'Fiction'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.in/dp/9356294569', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/6/6e/Secret_of_the_Nagas.jpg', null),

-- Demigods Academy Series
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Demigods Academy – Year 1', 'Demigods Academy', ARRAY['Elisa S. Amore'], ARRAY['Fantasy', 'Young Adult', 'Mythology'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/B07VHPYLG1', 'Paid', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Demigods Academy – Year 2', 'Demigods Academy', ARRAY['Elisa S. Amore'], ARRAY['Fantasy', 'Young Adult', 'Mythology'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/B07Y5WQT9K', 'Paid', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Demigods Academy – Year 3', 'Demigods Academy', ARRAY['Elisa S. Amore'], ARRAY['Fantasy', 'Young Adult', 'Mythology'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/B081791L64', 'Paid', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Demigods Academy – Year 4', 'Demigods Academy', ARRAY['Elisa S. Amore'], ARRAY['Fantasy', 'Young Adult', 'Mythology'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/B085DRXPL9', 'Paid', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Demigods Academy – Year 5', 'Demigods Academy', ARRAY['Elisa S. Amore'], ARRAY['Fantasy', 'Young Adult', 'Mythology'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/B088YJZHRK', 'Paid', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop', null),

-- Fantasy & Other Books
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Twilight', 'Twilight saga', ARRAY['Stephenie Meyer'], ARRAY['Fantasy', 'Romance', 'Young Adult'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/0316015849', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/9/9f/Twilight_cover.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Bartimaeus – The Amulet of Samarkand', 'Bartimaeus Trilogy (#1)', ARRAY['Jonathan Stroud'], ARRAY['Fantasy', 'Children', 'Adventure'], 'English', '2025-08', '2025-08', 3, 'https://www.amazon.com/dp/078681859X', 'Paid', 'https://upload.wikimedia.org/wikipedia/en/0/01/Amulet_of_Samarkand_cover.jpg', null);

-- Tamil Books
INSERT INTO bookworm (user_id, title, series, authors, genres, language, start_date, end_date, star_rating, read_download_link, pricing, cover_image_url, comment) VALUES

-- Sujatha Books
('bf7f746f-bba4-40bb-87a3-dab4574589a1', '24 Roobai Theevu', null, ARRAY['Sujatha'], ARRAY['Fiction', 'Thriller', 'Short Stories'], 'Tamil', '2025-08', '2025-08', 3, 'https://www.scribd.com/document/497671488/24-%E0%AE%B0%E0%AF%82%E0%AE%AA%E0%AE%BE%E0%AE%AF-%E0%AE%A4%E0%AF%80%E0%AE%B5%E0%AF%81-%E0%AE%9A%E0%AF%81%E0%AE%9C%E0%AE%BE%E0%AE%A4%E0%AE%BE', 'Free', 'https://m.media-amazon.com/images/I/51B5tdtYV6L.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'En Iniya Iyanthira', null, ARRAY['Sujatha'], ARRAY['Sci-Fi', 'Dystopian', 'Political Fiction'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/books/en-iniya-iyandhira-by-sujatha-rangarajan/', 'Free', 'https://m.media-amazon.com/images/I/81Q+GQjLw6L.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Kolai arangam', null, ARRAY['Sujatha'], ARRAY['Thriller', 'Mystery'], 'Tamil', '2025-08', '2025-08', 3, 'https://www.novelstamil.com/', 'Free', 'https://m.media-amazon.com/images/I/41WnA6cN9oL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Kolayuthir kaalam', null, ARRAY['Sujatha'], ARRAY['Thriller', 'Horror', 'Mystery'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Free', 'https://m.media-amazon.com/images/I/41KyxohZGqL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Maaya', null, ARRAY['Sujatha'], ARRAY['Science Fiction', 'Thriller'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Paid', 'https://m.media-amazon.com/images/I/41iZQRD8zGL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Malai mazhigai', null, ARRAY['Sujatha'], ARRAY['Drama', 'Fiction'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Paid', 'https://m.media-amazon.com/images/I/41OMnvAygwL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Meedum oru kutram', null, ARRAY['Sujatha'], ARRAY['Thriller', 'Drama'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Paid', 'https://m.media-amazon.com/images/I/41hgIm09IiL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Melum oru kuttram', null, ARRAY['Sujatha'], ARRAY['Thriller', 'Drama'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Paid', 'https://m.media-amazon.com/images/I/41rH7HWb+wL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Nil gavani thakku', null, ARRAY['Sujatha'], ARRAY['Thriller', 'Mystery'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Free', 'https://m.media-amazon.com/images/I/41MRkQqI34L.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Nirvana nagaram', null, ARRAY['Sujatha'], ARRAY['Thriller', 'Crime'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Paid', 'https://m.media-amazon.com/images/I/51hE31i+TkL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Nylon kayiru', null, ARRAY['Sujatha'], ARRAY['Thriller', 'Crime'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Free', 'https://m.media-amazon.com/images/I/41Z3UkYvWpL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Oonjal', null, ARRAY['Sujatha'], ARRAY['Drama'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Paid', 'https://m.media-amazon.com/images/I/41RNOdZyWFL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Sorga theevu', null, ARRAY['Sujatha'], ARRAY['Thriller', 'Sci-Fi'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Free', 'https://m.media-amazon.com/images/I/41EwA6PHkNL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Thappithal thappilai', null, ARRAY['Sujatha'], ARRAY['Thriller', 'Drama'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Paid', 'https://m.media-amazon.com/images/I/41DGq3XNMgL.jpg', null),

-- Sandilyan Books (Historical Fiction)
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Alai Arasi', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction', 'Romance'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/books/alai-arasi-by-sandilyan/', 'Free', 'https://m.media-amazon.com/images/I/71ut6fZVJVL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Chandra Mathi', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction', 'Adventure'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/books/chandramathi-by-sandilyan/', 'Free', 'https://m.media-amazon.com/images/I/71J8rXosqvL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Cheran Selvi', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction', 'Romance'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/books/cheran-selvi-by-sandilyan/', 'Free', 'https://m.media-amazon.com/images/I/71ycBz+f6-L.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Jala Deepam', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction', 'Adventure'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/books/jaladeepam-by-sandilyan/', 'Free', 'https://m.media-amazon.com/images/I/71F1xKZqjVL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Jala Mohini', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction', 'Romance'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/books/jala-mohini-by-sandilyan/', 'Free', 'https://m.media-amazon.com/images/I/71j9a8zF9fL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Kadal Pura', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Free', 'https://m.media-amazon.com/images/I/41nO2iMqqnL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Kadal Rani', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction'], 'Tamil', '2025-08', '2025-08', 3, 'https://www.scribd.com/', 'Free', 'https://m.media-amazon.com/images/I/41NVALDdTdL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Kanni Maadam', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction'], 'Tamil', '2025-08', '2025-08', 3, 'https://www.scribd.com/', 'Free', 'https://m.media-amazon.com/images/I/415PqjTMTCL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Malai arasi', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Free', 'https://m.media-amazon.com/images/I/41zU1jLtF8L.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Malai vaasal', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Paid', 'https://m.media-amazon.com/images/I/41V0b2KD8pL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Mannan Magal', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction'], 'Tamil', '2025-08', '2025-08', 3, 'https://www.novelstamil.com/', 'Paid', 'https://m.media-amazon.com/images/I/41gRXR1QWpL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Mohini vanam', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Paid', 'https://m.media-amazon.com/images/I/41NU5FdKpYL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Naga deepam', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Paid', 'https://m.media-amazon.com/images/I/41ecLBjDZmL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Neela valli', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Free', 'https://m.media-amazon.com/images/I/41CjumOvZmL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Raja muthirai', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Free', 'https://m.media-amazon.com/images/I/41pHSawv8zL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Raja perigai', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Paid', 'https://m.media-amazon.com/images/I/41wQ6XiT72L.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Raja thilagam', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Paid', 'https://m.media-amazon.com/images/I/41TQiD2qUEL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Raja yogam', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Paid', 'https://m.media-amazon.com/images/I/41OXh9QcPrL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Vijaya magadevi', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Free', 'https://m.media-amazon.com/images/I/41+MOChcrML.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Vilai Rani', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Paid', 'https://m.media-amazon.com/images/I/41QEK4gJ6L.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Yavana Rani', null, ARRAY['Sandilyan'], ARRAY['Historical Fiction'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Free', 'https://m.media-amazon.com/images/I/41CXfCJwIJL.jpg', null),

-- Indira Soundarrajan Books (Mystery/Thriller/Occult)
('bf7f746f-bba4-40bb-87a3-dab4574589a1', '5 Vazhi 3 Vaasal', null, ARRAY['Indira Soundarrajan'], ARRAY['Mystery', 'Supernatural', 'Thriller'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/books/ainthu-vazhi-moondru-vaasal-by-indra-soundar-rajan/', 'Free', 'https://m.media-amazon.com/images/I/51t3r4A5b8L.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Ange Naan Nalama?', null, ARRAY['Indira Soundarrajan'], ARRAY['Mystery', 'Drama'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/books/ange-naan-nalama-by-indra-soundar-rajan/', 'Paid', 'https://m.media-amazon.com/images/I/41JvF0cJ5uL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Asura Jadhagam', null, ARRAY['Indira Soundarrajan'], ARRAY['Thriller', 'Occult Fiction'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/books/asura-jathagam-by-indra-soundar-rajan/', 'Free', 'https://m.media-amazon.com/images/I/41ED4ltQzqL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Athirsta Kaatru', null, ARRAY['Indira Soundarrajan'], ARRAY['Thriller', 'Drama'], 'Tamil', '2025-08', '2025-08', 3, 'https://www.goodreads.com/book/show/35076719-adhirsta-kaatru', 'Paid', 'https://m.media-amazon.com/images/I/41Q1pZbZlXL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Athu Matum Ragasiyam', null, ARRAY['Indira Soundarrajan'], ARRAY['Mystery', 'Thriller'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/books/adhu-mattum-ragasiyam-by-indra-soundar-rajan/', 'Free', 'https://m.media-amazon.com/images/I/41IbLBhDwkL.jpg', null),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Baashana Lingam', null, ARRAY['Indira Soundarrajan'], ARRAY['Mystery', 'Folklore'], 'Tamil', '2025-08', '2025-08', 3, 'https://www.amazon.in/dp/B08Q1RWMM7', 'Paid', 'https://m.media-amazon.com/images/I/41eFfYUXFZL.jpg', null),

-- Classic Tamil Literature
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Ponniyin Selvan', null, ARRAY['Kalki'], ARRAY['Historical Fiction'], 'Tamil', '2025-08', '2025-08', 3, 'https://tamilbookspdf.com/', 'Free', 'https://m.media-amazon.com/images/I/41jcZrHvT8L.jpg', null);

-- Instructions for use
-- 1. First, get your user ID by running: SELECT id, email FROM auth.users;
-- 2. Replace 'bf7f746f-bba4-40bb-87a3-dab4574589a1' with your actual UUID in all the INSERT statements above
-- 3. Execute these INSERT statements in your Supabase SQL editor
-- 
-- Example replacement command (run this after getting your user ID):
-- UPDATE bookworm SET user_id = 'your-actual-uuid-here' WHERE user_id = 'bf7f746f-bba4-40bb-87a3-dab4574589a1'; 