import Image from "next/image";
import Link from "next/link";
import { getAssetUrl } from "@/lib/trips";
import { Award, Globe, Users, Target, Shield, HeartHandshake, Phone, Mail, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import RunningLetters from "@/components/ui/RunningLetters";
import ContactForm from "@/components/forms/ContactForm";
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid";

export default function AboutPage() {
  return (
    <div className="bg-[#FBF9F5] min-h-screen pb-24 text-[#150408]">
      {/* ═══════════════════════════════════════
          MISSION HERO & METRICS
          ═══════════════════════════════════════ */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 px-4 text-center">
        <div className="container-main max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF0DF] text-[#7E5105] font-black uppercase tracking-widest rounded-full mb-4 text-xs border border-[#F7B538]/40">
            <Sparkles size={14} className="text-[#D49018]" /> Our Creed & Heritage
          </span>
          <RunningLetters
            as="h1"
            text="Radical Transparency for Every Wanderer"
            className="text-4xl md:text-6xl font-extrabold text-[#150408] mb-3 leading-tight"
          />
          <p className="font-script text-3xl md:text-4xl text-[#780116] mb-4">
            Travel designed with uncompromising honesty
          </p>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
            We founded Zero Gravity Tours to eliminate broken booking systems, hidden charges, and opaque schedules. We provide live departures, deterministic seat caps, and comprehensive inclusions so you can explore the globe with absolute clarity.
          </p>

          {/* Givingli 4-Card Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
            <div className="p-5 rounded-[1.75rem] bg-[#FDE8EC] border border-pink-200 text-center shadow-xs">
              <div className="text-3xl md:text-4xl font-black text-[#780116] mb-0.5">12+</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#780116]/80">Years Active</div>
            </div>
            <div className="p-5 rounded-[1.75rem] bg-[#FAF0DF] border border-amber-200 text-center shadow-xs">
              <div className="text-3xl md:text-4xl font-black text-[#7E5105] mb-0.5">45k+</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#7E5105]/80">Happy Explorers</div>
            </div>
            <div className="p-5 rounded-[1.75rem] bg-[#EBF5EE] border border-emerald-200 text-center shadow-xs">
              <div className="text-3xl md:text-4xl font-black text-emerald-800 mb-0.5">18</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-emerald-800/80">Awards Won</div>
            </div>
            <div className="p-5 rounded-[1.75rem] bg-[#F0EEFA] border border-indigo-200 text-center shadow-xs">
              <div className="text-3xl md:text-4xl font-black text-indigo-900 mb-0.5">120+</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-indigo-900/80">Regional Routes</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOUNDER LETTER & EDITORIAL STORY
          ═══════════════════════════════════════ */}
      <section className="py-16 px-4 md:px-8 border-t border-[#780116]/10">
        <div className="container-main max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16 bg-white p-8 md:p-12 rounded-[2.5rem] border border-[#780116]/10 shadow-xl">
            
            {/* Founder Portrait */}
            <div className="w-full md:w-5/12 relative shrink-0">
              <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-md relative z-10 border border-[#780116]/15 bg-slate-100">
                <Image 
                  src={getAssetUrl("/images/about/founder_new.png")} 
                  alt="Marcus Vance, Founder" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Editorial Content */}
            <div className="w-full md:w-7/12">
              <span className="text-xs font-black uppercase tracking-widest text-[#780116] bg-[#FDE8EC] px-3.5 py-1.5 rounded-full inline-block mb-3">
                Letter from the Founder
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#150408] mb-2 leading-tight">
                Why We Built Zero Gravity
              </h2>
              <p className="font-script text-2xl text-[#780116] mb-4">
                &ldquo;Every explorer deserves truth before the trek.&rdquo;
              </p>
              
              <div className="space-y-3.5 text-slate-700 text-xs md:text-sm leading-relaxed font-normal">
                <p>
                  &ldquo;When I started Zero Gravity Tours over a decade ago, travel booking was fraught with uncertainty. Budget explorers were subjected to opaque pricing, endless waiting for agent replies, and surprise costs waiting at the basecamp.&rdquo;
                </p>
                <p>
                  &ldquo;We architected this platform to change travel culture. We show you exact live departure windows, exact seat occupancies, and every single inclusion upfront. When you step onto the trail with us, your focus remains purely on the majesty of the horizon.&rdquo;
                </p>
              </div>
              
              <div className="mt-6 pt-5 border-t border-black/5 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[#150408] text-base">Marcus Vance</h4>
                  <p className="text-xs font-bold text-[#780116]">Founder & Chief Route Designer</p>
                </div>
                <div className="font-script text-3xl text-[#780116] font-bold">
                  Marcus Vance
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VALUES GIVINGLI BENTO GRID
          ═══════════════════════════════════════ */}
      <section className="py-16 px-4 md:px-8 bg-[#FAF7F2] border-y border-[#780116]/10">
        <div className="container-main max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#780116] bg-[#FDE8EC] px-3.5 py-1.5 rounded-full inline-block mb-2">
              Our Core Pillars
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#150408]">The Zero Gravity Standard</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BentoCard variant="lavender" headerBadge="Principle I" title="100% Inclusions">
              <p className="text-xs text-slate-700 leading-relaxed mt-2">
                Every permit, homestay, porterage fee, and gourmet meal is locked before departure. Zero trail markups.
              </p>
            </BentoCard>

            <BentoCard variant="champagne" headerBadge="Principle II" title="Small-Group Caps">
              <p className="text-xs text-slate-700 leading-relaxed mt-2">
                Capped strictly at 6–12 travelers to preserve local ecology, serenity, and genuine camaraderie.
              </p>
            </BentoCard>

            <BentoCard variant="blush" headerBadge="Principle III" title="Local Stewardship">
              <p className="text-xs text-slate-700 leading-relaxed mt-2">
                We employ certified native guides, investing 85%+ of tour logistics directly into regional mountain communities.
              </p>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT CONCIERGE & FAQS
          ═══════════════════════════════════════ */}
      <section id="contact" className="py-20 px-4 md:px-8">
        <div className="container-main max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Contact Form Bento Tile */}
            <div className="w-full lg:w-1/2 p-8 rounded-[2.5rem] bg-white border border-[#780116]/15 shadow-xl">
              <span className="font-script text-3xl text-[#780116] block mb-1">Direct Concierge Enquiry</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#150408] mb-6">Speak with a Route Specialist</h2>
              <ContactForm />
            </div>

            {/* HQ Info & FAQ */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="p-6 rounded-[2rem] bg-[#FDE8EC] border border-pink-200 space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#780116]">Global Operations Hub</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-pink-100">
                    <MapPin size={18} className="text-[#780116] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-extrabold text-[#150408]">Sydney, AU — Central Dispatch</div>
                      <div className="text-[11px] text-slate-600">Level 12, Explorer Tower, 100 Adventure Way</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-pink-100">
                    <Mail size={18} className="text-[#780116] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-extrabold text-[#150408]">Direct Concierge Desk</div>
                      <div className="text-[11px] text-slate-600">concierge@zerogravitytours.com (Under 2h response)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="faq" className="p-6 rounded-[2rem] bg-[#FAF0DF] border border-amber-200 space-y-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#7E5105]">Frequently Asked Questions</h3>
                <div className="p-3.5 bg-white rounded-xl border border-amber-100 space-y-1">
                  <h4 className="font-extrabold text-[#150408] text-xs">How are group sizes strictly maintained?</h4>
                  <p className="text-[11px] text-slate-600">Our database locks departures the exact moment the maximum limit (6–12 seats) is reached.</p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-amber-100 space-y-1">
                  <h4 className="font-extrabold text-[#150408] text-xs">What is your cancellation commitment?</h4>
                  <p className="text-[11px] text-slate-600">100% full refund up to 45 days before departure, zero questions asked.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
