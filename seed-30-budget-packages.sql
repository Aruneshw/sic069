-- Run this in your Supabase SQL Editor to populate 32 budget packages under 10k!
-- Uses locally hosted package images for guaranteed fast loading.

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
    pkg_images TEXT[] := ARRAY[
        '/images/packages/hidden-valley-trek.jpeg',
        '/images/packages/coastal-sunset-retreat.jpeg',
        '/images/packages/forest-canopy-walk.jpeg',
        '/images/packages/river-rafting-adventure.jpeg',
        '/images/packages/desert-oasis-camp.jpeg',
        '/images/packages/mountain-peak-climb.jpeg',
        '/images/packages/historical-fort-tour.jpeg',
        '/images/packages/tea-garden-retreat.jpeg',
        '/images/packages/backwater-kayaking.jpeg',
        '/images/packages/jungle-safari-express.jpeg',
        '/images/packages/sunrise-hiking-trail.jpeg',
        '/images/packages/starry-night-camping.jpeg',
        '/images/packages/tropical-island-escape.jpeg',
        '/images/packages/waterfall-rappelling.jpeg',
        '/images/packages/snowy-pine-cabin.jpeg',
        '/images/packages/village-heritage-walk.jpeg',
        '/images/packages/canyon-exploration.jpeg',
        '/images/packages/lake-view-glamping.jpeg',
        '/images/packages/wildlife-spotting-tour.jpeg',
        '/images/packages/volcanic-crater-hike.jpeg',
        '/images/packages/ocean-scuba-dive.jpeg',
        '/images/packages/glacier-ice-climbing.jpeg',
        '/images/packages/desert-dune-bashing.jpeg',
        '/images/packages/coastal-surfing-camp.jpeg',
        '/images/packages/high-altitude-pass-trek.jpeg',
        '/images/packages/monastery-peace-retreat.jpeg',
        '/images/packages/spice-plantation-walk.jpeg',
        '/images/packages/cave-exploration.jpeg',
        '/images/packages/tribal-culture-tour.jpeg',
        '/images/packages/bicycle-countryside-ride.jpeg',
        '/images/packages/river-island-camping.jpeg',
        '/images/packages/rainforest-canopy-walk.jpeg'
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
            pkg_images[i], -- matched local image per package
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
            "videoUrl" = EXCLUDED."videoUrl",
            "bundlePrice" = EXCLUDED."bundlePrice";
    END LOOP;
END $$;
