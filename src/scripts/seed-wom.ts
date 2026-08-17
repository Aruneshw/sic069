const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const WOM_INSIGHTS_DB = [
  {
    locationName: "Kodaikanal",
    type: "BEST_TIME", title: "Go before 8 AM for mist-free views",
    content: "The famous viewpoints are completely fogged over between 8:30-10:30 AM most mornings. Either go at dawn or wait until late afternoon when the mist lifts.",
    confidenceScore: 94, source: "VERIFIED_LOCAL",
  },
  {
    locationName: "Kodaikanal",
    type: "TOURIST_MISTAKE", title: "Don't try all 6 viewpoints in one day",
    content: "Many first-time visitors try to cover all viewpoints in one afternoon. Pick 2 viewpoints + 1 local experience instead. You'll enjoy it much more.",
    confidenceScore: 89, source: "TRAVELER_EXPERIENCE",
  },
  {
    locationName: "Kodaikanal",
    type: "COST_REALITY", title: "Budget ₹800-1200 extra beyond package",
    content: "Entry fees, local transport between viewpoints, and snacks add up. Carry ₹800-1200 extra cash. Most small shops don't accept UPI.",
    confidenceScore: 91, source: "TOUR_OPERATOR",
  },
  {
    locationName: "Kodaikanal",
    type: "LOCAL_FOOD", title: "Skip Coaker's Walk restaurants",
    content: "The restaurants on Coaker's Walk are overpriced and mediocre. Walk 10 minutes to PT Road for authentic local meals at half the price.",
    confidenceScore: 92, source: "VERIFIED_LOCAL",
  },
  {
    locationName: "Wayanad",
    type: "BEST_TIME", title: "Edakkal Caves: Start at 8:30 AM sharp",
    content: "The 300-step climb gets brutally hot after 10 AM. Start at 8:30 AM opening time. You'll finish the climb in cool shade and avoid the tourist bus crowds.",
    confidenceScore: 95, source: "OFFICIAL_SOURCE",
  },
  {
    locationName: "Wayanad",
    type: "HIDDEN_GEM", title: "Phantom Rock at golden hour",
    content: "Most tourists miss Phantom Rock entirely. It's a 15-minute detour off the main road. Visit at 4:30 PM for spectacular golden-hour lighting.",
    confidenceScore: 86, source: "TRAVELER_EXPERIENCE",
  },
  {
    locationName: "Ooty",
    type: "CROWD", title: "Botanical Garden: Avoid weekends entirely",
    content: "Weekend crowds at the Botanical Garden make it nearly impossible to enjoy. Weekday mornings are 70% quieter. If you must go on weekends, arrive at 7 AM.",
    confidenceScore: 93, source: "COMMUNITY_OBSERVATION",
  },
  {
    locationName: "Ooty",
    type: "BETTER_ALTERNATIVE", title: "Skip Rose Garden → Go to Tea Museum",
    content: "The Rose Garden is underwhelming for the entry price. The Tea Museum is cheaper, less crowded, and includes a free tasting. Much better use of 2 hours.",
    confidenceScore: 88, source: "TRAVELER_EXPERIENCE",
  },
  {
    locationName: "Varkala",
    type: "SAFETY_NOTE", title: "Strong undercurrents south of cliff",
    content: "The beaches south of the main cliff have deceptively strong undercurrents. Swim only in the flagged zones near the lifeguard station. Multiple incidents reported annually.",
    confidenceScore: 97, source: "OFFICIAL_SOURCE",
  },
  {
    locationName: "Varkala",
    type: "LOCAL_EXPERIENCE", title: "Papanasam temple ritual at sunrise",
    content: "Join the morning ritual bath at Papanasam Beach temple at 6 AM. It's a deeply authentic cultural experience that most tourists miss entirely.",
    confidenceScore: 85, source: "VERIFIED_LOCAL",
  },
  {
    locationName: "Munnar",
    type: "WEATHER_CONTEXT", title: "Fog makes driving dangerous after 4 PM",
    content: "Munnar's mountain roads get extremely foggy after 4 PM. Plan your return drives to finish before 3:30 PM. Visibility drops to under 10 meters on hairpin bends.",
    confidenceScore: 96, source: "TOUR_OPERATOR",
  },
  {
    locationName: "Munnar",
    type: "VALUE_FOR_MONEY", title: "Tea plantation visit is genuinely worth it",
    content: "Unlike many tourist traps, the Kolukkumalai tea estate visit (₹300) is genuinely worth every rupee. The jeep ride, sunrise view, and factory tour are authentic.",
    confidenceScore: 94, source: "TRAVELER_EXPERIENCE",
  }
];

async function seed() {
  console.log("Seeding WoM insights into Supabase...");
  for (const insight of WOM_INSIGHTS_DB) {
    const res = await fetch(`${supabaseUrl}/rest/v1/LocalInsight`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(insight)
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error inserting ${insight.title}:`, errorText);
    } else {
      console.log(`Inserted: ${insight.title}`);
    }
  }
  console.log("Done seeding.");
}

seed();
