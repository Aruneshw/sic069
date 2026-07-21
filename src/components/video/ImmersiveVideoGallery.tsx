"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, Volume2, VolumeX, Compass } from "lucide-react";
import { getAssetUrl, getCategoryVideo, getCategoryPreviewVideo } from "@/lib/trips";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";

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
    videoUrl: getCategoryVideo("Coastal"),
    previewUrl: getCategoryPreviewVideo("Coastal"),
    posterUrl: getAssetUrl("/images/places/alapuzha.png"),
  },
  {
    id: "mountain",
    title: "Nilgiri Mountain Railway & Peaks",
    category: "Mountain",
    description: "Ascend into mist-covered tea estates and high-altitude mountain trails.",
    duration: "5 Days",
    videoUrl: getCategoryVideo("Mountain"),
    previewUrl: getCategoryPreviewVideo("Mountain"),
    posterUrl: getAssetUrl("/images/places/ooty.png"),
  },
  {
    id: "valley",
    title: "Wayanad Cascades & Trails",
    category: "Valley",
    description: "Trek through dense spice forests to hidden cascading waterfalls.",
    duration: "4 Days",
    videoUrl: getCategoryVideo("Valley"),
    previewUrl: getCategoryPreviewVideo("Valley"),
    posterUrl: getAssetUrl("/images/places/wayanad.png"),
  },
  {
    id: "urban",
    title: "South Indian Temple Sanctums",
    category: "Urban",
    description: "Immerse yourself in sacred rituals, spiritual geometry, and ancient architecture.",
    duration: "4 Days",
    videoUrl: getCategoryVideo("Urban"),
    previewUrl: getCategoryPreviewVideo("Urban"),
    posterUrl: getAssetUrl("/images/places/guruvayur.png"),
  },
];

// Global counter to restrict concurrent video decoding to 2
let concurrentDecodes = 0;
const MAX_DECODES = 2;

const VideoTile = React.memo(({ tour, index, onPlayLightbox }: { tour: VideoTour, index: number, onPlayLightbox: (t: VideoTour) => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { isLowEnd } = useDeviceCapabilities();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Explicit tap-to-play for low-end
  const [lowEndPlaying, setLowEndPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "200px" } // Mount video slightly before it enters viewport
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    
    let isVideoPlaying = false;
    
    if (isLowEnd) {
      if (lowEndPlaying) {
        if (concurrentDecodes < MAX_DECODES) {
          concurrentDecodes++;
          videoRef.current.play().catch(() => {});
          isVideoPlaying = true;
        }
      } else {
        videoRef.current.pause();
      }
    } else {
      if (isHovered && isIntersecting) {
        if (concurrentDecodes < MAX_DECODES) {
          concurrentDecodes++;
          videoRef.current.play().catch(() => {});
          isVideoPlaying = true;
        }
      } else {
        videoRef.current.pause();
        if (videoRef.current.currentTime > 0) {
          videoRef.current.currentTime = 0;
        }
      }
    }
    
    return () => {
      if (isVideoPlaying) {
        concurrentDecodes--;
      }
    };
  }, [isHovered, isIntersecting, isLowEnd, lowEndPlaying]);

  const handlePointerEnter = () => setIsHovered(true);
  const handlePointerLeave = () => setIsHovered(false);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={() => {
        if (isLowEnd && !lowEndPlaying) {
           setLowEndPlaying(true);
        } else {
           onPlayLightbox(tour);
        }
      }}
      className={`group relative h-[320px] rounded-3xl overflow-hidden border bg-slate-900 cursor-pointer shadow-2xl transition-[transform,border-color] duration-300 ease-out ${
        isHovered ? "scale-[1.04] border-blue-500/30" : "scale-100 border-white/10"
      }`}
      style={{
         // CSS Containment drastically reduces layout work for off-screen tiles
         contain: "content",
         contentVisibility: "auto",
         containIntrinsicSize: "auto 320px",
         // Only apply will-change when active to prevent layer explosion
         willChange: isHovered ? "transform" : "auto"
      }}
    >
      <div className="absolute inset-0 w-full h-full z-0 bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10 pointer-events-none" />
        
        {/* Only mount video tag if intersecting */}
        {isIntersecting ? (
          <video
            ref={videoRef}
            src={tour.previewUrl}
            poster={tour.posterUrl}
            loop
            muted
            playsInline
            preload="none"
            className={`w-full h-full object-cover transition-opacity duration-300 ${isHovered || (isLowEnd && lowEndPlaying) ? "opacity-100" : "opacity-70"}`}
          />
        ) : (
          <img src={tour.posterUrl} className="w-full h-full object-cover opacity-70" alt={tour.title} />
        )}
      </div>

      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
        <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-white/10 text-xs font-bold tracking-wider text-teal-400 uppercase">
          {tour.category}
        </span>
        {!isLowEnd && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/90 text-xs font-bold text-white shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
            LIVE PREVIEW
          </span>
        )}
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div
          className={`w-16 h-16 rounded-full border flex items-center justify-center transition-[transform,background-color,border-color] duration-300 shadow-xl ${
            isHovered 
              ? "scale-[1.15] bg-blue-600/90 border-blue-400/50" 
              : "scale-100 bg-slate-900/60 border-white/20"
          }`}
        >
          <Play size={24} className="text-white fill-white ml-1" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pt-12 pointer-events-none">
        <div className="flex items-end justify-between gap-4 mb-2">
          <h3 className={`text-xl font-bold transition-colors duration-300 ${isHovered ? "text-blue-400" : "text-white"}`}>
            {tour.title}
          </h3>
          <span className="text-xs font-medium text-slate-400 bg-slate-900/60 px-2.5 py-1 rounded-md border border-white/5 shrink-0">
            {tour.duration}
          </span>
        </div>
        <p className={`text-sm text-slate-300 transition-opacity duration-300 line-clamp-2 ${isHovered ? "opacity-100" : "opacity-80"}`}>
          {tour.description}
        </p>
      </div>
    </motion.div>
  );
});

VideoTile.displayName = "VideoTile";

export default function ImmersiveVideoGallery() {
  const [activeVideo, setActiveVideo] = useState<VideoTour | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const lightboxVideoRef = useRef<HTMLVideoElement | null>(null);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePlayLightbox = useCallback((tour: VideoTour) => {
    setActiveVideo(tour);
    setIsPlaying(true);
    setIsMuted(false);
  }, []);

  return (
    <section className="py-20 bg-slate-950 text-white overflow-hidden relative">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tours.map((tour, index) => (
            <VideoTile 
              key={tour.id} 
              tour={tour} 
              index={index} 
              onPlayLightbox={handlePlayLightbox} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 md:p-8"
          >
            <div className="absolute inset-0" onClick={() => setActiveVideo(null)} />

            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl z-10 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-900/80">
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

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-4 z-20">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-3 rounded-xl bg-slate-950/80 border border-white/10 hover:bg-slate-900 text-white transition-colors shadow-lg"
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-3 rounded-xl bg-slate-950/80 border border-white/10 hover:bg-slate-900 text-white transition-colors shadow-lg"
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>

                  <span className="px-3.5 py-2 rounded-xl bg-blue-600 font-bold text-xs text-white shadow-lg tracking-wider">
                    4K ULTRA HD
                  </span>
                </div>
              </div>

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
