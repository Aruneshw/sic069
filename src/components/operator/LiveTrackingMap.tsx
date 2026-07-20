"use client";

import { useState, useEffect, useRef } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { X, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Colorful map style using Carto Voyager (light, colorful, no API key required)
const mapStyle = {
  version: 8 as const,
  sources: {
    "carto-voyager": {
      type: "raster" as const,
      tiles: [
        "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
        "https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
        "https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
        "https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
      ],
      tileSize: 256,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
    }
  },
  layers: [
    {
      id: "carto-voyager-layer",
      type: "raster" as const,
      source: "carto-voyager",
      minzoom: 0,
      maxzoom: 22,
    }
  ]
};

// Mock tourist places using provided images
const touristPlaces = [
  { id: 1, name: "Alappuzha", lat: 9.4981, lng: 76.3388, avatar: "/images/places/alapuzha.png", description: "Venice of the East" },
  { id: 2, name: "Black Thunder", lat: 11.3005, lng: 76.9458, avatar: "/images/places/black_thunder.png", description: "Theme Park" },
  { id: 3, name: "Guna Caves", lat: 10.2227, lng: 77.4727, avatar: "/images/places/guna_cave.png", description: "Devil's Kitchen" },
  { id: 4, name: "Guruvayur", lat: 10.5962, lng: 76.0381, avatar: "/images/places/guruvayur.png", description: "Temple Town" },
  { id: 5, name: "Hogenakkal", lat: 12.1190, lng: 77.7770, avatar: "/images/places/hogennakal.png", description: "Niagara of India" },
  { id: 6, name: "Isha Foundation", lat: 10.9723, lng: 76.7354, avatar: "/images/places/isha.png", description: "Adiyogi" },
  { id: 7, name: "Monkey Falls", lat: 10.4357, lng: 76.9934, avatar: "/images/places/monkey_falls.png", description: "Pollachi" },
  { id: 8, name: "Ooty", lat: 11.4100, lng: 76.6932, avatar: "/images/places/ooty.png", description: "Hill Station" },
  { id: 9, name: "Thiruchendur", lat: 8.4975, lng: 78.1213, avatar: "/images/places/thiruchendur.png", description: "Coastal Temple" },
  { id: 10, name: "Wayanad", lat: 11.6854, lng: 76.1320, avatar: "/images/places/wayanad.png", description: "Nature's Abode" },
];

interface LiveTrackingMapProps {
  onClose: () => void;
}

export default function LiveTrackingMap({ onClose }: LiveTrackingMapProps) {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // Disable scrolling on body when map is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleMapLoad = () => {
    // Cinematic fly-to animation to South India in top-down view
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current.flyTo({
          center: [77.0, 10.5], // Center of South India (Tamil Nadu/Kerala)
          zoom: 6,
          pitch: 0, // Top-down view as requested
          bearing: 0, // No rotation
          duration: 3500,
          essential: true,
        });
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[100] bg-teal-50/80 backdrop-blur-sm flex flex-col overflow-hidden"
      >
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 z-10 pointer-events-none flex items-start justify-between">
          <div className="pointer-events-auto bg-white/90 backdrop-blur-md border border-slate-200 px-6 py-4 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
              </span>
              Popular Destinations
            </h2>
            <p className="text-slate-500 text-sm mt-1">Discover incredible places in South India</p>
          </div>
          
          <button
            onClick={onClose}
            className="pointer-events-auto w-12 h-12 bg-white hover:bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-all shadow-lg"
            aria-label="Close Map"
          >
            <X size={24} />
          </button>
        </div>

        {/* Map Container */}
        <div className="flex-1 w-full h-full relative shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]">
          <Map
            ref={mapRef}
            initialViewState={{
              longitude: 0,
              latitude: 30,
              zoom: 1.5,
              pitch: 0,
              bearing: 0
            }}
            mapStyle={mapStyle}
            mapLib={maplibregl}
            onLoad={handleMapLoad}
            style={{ width: "100%", height: "100%" }}
            interactiveLayerIds={["carto-voyager-layer"]}
          >
            <NavigationControl position="bottom-right" showCompass={false} />

            {/* Render markers for tourist places */}
            {touristPlaces.map((place) => (
              <Marker
                key={place.id}
                longitude={place.lng}
                latitude={place.lat}
                anchor="bottom"
                onClick={e => {
                  e.originalEvent.stopPropagation();
                  mapRef.current?.flyTo({ center: [place.lng, place.lat], zoom: 12, duration: 2500, pitch: 0, bearing: 0 });
                }}
              >
                <div className="flex flex-col items-center cursor-pointer transition-transform hover:scale-110 group">
                  <div className="relative">
                    {/* Image Container */}
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-1 relative z-10 border border-white/50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={place.avatar} className="w-full h-full rounded-xl object-cover" alt={place.name} />
                    </div>
                    {/* Pointer Tail */}
                    <div className="w-4 h-4 bg-white absolute -bottom-1.5 left-1/2 -translate-x-1/2 rotate-45 shadow-sm z-0" />
                  </div>
                  
                  {/* Name Tag */}
                  <div className="mt-3 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg flex flex-col items-center opacity-90 group-hover:opacity-100 transition-opacity min-w-max">
                    <span className="text-[14px] font-bold text-slate-800 whitespace-nowrap">{place.name}</span>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">{place.description}</span>
                  </div>
                </div>
              </Marker>
            ))}
          </Map>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
