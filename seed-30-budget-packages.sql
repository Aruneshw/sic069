-- Run this in your Supabase SQL Editor to populate 30+ budget packages under 10k!
-- Uses vibrant stock images from Unsplash via random nature keywords.

DO $$
DECLARE
    i INT;
    names TEXT[] := ARRAY[
        'Hidden Valley Trek', 'Coastal Sunset Retreat', 'Forest Canopy Walk', 'River Rafting Adventure', 
        'Desert Oasis Camp', 'Mountain Peak Climb', 'Historical Fort Tour', 'Tea Garden Retreat',
        'Backwater Kayaking', 'Jungle Safari Express', 'Sunrise Hiking Trail', 'Starry Night Camping',
        'Tropical Island Escape', 'Waterfall Rappelling', 'Snowy Pine Cabin', 'Village Heritage Walk',
        'Canyon Exploration', 'Lake View Glamping', 'Wildlife Spotting Tour', 'Volcanic Crater Hike',
        'Ocean Scuba Dive', 'Glacier Ice Climbing', 'Desert Dune Bashing', 'Coastal Surfing Camp',
        'High Altitude Pass Trek', 'Monastery Peace Retreat', 'Spice Plantation Walk', 'Cave Exploration',
        'Tribal Culture Tour', 'Bicycle Countryside Ride', 'River Island Camping', 'Rainforest Canopy Walk'
    ];
    images TEXT[] := ARRAY[
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1444464666168-49b626f86641?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1465146344425-f00d5f3c8f07?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800&auto=format&fit=crop'
    ];
    badges TEXT[] := ARRAY['NATURE ESCAPE', 'ADVENTURE QUEST', 'BUDGET GETAWAY', 'CULTURAL JOURNEY', 'TROPICAL VIBES'];
BEGIN
    FOR i IN 1..32 LOOP
        INSERT INTO "Package" (
            "id", "name", "slug", "tagline", "description", "tierBadge", 
            "bundlePrice", "duration", "maxSeats", "filledSeats", 
            "imageUrl", "videoUrl", "status", "itinerary", "inclusions", "includedTripIds", 
            "createdAt", "updatedAt"
        ) VALUES (
            gen_random_uuid(),
            names[i],
            LOWER(REPLACE(names[i], ' ', '-')) || '-' || i,
            'An unforgettable budget adventure under 10k.',
            'Experience ' || names[i] || ' like never before. Designed specifically for budget travelers who do not want to compromise on colorful experiences and thrilling adventures. Join us for a highly curated trip!',
            badges[1 + (i % 5)],
            (FLOOR(RANDOM() * (115 - 45 + 1)) + 45)::INT, -- Random USD price 45-115 (approx 3700-9500 INR)
            (FLOOR(RANDOM() * 3) + 2)::INT || ' Days', -- Random duration 2-4 days
            (FLOOR(RANDOM() * 15) + 10)::INT, -- Max seats 10-25
            (FLOOR(RANDOM() * 10))::INT, -- Filled seats 0-9
            'https://image.pollinations.ai/prompt/' || REPLACE(names[i], ' ', '%20') || '%20beautiful%20travel%20photography', -- AI generated image based on name
            'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', -- same video for all
            'Published',
            '[{"day": 1, "title": "Arrival & Setup", "description": "Meet the team and get settled.", "location": "Basecamp"}, {"day": 2, "title": "The Main Event", "description": "Experience the vibrant adventure.", "location": "Exploration Zone"}]',
            '["Accommodation", "Local Guide", "Meals included", "Activities"]',
            '["trip-id-mock"]',
            now(),
            now()
        )
        ON CONFLICT ("slug") DO UPDATE SET 
            "imageUrl" = EXCLUDED."imageUrl",
            "videoUrl" = EXCLUDED."videoUrl";
    END LOOP;
END $$;
