"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";

export default function FloatingEnquireCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't show on admin, login, or contact pages
  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup")
  ) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.7 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="fixed top-[120px] right-8 z-[60]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Ambient 3D glow layers */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(247,181,56,0.35) 0%, transparent 70%)",
              filter: "blur(20px)",
              transform: isHovered ? "scale(1.8)" : "scale(1.4)",
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(120,1,22,0.2) 0%, transparent 60%)",
              filter: "blur(30px)",
              transform: isHovered ? "scale(2.2) translateY(8px)" : "scale(1.6) translateY(4px)",
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          <Link
            href="/about#contact"
            className="relative no-underline group"
          >
            {/* Main 3D Button */}
            <motion.div
              animate={{
                y: isHovered ? -4 : 0,
                rotateX: isHovered ? -8 : 0,
                rotateY: isHovered ? 5 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="relative flex items-center gap-2.5 cursor-pointer"
              style={{
                fontFamily: "var(--font-poppins), Poppins, sans-serif",
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                padding: "14px 28px",
                borderRadius: 100,
                background: "linear-gradient(145deg, #8B021A 0%, #780116 30%, #4A000E 100%)",
                border: "2px solid rgba(247,181,56,0.4)",
                transformStyle: "preserve-3d",
                perspective: "800px",
                boxShadow: isHovered
                  ? "0 18px 40px -8px rgba(74,0,14,0.55), 0 0 30px rgba(247,181,56,0.25), inset 0 2px 6px rgba(247,181,56,0.15), inset 0 -3px 6px rgba(0,0,0,0.3)"
                  : "0 10px 28px -6px rgba(74,0,14,0.45), 0 0 15px rgba(247,181,56,0.12), inset 0 2px 4px rgba(247,181,56,0.1), inset 0 -2px 4px rgba(0,0,0,0.2)",
                transition: "box-shadow 0.4s ease",
              }}
            >
              {/* Inner shimmer layer */}
              <div
                className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 30%, rgba(247,181,56,0.12) 50%, transparent 70%)",
                  transform: isHovered ? "translateX(60px)" : "translateX(-60px)",
                  transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />

              <motion.div
                animate={{ rotate: isHovered ? 15 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Send size={16} className="text-[#F7B538]" />
              </motion.div>
              <span className="relative z-10">Enquire Now</span>
              
              {/* 3D depth "bottom" edge */}
              <div
                className="absolute bottom-0 left-2 right-2 h-[3px] rounded-b-full pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.3), transparent)",
                  transform: "translateY(100%)",
                  borderRadius: "0 0 100px 100px",
                }}
              />
            </motion.div>
          </Link>

          {/* Orbiting sparkle dot */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute pointer-events-none"
            style={{
              width: 6,
              height: 6,
              top: "50%",
              left: "50%",
              marginTop: -3,
              marginLeft: -3,
              transformOrigin: "40px center",
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: "#F7B538",
                boxShadow: "0 0 8px #F7B538, 0 0 16px rgba(247,181,56,0.5)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
