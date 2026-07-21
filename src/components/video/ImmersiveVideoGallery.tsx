"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, Volume2, VolumeX, Maximize2, Compass, Eye } from "lucide-react";
import { getAssetUrl } from "@/lib/trips";

interface VideoTour {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  videoUrl: string;
  previewUrl: string;
  posterUrl: string;
}

const tours: VideoTour[] = [
  {
    id: "coastal",
    title: "Alappuzha Backwaters & Coastline",
    category: "Coastal",
    description: "Cruise through pristine palm-fringed backwaters on a luxury houseboat.",
    duration: "3 Days",
    videoUrl: getAssetUrl("/videos/hovering_zoom_vid.mp4"),
    previewUrl: getAssetUrl("/videos/hovering_zoom_vid.mp4"),
    posterUrl: getAssetUrl("/images/places/alapuzha.png"),
  },
  {
    id: "mountain",
    title: "Nilgiri Mountain Railway & Peaks",
    category: "Mountain",
    description: "Ascend into mist-covered tea estates and high-altitude mountain trails.",
    duration: "5 Days",
    videoUrl: getAssetUrl("/videos/mountain.mp4"),
    previewUrl: getAssetUrl("/videos/mountain.mp4"),
    posterUrl: getAssetUrl("/images/places/ooty.png"),
  },
  {
    id: "valley",
    title: "Wayanad Cascades & Trails",
    category: "Valley",
    description: "Trek through dense spice forests to hidden cascading waterfalls.",
    duration: "4 Days",
    videoUrl: getAssetUrl("/videos/hovering_zoom_vid.mp4"),
    previewUrl: getAssetUrl("/videos/hovering_zoom_vid.mp4"),
    posterUrl: getAssetUrl("/images/places/wayanad.png"),
  },
  {
    id: "urban",
    title: "South Indian Temple Sanctums",
    category: "Urban",
    description: "Immerse yourself in sacred rituals, spiritual geometry, and ancient architecture.",
    duration: "4 Days",
    videoUrl: getAssetUrl("/videos/mountain.mp4"),
    previewUrl: getAssetUrl("/videos/mountain.mp4"),
    posterUrl: getAssetUrl("/images/places/guruvayur.png"),
  },
];

export default function ImmersiveVideoGallery() {
  const [activeVideo, setActiveVideo] = useState<VideoTour | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const lightboxVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleHoverStart = (id: string) => {
    setHoveredId(id);
    const video = videoRefs.current[id];
    if (video) {
      video.play().catch(() => {});
    }
  };

  const handleHoverEnd = (id: string) => {
    setHoveredId(null);
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (lightboxVideoRef.current) {
      lightboxVideoRef.current.muted = !isMuted;
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (lightboxVideoRef.current) {
      if (isPlaying) {
        lightboxVideoRef.current.pause();
      } else {
        lightboxVideoRef.current.play().catch(() => {});
      }
    }
  };

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="py-20 bg-slate-950 text-white overflow-hidden relative">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full mix-blend-screen filter blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 pointer-events-none" />

      <div className="container-main relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold tracking-wider text-blue-400 uppercase mb-4">
            <Compass size={14} className="animate-spin-slow" /> Immersive Tour Previews
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Virtual Expeditions
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Experience the sights, sounds, and rhythms of our hand-picked journeys before you book. Hover to preview each region in high definition.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tours.map((tour, index) => {
            const isHovered = hoveredId === tour.id;
            return (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => handleHoverStart(tour.id)}
                onMouseLeave={() => handleHoverEnd(tour.id)}
                onClick={() => {
                  setActiveVideo(tour);
                  setIsPlaying(true);
                  setIsMuted(false);
                }}
                className="group relative h-[320px] rounded-3xl overflow-hidden border border-white/10 bg-slate-900 cursor-pointer shadow-2xl hover:border-blue-500/30 transition-all duration-500"
              >
                {/* Video Container */}
                <div className="absolute inset-0 w-full h-full z-0 bg-slate-950">
                  {/* Poster placeholder image overlay if video not loaded */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
                  
                  <video
                    ref={(el) => {
                      videoRefs.current[tour.id] = el;
                    }}
                    src={tour.previewUrl}
                    poster={tour.posterUrl}
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Badges / Header overlay */}
                <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs font-bold tracking-wider text-teal-400 uppercase">
                    {tour.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/90 text-xs font-bold text-white shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                    4K LIVE
                  </span>
                </div>

                {/* Play Button Center Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                  <motion.div
                    animate={{ 
                      scale: isHovered ? 1.15 : 1,
                      backgroundColor: isHovered ? "rgba(37, 99, 235, 0.9)" : "rgba(15, 23, 42, 0.6)"
                    }}
                    className="w-16 h-16 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 shadow-xl"
                  >
                    <Play size={24} className="text-white fill-white ml-1" />
                  </motion.div>
                </div>

                {/* Footer Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pt-12">
                  <div className="flex items-end justify-between gap-4 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {tour.title}
                    </h3>
                    <span className="text-xs font-medium text-slate-400 bg-slate-900/60 px-2.5 py-1 rounded-md border border-white/5 shrink-0">
                      {tour.duration}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 opacity-90 group-hover:opacity-100 transition-opacity line-clamp-2">
                    {tour.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4 md:p-8"
          >
            {/* Close trigger overlay */}
            <div className="absolute inset-0" onClick={() => setActiveVideo(null)} />

            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl z-10 flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-900/80 backdrop-blur-md">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    {activeVideo.category} • {activeVideo.duration} Tour
                  </span>
                  <h3 className="text-lg font-bold text-white">{activeVideo.title}</h3>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video w-full bg-black">
                <video
                  ref={lightboxVideoRef}
                  src={activeVideo.videoUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Custom Video Controls Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-4 z-20">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 hover:bg-slate-900 text-white transition-colors shadow-lg"
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 hover:bg-slate-900 text-white transition-colors shadow-lg"
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>

                  <span className="px-3.5 py-2 rounded-xl bg-blue-600 font-bold text-xs text-white shadow-lg tracking-wider">
                    4K ULTRA HD
                  </span>
                </div>

                {/* Loading spinner placeholder */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              </div>

              {/* Modal Description Footer */}
              <div className="p-6 bg-slate-950/40 text-slate-300 text-sm border-t border-white/5 leading-relaxed">
                {activeVideo.description} Zero Gravity Tours offers premium, tailored itineraries to this destination. Discover our detailed guides, custom houses/villas, and expert local naturalists by selecting this package.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
