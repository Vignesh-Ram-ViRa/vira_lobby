-- Wanderlog Test Data
-- Insert test travel experiences for development

-- Note: Replace 'bf7f746f-bba4-40bb-87a3-dab4574589a1' with actual user ID when executing

INSERT INTO wanderlog (user_id, city, country, area, attractions, highlight, date, star_rating, photos_link, sample_images, cover_image_url, comment) VALUES

-- Shimla, Himachal Pradesh
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Shimla', 'India', 'Himachal Pradesh', 
 ARRAY['Mountains', 'Colonial Architecture', 'Mall Road', 'Snow', 'Hill Station'], 
 'Beautiful hill station with colonial charm and snow-capped mountains perfect for family vacation',
 '03/24', 4, 
 'https://photos.google.com/shimla-trip-2024',
 ARRAY['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800'],
 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
 'Amazing trip with family. The weather was perfect and the views were breathtaking. Mall Road was bustling with activity and the colonial architecture took us back in time.'),

-- Spiti Valley, Himachal Pradesh
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Spiti', 'India', 'Himachal Pradesh', 
 ARRAY['Desert Mountains', 'Monasteries', 'Adventure', 'Photography', 'High Altitude'], 
 'Cold desert landscape with ancient monasteries and stunning vistas that changed my perspective on life',
 '05/24', 5, 
 'https://photos.google.com/spiti-adventure-2024',
 ARRAY['https://images.unsplash.com/photo-1534567110586-1d7e7dcb5d9d?w=800', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'https://images.unsplash.com/photo-1597149471671-3c875d30d8c8?w=800', 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800'],
 'https://images.unsplash.com/photo-1534567110586-1d7e7dcb5d9d?w=800',
 'Life-changing experience in the high-altitude desert. The monasteries were incredibly peaceful and the landscape was otherworldly. Perfect for soul searching.'),

-- Mussoorie, Uttarakhand
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Mussoorie', 'India', 'Uttarakhand', 
 ARRAY['Hill Station', 'Waterfalls', 'Cable Car', 'Nature Walks', 'Queen of Hills'], 
 'Queen of Hills offering spectacular views of the Doon Valley and Himalayan ranges',
 '07/24', 4, 
 'https://photos.google.com/mussoorie-getaway',
 ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800'],
 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
 'The cable car ride to Gun Hill was thrilling and the view from there was absolutely stunning. Perfect weather for long walks.'),

-- Goa
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Goa', 'India', 'Coastal Region', 
 ARRAY['Beaches', 'Portuguese Architecture', 'Nightlife', 'Seafood', 'Water Sports'], 
 'Tropical paradise with pristine beaches, vibrant culture, and the best seafood on the coast',
 '12/23', 4, 
 'https://photos.google.com/goa-beaches-2023',
 ARRAY['https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', 'https://images.unsplash.com/photo-1601894489553-cb5e91b0fc24?w=800', 'https://images.unsplash.com/photo-1570197526040-cf9983c6ba3d?w=800'],
 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
 'Perfect beach vacation with great food and amazing sunsets. The Portuguese architecture in Old Goa was fascinating and the beaches were pristine.'),

-- Mulki, Karnataka
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Mulki', 'India', 'Karnataka', 
 ARRAY['River', 'Temples', 'Coastal Town', 'Local Culture', 'Peaceful'], 
 'Serene coastal town where the river meets the sea, perfect for peaceful contemplation',
 '02/24', 4, 
 'https://photos.google.com/mulki-riverside',
 ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'],
 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
 'Hidden gem on the Karnataka coast. The confluence of river and sea was mesmerizing. Local temples added spiritual depth to the journey.'),

-- Coorg, Karnataka
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Coorg', 'India', 'Karnataka', 
 ARRAY['Coffee Plantations', 'Waterfalls', 'Trekking', 'Wildlife', 'Scotland of India'], 
 'Scotland of India with lush coffee plantations, misty hills, and cascading waterfalls',
 '09/24', 5, 
 'https://photos.google.com/coorg-coffee-estates',
 ARRAY['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800'],
 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
 'The coffee plantation tour was enlightening and the aroma of fresh coffee beans was intoxicating. Abbey Falls was a spectacular sight.'),

