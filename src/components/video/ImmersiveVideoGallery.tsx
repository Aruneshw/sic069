"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, Volume2, VolumeX, Compass, Sparkles } from "lucide-react";
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

let concurrentDecodes = 0;
const MAX_DECODES = 2;

const VideoTile = React.memo(({ tour, index, onPlayLightbox }: { tour: VideoTour; index: number; onPlayLightbox: (t: VideoTour) => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { isLowEnd } = useDeviceCapabilities();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lowEndPlaying, setLowEndPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "200px" }
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
        videoRef.current.currentTime = 0;
      }
    }

    return () => {
      if (isVideoPlaying) {
        concurrentDecodes = Math.max(0, concurrentDecodes - 1);
      }
    };
  }, [isHovered, isIntersecting, isLowEnd, lowEndPlaying]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPlayLightbox(tour)}
      className="bento-card-base bento-white rounded-[2rem] p-0 overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-400"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={tour.posterUrl}
          alt={tour.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-108" : "scale-100"
          }`}
        />

        {isIntersecting && (
          <video
            ref={videoRef}
            src={tour.previewUrl}
            loop
            muted
            playsInline
            preload="none"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered || lowEndPlaying ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#150408]/90 via-[#150408]/30 to-transparent" />

        {/* Floating Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <span className="px-3 py-1 rounded-full bg-[#C8A55C]/90 backdrop-blur-md text-[#05070B] text-[10px] font-black uppercase tracking-widest border border-[rgba(200,165,92,0.20)] shadow-sm">
            {tour.category}
          </span>
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-white text-[10px] font-extrabold uppercase shadow-sm">
            {tour.duration}
          </span>
        </div>

        {/* Center Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-[#F7B538] text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#F9C862] transition-transform duration-300">
            <Play size={22} className="ml-1 fill-[#150408]" />
          </div>
        </div>

        {/* Bottom Title & Description */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
          <h3 className="text-xl font-extrabold mb-1 drop-shadow-md group-hover:text-[#05070B] transition-colors">
            {tour.title}
          </h3>
          <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed font-light">
            {tour.description}
          </p>
        </div>
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
    <section className="py-20 bg-transparent border-t border-[rgba(255,255,255,0.06)] px-4 md:px-8">
      <div className="container-main">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[rgba(12,22,38,0.85)] border border-[rgba(200,165,92,0.20)] text-xs font-black tracking-widest text-[#C8A55C] uppercase mb-3">
            <Compass size={14} className="text-[#C8A55C]" /> Immersive Tour Previews
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Virtual Regional Expeditions
          </h2>
          <p className="font-script text-3xl text-[#C8A55C] mb-3">
            Experience the vistas before you step onto the trail
          </p>
          <p className="text-slate-200 text-sm md:text-base max-w-xl mx-auto font-medium">
            Hover to preview each region in high definition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8">
            <div className="absolute inset-0" onClick={() => setActiveVideo(null)} />

            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl rounded-[2.5rem] overflow-hidden border border-[rgba(200,165,92,0.20)] bg-[#150408] text-white shadow-2xl z-10 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0B0204]">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#05070B]">
                    {activeVideo.category} • {activeVideo.duration} Tour
                  </span>
                  <h3 className="text-lg font-bold text-white">{activeVideo.title}</h3>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
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
                      className="p-3 rounded-xl bg-black/70 border border-white/20 hover:bg-black text-white transition-colors shadow-lg"
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-3 rounded-xl bg-black/70 border border-white/20 hover:bg-black text-white transition-colors shadow-lg"
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>

                  <span className="px-3.5 py-1.5 rounded-xl bg-[#F7B538] font-black text-[11px] text-white shadow-lg tracking-wider">
                    4K ULTRA HD
                  </span>
                </div>
              </div>

              <div className="p-6 bg-[#0B0204] text-slate-300 text-xs border-t border-white/10 leading-relaxed">
                {activeVideo.description} Zero Gravity Tours offers premium, tailored itineraries to this destination.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
