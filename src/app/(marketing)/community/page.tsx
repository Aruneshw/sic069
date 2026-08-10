import Link from "next/link";
import { getAssetUrl } from "@/lib/trips";
import { Star, MessageCircle, Heart, ChevronDown } from "lucide-react";
import RunningLetters from "@/components/ui/RunningLetters";

// Mock stories based on page-12.png reference
const stories = [
  {
    id: 1,
    title: "Chasing the Northern Lights",
    category: "Mountain",
    author: "Elena Rodriguez",
    date: "Dec 15, 2024",
    rating: 5,
    excerpt: "I've dreamed of seeing the aurora borealis since I was a child. The guides at Zero Gravity didn't just take us to a viewpoint; they taught us the science, the folklore, and how to capture it perfectly on camera. The glass igloo experience was surreal.",
    helpfulCount: 124,
    imageUrl: getAssetUrl("/images/community/aurora.png"),
    height: "tall",
  },
  {
    id: 2,
    title: "A Culinary Journey Through the Valley",
    category: "Valley",
    author: "James & Sarah",
    date: "Nov 02, 2024",
    rating: 5,
    excerpt: "We booked the Vineyard Valley Retreat for our anniversary. The balance between active cycling and relaxed wine tasting was perfect. The highlight was definitely the private farm-to-table dinner.",
    helpfulCount: 89,
    imageUrl: getAssetUrl("/images/community/vineyard.png"),
    height: "short",
  },
  {
    id: 3,
    title: "Conquering the Alpine Pass",
    category: "Mountain",
    author: "Michael Chang",
    date: "Aug 20, 2024",
    rating: 4,
    excerpt: "The trek was physically demanding, exactly as advertised. Our guide, Tenzing, was phenomenal—always ensuring everyone was acclimatizing well. The views from the ridge on day 3 were worth every drop of sweat.",
    helpfulCount: 210,
    imageUrl: getAssetUrl("/images/community/alpine.png"),
    height: "medium",
  },
  {
    id: 4,
    title: "Hidden Coves and Campfires",
    category: "Coastal",
    author: "The Thompson Family",
    date: "Oct 10, 2024",
    rating: 5,
    excerpt: "Finding a trip that teenagers will actually enjoy is tough, but the Coastal Highway Escape delivered. Kayaking to the secret coves and the evening beach campfires were incredible bonding experiences.",
    helpfulCount: 156,
    imageUrl: getAssetUrl("/images/community/coast.png"),
    height: "medium",
  },
  {
    id: 5,
    title: "Zen in Bali",
    category: "Coastal",
    author: "Priya Patel",
    date: "Sep 12, 2024",
    rating: 5,
    excerpt: "A truly restorative week. The jungle villa was stunning, but the authentic interactions with the local healers made this trip stand out from other wellness retreats I've attended.",
    helpfulCount: 342,
    imageUrl: getAssetUrl("/images/community/bali.png"),
    height: "tall",
  },
];

export default function CommunityPage() {
  const categories = ["All Stories", "Coastal Road", "Vineyard Valley", "Alpine Heights"];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* ═══════════════════════════════════════
          HERO BANNER
          ═══════════════════════════════════════ */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden bg-navy-900">
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30" 
          style={{ backgroundImage: `url(${getAssetUrl('/images/community/alpine.png')})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
        
        <div className="container-main relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-6">
              <Star size={14} className="fill-white" /> Story of the Month
            </span>
            <RunningLetters
              as="h1"
              text='"The silence of the desert changed how I see the world."'
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            />
            <p className="text-xl text-teal-100 mb-8 font-medium">
              — David & Emma on the Desert Stargazer Odyssey
            </p>
            <button className="btn-cta text-base py-4 shadow-glow-cta">
              Read Full Story
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTENT & FILTERS
          ═══════════════════════════════════════ */}
      <section className="container-main relative z-20 -mt-12">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-12 flex items-center gap-2 overflow-x-auto hide-scrollbar border border-slate-100">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                i === 0
                  ? "bg-navy-900 text-white shadow-md"
                  : "bg-transparent text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-navy-900 mb-2">Traveller Chronicles</h2>
            <p className="text-slate-500">Real stories from our global community of explorers.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors">
            Sort by: Most Helpful <ChevronDown size={16} />
          </button>
        </div>

        {/* Masonry-style Grid (CSS Columns) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {stories.map((story) => (
            <div 
              key={story.id} 
              className="break-inside-avoid relative overflow-hidden rounded-[2.5rem] border-[6px] border-white bg-slate-900 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer"
              style={{ 
                aspectRatio: story.height === 'tall' ? '3/4.5' : story.height === 'short' ? '1/1.1' : '3/4'
              }}
            >
              
              {/* Full Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={story.imageUrl} 
                  alt={story.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Top Right Heart */}
              <div className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-colors z-20 shadow-lg">
                <Heart size={20} />
              </div>

              {/* Top Left Badge (Optional, replaces top-right if needed, but let's keep it clean) */}
              <div className="absolute top-5 left-5 z-20">
                <span className="px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                  {story.category}
                </span>
              </div>

              {/* Bottom Gradient Overlay & Content */}
              <div className="absolute inset-x-0 bottom-0 pt-48 pb-6 px-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-10 flex flex-col justify-end h-3/5">
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1.5 leading-tight group-hover:text-teal-300 transition-colors drop-shadow-md">
                  {story.title}
                </h3>
                
                <p className="text-slate-300 text-sm mb-5 font-medium">
                  {story.author} • {story.date}
                </p>

                <div className="flex items-center gap-5 text-white text-sm font-semibold mb-6">
                  <div className="flex items-center gap-1.5">
                     <Star size={16} className="fill-white" /> {story.rating} Stars
                  </div>
                  <div className="flex items-center gap-1.5">
                     <Heart size={16} className="fill-transparent" /> {story.helpfulCount} Helpful
                  </div>
                </div>

                <button className="w-full bg-white text-navy-900 font-bold rounded-full py-4 hover:bg-teal-50 transition-colors shadow-lg active:scale-95 duration-200">
                  Read Full Story
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-16 flex justify-center">
          <button className="btn-secondary px-8 py-3 bg-white">
            Load More Stories
          </button>
        </div>
      </section>
    </div>
  );
}
