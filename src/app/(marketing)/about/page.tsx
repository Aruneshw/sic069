import Image from "next/image";
import Link from "next/link";
import { getAssetUrl } from "@/lib/trips";
import { Award, Globe, Users, Target, Shield, HeartHandshake, Phone, Mail, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import WaveDivider from "@/components/ui/WaveDivider";
import RunningLetters from "@/components/ui/RunningLetters";
import ContactForm from "@/components/forms/ContactForm";
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid";

export default function AboutPage() {
  return (
    <div className="bg-[#FFFDF9] min-h-screen pb-24">
      {/* ═══════════════════════════════════════
          MISSION HERO & BENTO METRICS
          ═══════════════════════════════════════ */}
      <section className="pt-40 pb-24 md:pt-48 md:pb-28 px-6 relative overflow-hidden bg-gradient-to-br from-[#150408] via-[#330009] to-[#780116] text-white">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="metadata"
          poster={getAssetUrl("/videos/hovering_zoom_vid-poster.webp")}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
        >
          <source src={getAssetUrl("/videos/hovering_zoom_vid.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#150408] via-transparent to-black/30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F7B538]/15 rounded-full blur-[130px] pointer-events-none" />
        
        <div className="container-main relative z-10">
          <div className="max-w-3xl mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-[#F7B538] font-black uppercase tracking-widest rounded-full mb-6 text-xs border border-[#F7B538]/40 backdrop-blur-md">
              <Sparkles size={14} /> Our Creed & Heritage
            </span>
            <RunningLetters
              as="h1"
              text="Radical Transparency for Every Wanderer"
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-xl"
            />
            <p className="font-script text-3xl text-[#F7B538] mb-6">
              Travel designed with uncompromising honesty
            </p>
            <p className="text-base md:text-lg text-slate-200 leading-relaxed drop-shadow-sm font-normal">
              We founded Zero Gravity Tours out of frustration with broken booking systems, hidden charges, and opaque schedules. We provide live departures, deterministic seat caps, and comprehensive inclusions so you can explore the globe with absolute clarity.
            </p>
          </div>

          {/* Stats Bento Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 border-t border-white/15 pt-10">
            <div className="p-6 rounded-[2rem] bg-white/[0.05] border border-white/10 text-center">
              <div className="text-3xl md:text-4xl font-black text-[#F7B538] mb-1">12+</div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-300">Years of Expeditions</div>
            </div>
            <div className="p-6 rounded-[2rem] bg-white/[0.05] border border-white/10 text-center">
              <div className="text-3xl md:text-4xl font-black text-[#F7B538] mb-1">45k+</div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-300">Explorers Guided</div>
            </div>
            <div className="p-6 rounded-[2rem] bg-white/[0.05] border border-white/10 text-center">
              <div className="text-3xl md:text-4xl font-black text-[#F7B538] mb-1">18</div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-300">Heritage Awards</div>
            </div>
            <div className="p-6 rounded-[2rem] bg-white/[0.05] border border-white/10 text-center">
              <div className="text-3xl md:text-4xl font-black text-[#F7B538] mb-1">120+</div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-300">Active Routes</div>
            </div>
          </div>
        </div>
        <WaveDivider className="text-[#FFFDF9]" />
      </section>

      {/* ═══════════════════════════════════════
          FOUNDER ESSAY & EDITORIAL STORY
          ═══════════════════════════════════════ */}
      <section className="relative pt-20 pb-24 bg-[#FFFDF9] overflow-hidden">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            
            {/* Founder Portrait */}
            <div className="w-full md:w-5/12 relative">
              <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 border border-[#780116]/20">
                <Image 
                  src={getAssetUrl("/images/about/founder_new.png")} 
                  alt="Marcus Vance, Founder" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-52 h-52 bg-[#F7B538]/20 rounded-full blur-2xl z-0" />
              <div className="absolute -top-6 -right-6 w-52 h-52 bg-[#780116]/15 rounded-full blur-2xl z-0" />
            </div>
            
            {/* Editorial Content */}
            <div className="w-full md:w-7/12">
              <span className="text-xs font-black uppercase tracking-widest text-[#780116] bg-[#780116]/10 px-4 py-1.5 rounded-full border border-[#780116]/20 inline-block mb-3">
                Letter from the Founder
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#150408] mb-4">
                Why We Built Zero Gravity
              </h2>
              <p className="font-script text-2xl text-[#D49018] mb-6">
                &ldquo;Every explorer deserves truth before the trek.&rdquo;
              </p>
              
              <div className="space-y-4 text-slate-700 text-sm md:text-base leading-relaxed">
                <p>
                  &ldquo;When I started Zero Gravity Tours over a decade ago, travel booking was fraught with uncertainty. Budget explorers were subjected to opaque pricing, endless waiting for agent replies, and surprise costs waiting at the basecamp.&rdquo;
                </p>
                <p>
                  &ldquo;We architected this platform to change travel culture. We show you exact live departure windows, exact seat occupancies, and every single inclusion upfront. When you step onto the trail with us, your focus remains purely on the majesty of the horizon.&rdquo;
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-[#780116]/15 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[#150408] text-lg">Marcus Vance</h4>
                  <p className="text-xs font-bold text-[#780116] uppercase tracking-wider">Founder & Chief Route Designer</p>
                </div>
                <div className="font-script text-3xl text-[#F7B538] font-bold">
                  Marcus Vance
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VALUES BENTO GRID
          ═══════════════════════════════════════ */}
      <section className="relative pt-12 pb-24 bg-[#FAF3E7] border-y border-[#780116]/10">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#780116] bg-white px-4 py-1.5 rounded-full border border-[#780116]/20 inline-block mb-2">
              Our Core Pillars
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#150408]">The Zero Gravity Standard</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BentoCard variant="light" colSpan={1} headerBadge="Principle I">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#780116] text-[#F7B538] flex items-center justify-center font-bold">
                  <Shield size={24} />
                </div>
                <h3 className="text-lg font-extrabold text-[#150408]">100% Inclusions Verified</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every permit, homestay, porterage fee, and gourmet meal is locked before departure. No hidden trail add-ons.
                </p>
              </div>
            </BentoCard>

            <BentoCard variant="gold" colSpan={1} headerBadge="Principle II">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white text-[#780116] flex items-center justify-center font-bold shadow-md">
                  <Users size={24} />
                </div>
                <h3 className="text-lg font-extrabold text-[#150408]">Intimate Group Sizes</h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Capped strictly at 6–12 travelers to preserve local ecology, tranquility, and genuine social connection.
                </p>
              </div>
            </BentoCard>

            <BentoCard variant="crimson" colSpan={1} headerBadge="Principle III">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F7B538] text-[#150408] flex items-center justify-center font-bold">
                  <HeartHandshake size={24} />
                </div>
                <h3 className="text-lg font-extrabold text-white">Local-First Stewardship</h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  We employ certified native mountain and coastal guides, investing 85%+ of tour logistics directly into regional communities.
                </p>
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT & DISPATCH CONCIERGE
          ═══════════════════════════════════════ */}
      <section id="contact" className="py-24 bg-[#150408] text-white relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#780116]/30 rounded-full blur-[140px] pointer-events-none" />

        <div className="container-main relative z-10">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Contact Form */}
            <div className="w-full lg:w-1/2">
              <span className="font-script text-3xl text-[#F7B538] block mb-2">Speak with a Route Specialist</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Direct Concierge Enquiry</h2>
              <div className="p-8 rounded-[2rem] bg-[#0B0204] border border-[#F7B538]/25 shadow-2xl">
                <ContactForm />
              </div>
            </div>

            {/* HQ Info & FAQ */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-black uppercase tracking-widest text-[#F7B538] mb-6">Global Operations Command</h3>
                <div className="space-y-4 mb-12">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="p-2.5 bg-[#780116] rounded-xl text-[#F7B538] shrink-0 border border-[#F7B538]/30">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Sydney, AU — Central Dispatch</h4>
                      <p className="text-slate-300 text-xs mt-0.5">Level 12, Explorer Tower, 100 Adventure Way</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="p-2.5 bg-[#780116] rounded-xl text-[#F7B538] shrink-0 border border-[#F7B538]/30">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Direct Expeditions Desk</h4>
                      <p className="text-slate-300 text-xs mt-0.5">concierge@zerogravitytours.com (Under 2h response)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="faq" className="mt-auto">
                <h3 className="text-lg font-black uppercase tracking-widest text-[#F7B538] mb-4">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#0B0204] border border-white/10">
                    <h4 className="font-bold text-white text-xs mb-1">How are group sizes strictly maintained?</h4>
                    <p className="text-[11px] text-slate-300">Our database locks departures the exact moment the maximum limit (6–12 seats) is reached.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0B0204] border border-white/10">
                    <h4 className="font-bold text-white text-xs mb-1">What is your cancellation commitment?</h4>
                    <p className="text-[11px] text-slate-300">100% full refund up to 45 days before departure, zero questions asked.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