-- Trivandrum (Thiruvananthapuram), Kerala
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Trivandrum', 'India', 'Kerala', 
 ARRAY['Temples', 'Museums', 'Beaches', 'Cultural Heritage', 'Backwaters'], 
 'Capital city rich in cultural heritage with magnificent temples and pristine beaches nearby',
 '01/24', 4, 
 'https://photos.google.com/trivandrum-heritage',
 ARRAY['https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'],
 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
 'Padmanabhaswamy Temple was awe-inspiring with its intricate architecture. The nearby beaches provided perfect relaxation after temple visits.'),

-- Kanyakumari, Tamil Nadu
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Kanyakumari', 'India', 'Tamil Nadu', 
 ARRAY['Sunrise', 'Sunset', 'Three Seas', 'Vivekananda Rock', 'Southernmost Tip'], 
 'Land where three seas meet offering breathtaking sunrise and sunset views from India southernmost tip',
 '11/23', 5, 
 'https://photos.google.com/kanyakumari-three-seas',
 ARRAY['https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800', 'https://images.unsplash.com/photo-1570197526040-cf9983c6ba3d?w=800', 'https://images.unsplash.com/photo-1601894489553-cb5e91b0fc24?w=800'],
 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
 'Witnessing both sunrise and sunset from the same spot was magical. Vivekananda Rock Memorial was spiritually uplifting and the view was unparalleled.'),

-- Yercaud, Tamil Nadu
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Yercaud', 'India', 'Tamil Nadu', 
 ARRAY['Hill Station', 'Coffee Plantations', 'Lake', 'Orange Groves', 'Poor Man Ooty'], 
 'Poor Man Ooty with emerald lake, coffee plantations, and orange groves in the Shevaroy Hills',
 '04/24', 4, 
 'https://photos.google.com/yercaud-hills',
 ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800'],
 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
 'The boat ride in Yercaud Lake was peaceful and the coffee plantations tour was educational. Much less crowded than other hill stations.'),

-- Kodaikanal, Tamil Nadu
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Kodaikanal', 'India', 'Tamil Nadu', 
 ARRAY['Hill Station', 'Lake', 'View Points', 'Pine Forests', 'Princess of Hill Stations'], 
 'Princess of Hill Stations with star-shaped lake, misty hills, and enchanting pine forests',
 '06/24', 4, 
 'https://photos.google.com/kodaikanal-princess-hills',
 ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800'],
 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
 'Kodai Lake was pristine and the walk around it was refreshing. Coaker Walk provided spectacular valley views and the pine forests were enchanting.'),

-- Ooty, Tamil Nadu
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Ooty', 'India', 'Tamil Nadu', 
 ARRAY['Tea Gardens', 'Toy Train', 'Lakes', 'Cool Climate', 'Queen of Hill Stations'], 
 'Queen of Hill Stations with lush tea plantations, heritage toy train, and misty mountains',
 '08/24', 4, 
 'https://photos.google.com/ooty-toy-train',
 ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800'],
 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
 'The toy train ride through the Nilgiri mountains was nostalgic and scenic. Tea garden visits were educational and the fresh mountain air was invigorating.');

-- Additional sample data for testing filters and search
-- You can uncomment and modify these as needed:

/*
INSERT INTO wanderlog (user_id, city, country, area, attractions, highlight, date, star_rating, photos_link, sample_images, cover_image_url, comment) VALUES

-- Additional Himachal Pradesh destinations
('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Manali', 'India', 'Himachal Pradesh', 
 ARRAY['Snow Sports', 'Adventure', 'Solang Valley', 'Rohtang Pass'], 
 'Adventure capital with snow-capped peaks and thrilling activities',
 '02/25', 5, 
 'https://photos.google.com/manali-adventure',
 ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
 'Perfect for adventure enthusiasts with skiing, paragliding, and mountain biking options.'),

('bf7f746f-bba4-40bb-87a3-dab4574589a1', 'Dharamshala', 'India', 'Himachal Pradesh', 
 ARRAY['Tibetan Culture', 'Monasteries', 'Dalai Lama', 'Cricket Stadium'], 
 'Little Tibet with rich Buddhist culture and stunning mountain views',
 '04/25', 4, 
 'https://photos.google.com/dharamshala-tibet',
 ARRAY['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800'],
 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
 'The Tibetan influence was fascinating and the monasteries provided spiritual solace.');
*/ 