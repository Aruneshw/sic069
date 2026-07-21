import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });




async function main() {
  console.log("🌍 Seeding Zero Gravity Tours database...");

  // Clear existing data
  await prisma.notification.deleteMany();
  await prisma.enquiry.deleteMany();
  await prisma.departure.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.package.deleteMany();
  await prisma.trip.deleteMany();

  // ═══════════════════════════════════
  // CANONICAL 8-TRIP ROSTER
  // ═══════════════════════════════════
  const trips = await Promise.all([
    prisma.trip.create({
      data: {
        name: "Alappuzha Backwaters",
        slug: "alappuzha-backwaters",
        tagline: "Experience the Venice of the East",
        description: "Cruise through the serene backwaters of Kerala in a traditional houseboat. Witness the lush green landscapes, rural village life, and enjoy authentic coastal cuisine prepared fresh on board.",
        category: "Coastal",
        price: 149,
        duration: "3 Days",
        maxSeats: 25,
        filledSeats: 23,
        departureDate: new Date("2024-10-24"),
        imageUrl: "/images/places/alapuzha.png",
        badge: "Bestseller",
        status: "Published",
        rating: 4.8,
        highlights: JSON.stringify([
          "Overnight houseboat stay",
          "Authentic Kerala seafood",
          "Village walks",
          "Sunset backwater cruise",
          "Ayurvedic massage option",
        ]),
        itinerary: JSON.stringify([
          { day: 1, title: "Arrival & Cruise", description: "Board houseboat at noon. Cruise through Vembanad Lake. Traditional Kerala lunch." },
          { day: 2, title: "Village Life", description: "Morning canoe ride through narrow canals. Visit local coir making units." },
          { day: 3, title: "Departure", description: "Morning cruise and breakfast before check-out." },
        ]),
        included: JSON.stringify([
          "Houseboat accommodation",
          "All meals on board",
          "Guided canoe tour",
          "Transfers from Kochi",
        ]),
      },
    }),

    prisma.trip.create({
      data: {
        name: "Ooty Hill Station",
        slug: "ooty-hill-station",
        tagline: "The Queen of Hill Stations",
        description: "Escape to the cool heights of the Nilgiri hills. Enjoy toy train rides, botanical gardens, and the breathtaking views from Doddabetta peak amidst vast tea estates.",
        category: "Mountain",
        price: 295,
        duration: "5 Days",
        maxSeats: 20,
        filledSeats: 14,
        departureDate: new Date("2024-08-12"),
        imageUrl: "/images/places/ooty.png",
        badge: "Premium",
        status: "Published",
        rating: 4.9,
        highlights: JSON.stringify([
          "Nilgiri Mountain Railway ride",
          "Botanical Gardens tour",
          "Tea estate visit and tasting",
          "Doddabetta Peak sunrise",
          "Ooty Lake boating",
        ]),
        itinerary: JSON.stringify([
          { day: 1, title: "Arrival", description: "Arrive via toy train. Check into heritage hotel." },
          { day: 2, title: "Gardens & Lakes", description: "Visit Botanical Garden, Rose Garden, and evening boating at Ooty Lake." },
          { day: 3, title: "Peaks & Tea", description: "Sunrise at Doddabetta. Afternoon tea factory tour." },
          { day: 4, title: "Pykara Excursion", description: "Day trip to Pykara waterfalls and shooting spot." },
          { day: 5, title: "Departure", description: "Morning shopping for homemade chocolates before departure." },
        ]),
        included: JSON.stringify([
          "4 nights heritage accommodation",
          "Toy train tickets",
          "All entry fees",
          "Guided tours",
          "Breakfast & Dinner",
        ]),
      },
    }),

    prisma.trip.create({
      data: {
        name: "Wayanad Nature Retreat",
        slug: "wayanad-nature-retreat",
        tagline: "Explore the untouched wilderness",
        description: "Immerse yourself in the dense forests and spice plantations of Wayanad. Visit ancient caves, spectacular waterfalls, and spot wild elephants in their natural habitat.",
        category: "Valley",
        price: 199,
        duration: "4 Days",
        maxSeats: 15,
        filledSeats: 6,
        departureDate: new Date("2024-11-02"),
        imageUrl: "/images/places/wayanad.png",
        badge: null,
        status: "Published",
        rating: 4.7,
        highlights: JSON.stringify([
          "Edakkal Caves exploration",
          "Soochipara Waterfalls trek",
          "Muthanga Wildlife Safari",
          "Spice plantation tour",
          "Treehouse stay option",
        ]),
        itinerary: JSON.stringify([
          { day: 1, title: "Arrival", description: "Check into jungle resort. Evening campfire." },
          { day: 2, title: "Caves & Falls", description: "Morning trek to Edakkal Caves. Afternoon at Soochipara Falls." },
          { day: 3, title: "Wildlife Safari", description: "Early morning jeep safari at Muthanga Wildlife Sanctuary. Afternoon spice plantation walk." },
          { day: 4, title: "Departure", description: "Leisurely breakfast and departure." },
        ]),
        included: JSON.stringify([
          "3 nights resort stay",
          "Safari jeep fees",
          "All meals",
          "Trekking guide",
        ]),
      },
    }),

    prisma.trip.create({
      data: {
        name: "Guna Caves Expedition",
        slug: "guna-caves-expedition",
        tagline: "Journey into the Devil's Kitchen",
        description: "Explore the mystical and deep rock formations of Guna Caves in Kodaikanal. Surrounded by dense Shola forests, this adventure offers thrilling treks and eerie natural beauty.",
        category: "Mountain",
        price: 450,
        duration: "6 Days",
        maxSeats: 12,
        filledSeats: 10,
        departureDate: new Date("2024-12-15"),
        imageUrl: "/images/places/guna_cave.png",
        badge: "New",
        status: "Published",
        rating: 4.9,
        highlights: JSON.stringify([
          "Guna Caves exploration",
          "Pillar Rocks viewpoint",
          "Coaker's Walk at sunset",
          "Pine Forest photography",
          "Kodai Lake cycling",
        ]),
        itinerary: JSON.stringify([
          { day: 1, title: "Kodaikanal Arrival", description: "Settle into the hill resort. Evening walk around Kodai Lake." },
          { day: 2, title: "The Caves", description: "Guided trek to Guna Caves (Devil's Kitchen) and Pillar Rocks." },
          { day: 3, title: "Forest Trails", description: "Pine Forest exploration and Dolphin's Nose trek." },
          { day: 4, title: "Lakes & Waterfalls", description: "Visit Bear Shola Falls and Berijam Lake." },
          { day: 5, title: "Local Culture", description: "Visit Kurinji Andavar Temple and local markets." },
          { day: 6, title: "Departure", description: "Morning cycling around the lake before departure." },
        ]),
        included: JSON.stringify([
          "5 nights accommodation",
          "Guided cave trekking",
          "Forest department permits",
          "Bicycle rental",
          "All meals",
        ]),
      },
    }),

    prisma.trip.create({
      data: {
        name: "Hogenakkal Falls Journey",
        slug: "hogenakkal-falls",
        tagline: "The Niagara of India",
        description: "Witness the raw power of the Kaveri River as it cascades through ancient carbonatite rocks. Experience thrilling coracle rides right to the base of the majestic waterfalls.",
        category: "Coastal",
        price: 380,
        duration: "3 Days",
        maxSeats: 16,
        filledSeats: 16,
        departureDate: new Date("2024-09-05"),
        imageUrl: "/images/places/hogennakal.png",
        badge: null,
        status: "Published",
        rating: 4.6,
        highlights: JSON.stringify([
          "Coracle boat ride",
          "Fresh river fish tasting",
          "Oil massage by the river",
          "Hanging bridge walk",
          "Riverbank camping",
        ]),
        itinerary: JSON.stringify([
          { day: 1, title: "Arrival", description: "Arrive at riverside camp. Evening sunset view from hanging bridge." },
          { day: 2, title: "The Falls", description: "Morning coracle ride to the main falls. Traditional oil massage and fresh fish lunch." },
          { day: 3, title: "Departure", description: "Morning nature walk along the Kaveri river banks before departure." },
        ]),
        included: JSON.stringify([
          "2 nights riverside camping",
          "Coracle ride fees",
          "All meals",
          "Local guide",
        ]),
      },
    }),

    prisma.trip.create({
      data: {
        name: "Isha Foundation Tour",
        slug: "isha-foundation",
        tagline: "Inner Engineering and Adiyogi",
        description: "A spiritual journey to the Isha Yoga Center in Coimbatore. Stand before the awe-inspiring 112-foot Adiyogi statue and experience the profound silence of the Dhyanalinga.",
        category: "Valley",
        price: 320,
        duration: "4 Days",
        maxSeats: 18,
        filledSeats: 11,
        departureDate: new Date("2024-11-18"),
        imageUrl: "/images/places/isha.png",
        badge: null,
        status: "Published",
        rating: 4.8,
        highlights: JSON.stringify([
          "Adiyogi statue visit",
          "Dhyanalinga meditation",
          "Suryakund bath",
          "Velliangiri Mountains view",
          "Ashram guided tour",
        ]),
        itinerary: JSON.stringify([
          { day: 1, title: "Arrival", description: "Check into ashram cottages. Evening Darshan." },
          { day: 2, title: "Consecrated Spaces", description: "Morning Suryakund bath. Dhyanalinga and Linga Bhairavi visits." },
          { day: 3, title: "Adiyogi & Yoga", description: "Yoga sessions and visit to the Adiyogi statue. Evening laser show." },
          { day: 4, title: "Departure", description: "Morning meditation and departure." },
        ]),
        included: JSON.stringify([
          "3 nights ashram accommodation",
          "Sattvic vegetarian meals",
          "Guided ashram tour",
          "Yoga program fees",
        ]),
      },
    }),

    prisma.trip.create({
      data: {
        name: "Guruvayur Temple Visit",
        slug: "guruvayur-temple",
        tagline: "The Dwarka of the South",
        description: "A cultural and spiritual pilgrimage to the historic Guruvayur Temple in Kerala. Experience the rich temple traditions, classical art forms, and the famous elephant sanctuary.",
        category: "Urban",
        price: 499,
        duration: "3 Days",
        maxSeats: 14,
        filledSeats: 8,
        departureDate: new Date("2024-09-24"),
        imageUrl: "/images/places/guruvayur.png",
        badge: "Premium",
        status: "Published",
        rating: 4.9,
        highlights: JSON.stringify([
          "Guruvayur Temple Darshan",
          "Punnathur Kotta elephant sanctuary",
          "Classical Krishnanattam performance",
          "Traditional Kerala feast (Sadya)",
          "Mural painting museum",
        ]),
        itinerary: JSON.stringify([
          { day: 1, title: "Arrival & Darshan", description: "Check into hotel. Evening temple visit and Darshan." },
          { day: 2, title: "Elephants & Arts", description: "Morning visit to elephant sanctuary. Evening classical dance performance." },
          { day: 3, title: "Departure", description: "Final morning prayers and departure." },
        ]),
        included: JSON.stringify([
          "2 nights premium accommodation",
          "Temple VIP Darshan arrangements",
          "Sanctuary entry fees",
          "All meals including Sadya",
        ]),
      },
    }),

    prisma.trip.create({
      data: {
        name: "Thiruchendur Pilgrimage",
        slug: "thiruchendur-pilgrimage",
        tagline: "Coastal Divinity",
        description: "Visit the magnificent Thiruchendur Murugan Temple, uniquely situated right on the shores of the Bay of Bengal. Blend spiritual devotion with serene beachside relaxation.",
        category: "Coastal",
        price: 550,
        duration: "4 Days",
        maxSeats: 20,
        filledSeats: 15,
        departureDate: new Date("2024-10-15"),
        imageUrl: "/images/places/thiruchendur.png",
        badge: "New",
        status: "Published",
        rating: 4.7,
        highlights: JSON.stringify([
          "Shore temple Darshan",
          "Holy sea bath",
          "Valli Cave visit",
          "Panchalamkurichi Fort trip",
          "Beachfront accommodation",
        ]),
        itinerary: JSON.stringify([
          { day: 1, title: "Arrival", description: "Arrive at Thiruchendur. Settle into beachfront hotel." },
          { day: 2, title: "Temple Rituals", description: "Morning holy bath in the sea. Full day temple rituals and Valli Cave visit." },
          { day: 3, title: "Historical Excursion", description: "Half-day trip to Kattabomman Memorial Fort at Panchalamkurichi." },
          { day: 4, title: "Departure", description: "Sunrise at the beach and departure." },
        ]),
        included: JSON.stringify([
          "3 nights beachfront hotel",
          "Temple guide assistance",
          "Excursion transport",
          "All meals",
        ]),
      },
    }),
  ]);

  console.log(`✅ Created ${trips.length} trips`);

  // ═══════════════════════════════════
  // PACKAGES (Bundles of Trips)
  // ═══════════════════════════════════
  const packages = await Promise.all([
    prisma.package.create({
      data: {
        name: "5-day Nilgiri Explorer",
        slug: "5-day-nilgiri-explorer",
        tagline: "The ultimate mountain retreat.",
        description: "Experience the cool heights of the Nilgiri hills combined with deep cave explorations.",
        tierBadge: "HIGH-ALTITUDE JOURNEYS",
        bundlePrice: 599,
        duration: "5 Days",
        maxSeats: 12,
        filledSeats: 10,
        imageUrl: "/images/places/ooty.png",
        itinerary: JSON.stringify([
          { day: "Day 1-2", title: "Ooty Hill Station", description: "Arrive via toy train. Check into heritage hotel." },
          { day: "Day 3", title: "Coonoor Tea Estate", description: "Afternoon tea factory tour." },
          { day: "Day 4-5", title: "Guna Caves Expedition", description: "Explore the mystical rock formations." }
        ]),
        inclusions: JSON.stringify([
          "Heritage Stay",
          "Toy Train",
          "Guided Cave Trek",
          "All Meals"
        ]),
        includedTripIds: JSON.stringify([
          trips.find(t => t.slug === "ooty-hill-station")?.id,
          trips.find(t => t.slug === "guna-caves-expedition")?.id
        ].filter(Boolean))
      }
    }),
    prisma.package.create({
      data: {
        name: "Southern Coastal & Temple Route",
        slug: "southern-coastal-temple-route",
        tagline: "A blend of serenity and spirituality.",
        description: "Start with a peaceful backwater cruise and end with a grand spiritual pilgrimage.",
        tierBadge: "CULTURE-LED ESCAPES",
        bundlePrice: 799,
        duration: "7 Days",
        maxSeats: 15,
        filledSeats: 8,
        imageUrl: "/images/places/alapuzha.png",
        itinerary: JSON.stringify([
          { day: "Day 1-3", title: "Alappuzha Backwaters", description: "Cruise through Vembanad Lake on a houseboat." },
          { day: "Day 4-5", title: "Guruvayur Temple", description: "Cultural pilgrimage and elephant sanctuary visit." },
          { day: "Day 6-7", title: "Thiruchendur", description: "Coastal divinity at the shore temple." }
        ]),
        inclusions: JSON.stringify([
          "Houseboat Stay",
          "Premium Hotels",
          "VIP Temple Darshan",
          "All Transfers"
        ]),
        includedTripIds: JSON.stringify([
          trips.find(t => t.slug === "alappuzha-backwaters")?.id,
          trips.find(t => t.slug === "guruvayur-temple")?.id,
          trips.find(t => t.slug === "thiruchendur-pilgrimage")?.id
        ].filter(Boolean))
      }
    })
  ]);
  console.log(`✅ Created ${packages.length} packages`);

  // ═══════════════════════════════════
  // DEPARTURES (for calendar view)
  // ═══════════════════════════════════
  const departures = [];
  for (const trip of trips) {
    // Create 3-5 departure dates per trip spread across Oct-Dec 2024
    const baseDates = [
      new Date("2024-10-05"),
      new Date("2024-10-12"),
      new Date("2024-10-19"),
      new Date("2024-10-26"),
      new Date("2024-11-02"),
      new Date("2024-11-09"),
      new Date("2024-11-16"),
      new Date("2024-11-23"),
      new Date("2024-12-01"),
      new Date("2024-12-08"),
      new Date("2024-12-15"),
    ];

    // Assign 3 random dates to each trip
    const selectedDates = baseDates
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    for (const date of selectedDates) {
      const seatsLeft = Math.floor(Math.random() * trip.maxSeats);
      let status = "Open";
      if (seatsLeft <= 2) status = "Almost Full";
      else if (seatsLeft <= Math.floor(trip.maxSeats * 0.3))
        status = "Filling Fast";

      departures.push(
        prisma.departure.create({
          data: {
            tripId: trip.id,
            date,
            time:
              ["07:30 AM", "08:00 AM", "09:00 AM", "10:00 AM"][
                Math.floor(Math.random() * 4)
              ],
            seatsLeft,
            status,
          },
        })
      );
    }
  }

  await Promise.all(departures);
  console.log(`✅ Created ${departures.length} departures`);

  // ═══════════════════════════════════
  // SAMPLE ENQUIRIES
  // ═══════════════════════════════════
  await prisma.enquiry.createMany({
    data: [
      {
        tripId: trips[1].id, // Alpine Lakes
        userName: "Alex Thompson",
        userEmail: "alex.t@gmail.com",
        status: "Pending",
        requestedOn: new Date("2024-05-14"),
        message: "Interested in the August departure for 2 people.",
      },
      {
        tripId: trips[4].id, // Bali Zen
        userName: "Alex Thompson",
        userEmail: "alex.t@gmail.com",
        status: "Confirmed",
        requestedOn: new Date("2024-04-22"),
        message: "Solo traveler, first-time retreat experience.",
      },
      {
        tripId: trips[3].id, // Arctic Aurora
        userName: "Alex Thompson",
        userEmail: "alex.t@gmail.com",
        status: "Waitlisted",
        requestedOn: new Date("2024-06-01"),
        message: "Would love the December slot for a group of 3.",
      },
    ],
  });
  console.log("✅ Created sample enquiries");

  // ═══════════════════════════════════
  // SAMPLE NOTIFICATIONS
  // ═══════════════════════════════════
  await prisma.notification.createMany({
    data: [
      {
        type: "SEAT_ALERT",
        title: "Seat Alert",
        message:
          "Only 2 seats left on Coastal Highway Escape. Secure your spot before it's gone!",
        isRead: false,
        createdAt: new Date(Date.now() - 2 * 60 * 1000), // 2 min ago
      },
      {
        type: "PRICE_DROP",
        title: "Price Drop",
        message:
          "Flash sale! The Alpine Summit tour price just dropped by 15% for June bookings.",
        isRead: false,
        createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1h ago
      },
      {
        type: "NEW_TRIP",
        title: "New Trip",
        message:
          "Just added: Midnight Sun Expedition. Explore the Arctic Circle in luxury.",
        isRead: false,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3h ago
      },
      {
        type: "SYSTEM_UPDATE",
        title: "System Update",
        message:
          "Your profile was successfully updated. Check out your new personalized recommendations.",
        isRead: true,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      },
    ],
  });
  console.log("✅ Created sample notifications");

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
