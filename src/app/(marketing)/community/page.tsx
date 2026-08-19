import Link from "next/link";
import { getAssetUrl } from "@/lib/trips";
import { Star, MessageCircle, Heart, Sparkles, Compass } from "lucide-react";
import RunningLetters from "@/components/ui/RunningLetters";
import { BentoCard, BentoGrid } from "@/components/ui/BentoGrid";

const stories = [
  {
    id: 1,
    title: "Chasing the High Altitude Ridge",
    category: "Mountain",
    author: "Elena Rodriguez",
    date: "Dec 15, 2024",
    rating: 5,
    excerpt: "I've dreamed of trekking the ridge since I was young. The guides at Zero Gravity didn't just take us to a viewpoint; they taught us the local mountain lore and how to read the clouds.",
    helpfulCount: 124,
    imageUrl: getAssetUrl("/images/places/ooty.png"),
    variant: "lavender" as const,
  },
  {
    id: 2,
    title: "A Culinary Journey Through the Valley",
    category: "Valley",
    author: "James & Sarah",
    date: "Nov 02, 2024",
    rating: 5,
    excerpt: "We booked the Spice Valley Retreat for our anniversary. The balance between active cycling and relaxed homestay dining was flawless.",
    helpfulCount: 89,
    imageUrl: getAssetUrl("/images/places/wayanad.png"),
    variant: "champagne" as const,
  },
  {
    id: 3,
    title: "Conquering the Alpine Pass",
    category: "Mountain",
    author: "Michael Chang",
    date: "Aug 20, 2024",
    rating: 5,
    excerpt: "The trek was physically demanding, exactly as advertised. Our native guide was phenomenal, ensuring everyone acclimatized smoothly.",
    helpfulCount: 210,
    imageUrl: getAssetUrl("/images/places/guna_cave.png"),
    variant: "blush" as const,
  },
  {
    id: 4,
    title: "Hidden Coves and Coastal Campfires",
    category: "Coastal",
    author: "The Thompson Family",
    date: "Oct 10, 2024",
    rating: 5,
    excerpt: "Kayaking to secret coves and evening campfires on secluded beaches were unforgettable memories for the whole family.",
    helpfulCount: 156,
    imageUrl: getAssetUrl("/images/places/alapuzha.png"),
    variant: "sage" as const,
  },
  {
    id: 5,
    title: "Temple Sanctums & Heritage Walks",
    category: "Urban",
    author: "Priya Patel",
    date: "Sep 12, 2024",
    rating: 5,
    excerpt: "A restorative cultural immersion. The historical architecture and interactions with local sculptors made this trip unforgettable.",
    helpfulCount: 342,
    imageUrl: getAssetUrl("/images/places/guruvayur.png"),
    variant: "sky" as const,
  },
];

export default function CommunityPage() {
  return (
    <div className="bg-transparent min-h-screen pb-24 text-white">
      {/* Hero */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 text-center px-4">
        <div className="container-main max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(12,22,38,0.85)] border border-[rgba(200,165,92,0.20)] text-xs font-black uppercase tracking-widest text-[#C8A55C] mb-4">
            <Sparkles size={14} className="text-[#C8A55C]" /> Traveler Chronicles
          </span>

          <RunningLetters
            as="h1"
            text="Voices from the Trail"
            className="text-4xl md:text-6xl font-extrabold text-white mb-3 leading-tight"
          />

          <p className="font-script text-3xl text-[#C8A55C] mb-4">
            Unfiltered journals from real expeditions
          </p>

          <p className="text-slate-200 text-sm md:text-base max-w-xl mx-auto font-medium">
            Read firsthand accounts, gear recommendations, and honest advice written by fellow wanderers.
          </p>
        </div>
      </section>

      {/* Givingli Bento Stories Grid */}
      <section className="container-main max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <BentoCard
              key={story.id}
              variant={story.variant}
              headerBadge={story.category}
              title={story.title}
              description={story.excerpt}
            >
              <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-black text-white">{story.author}</div>
                  <div className="text-[10px] text-slate-300">{story.date}</div>
                </div>

                <div className="flex items-center gap-1">
                  <Star size={13} className="fill-[#F7B538] text-[#05070B]" />
                  <span className="text-xs font-black text-white">{story.rating}.0</span>
                </div>
              </div>
            </BentoCard>
          ))}
        </div>
      </section>
    </div>
  );
}
