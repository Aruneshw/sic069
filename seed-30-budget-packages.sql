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
    imageUrls TEXT[] := ARRAY[
        '/images/packages/package_1.jpeg', '/images/packages/package_2.jpeg', '/images/packages/package_3.jpeg', '/images/packages/package_4.jpeg',
        '/images/packages/package_5.jpeg', '/images/packages/package_6.jpeg', '/images/packages/package_7.jpeg', '/images/packages/package_8.jpeg',
        '/images/packages/package_9.jpeg', '/images/packages/package_10.jpeg', '/images/packages/package_11.jpeg', '/images/packages/package_12.jpeg',
        '/images/packages/package_13.jpeg', '/images/packages/package_14.jpeg', '/images/packages/package_15.jpeg', '/images/packages/package_16.jpeg',
        '/images/packages/package_17.jpeg', '/images/packages/package_18.jpeg', '/images/packages/package_19.jpeg', '/images/packages/package_20.jpeg',
        '/images/packages/package_21.jpeg', '/images/packages/package_22.jpeg', '/images/packages/package_23.jpeg', '/images/packages/package_24.jpg',
        '/images/packages/package_25.jpg', '/images/packages/package_26.jpg', '/images/packages/package_27.jpg', '/images/packages/package_28.jpg',
        '/images/packages/package_29.jpg', '/images/packages/package_30.jpg', '/images/packages/package_31.jpg', '/images/packages/package_32.jpg'
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
            imageUrls[i], -- Local package images
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
