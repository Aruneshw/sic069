import Image from "next/image";
import { Award, Globe, Users, Target, Shield, HeartHandshake, Phone, Mail, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pb-24">
      {/* ═══════════════════════════════════════
          MISSION & STATS (page-05.png)
          ═══════════════════════════════════════ */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 px-6 relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-navy-50/50 rounded-bl-[100px] -z-10" />
        
        <div className="container-main">
          <div className="max-w-3xl mb-16">
            <span className="inline-block px-4 py-2 bg-teal-50 text-teal-700 font-bold uppercase tracking-wider rounded-full mb-6 text-sm border border-teal-100">
              Our Mission
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6 leading-tight">
              Radical Transparency <br />
              <span className="text-teal-600">for Budget</span> Travellers.
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              We believe that budget travellers deserve better than broken links, hidden fees, and waiting on email replies to find out if a trip is running. Since our founding, we've been committed to providing clear inclusions, live group sizes, and instant schedules so you can plan with confidence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-b border-slate-100 py-12">
            <div className="text-center p-4">
              <div className="text-4xl font-bold text-navy-900 mb-2">12+</div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Years Active</div>
            </div>
            <div className="text-center p-4 border-l border-slate-100">
              <div className="text-4xl font-bold text-navy-900 mb-2">45k</div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Happy Travelers</div>
            </div>
            <div className="text-center p-4 md:border-l border-slate-100">
              <div className="text-4xl font-bold text-navy-900 mb-2">18</div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Industry Awards</div>
            </div>
            <div className="text-center p-4 border-l border-slate-100">
              <div className="text-4xl font-bold text-navy-900 mb-2">120+</div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Regional Tours</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOUNDER SECTION (page-09.png)
          ═══════════════════════════════════════ */}
      <section className="py-20 bg-slate-50 overflow-hidden">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full md:w-5/12 relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                <div className="absolute inset-0 bg-slate-200 animate-pulse" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/about/founder.png" 
                  alt="Marcus Vance, Founder" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-teal-100 rounded-full mix-blend-multiply opacity-50 blur-xl z-0" />
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-navy-100 rounded-full mix-blend-multiply opacity-50 blur-xl z-0" />
            </div>
            
            <div className="w-full md:w-7/12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">A word from our founder</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                "When I started Zero Gravity Tours, I was tired of the opaque booking systems that budget travellers have to endure every day. Relying on outdated word-of-mouth recommendations and waiting days for a travel agent to reply with a schedule just wasn't good enough."
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                "We built this platform to fix that. We show you exactly when our trips run, how many seats are open, and what every cent goes towards. It's time to replace the guesswork with a system you can actually rely on."
              </p>
              
              <div className="flex items-center gap-4">
                <div>
                  <h4 className="font-bold text-navy-900 text-lg">Marcus Vance</h4>
                  <p className="text-slate-500 font-medium">Founder & Chief Explorer</p>
                </div>
                {/* Signature graphic could go here */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          GALLERY (page-05.png / page-09.png)
          ═══════════════════════════════════════ */}
      <section className="py-24">
        <div className="container-main mb-12 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-4">Capturing the Unforgettable</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Moments of awe, challenge, and triumph from our recent expeditions.</p>
        </div>
        
        {/* Simple masonry grid representation */}
        <div className="container-main grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden aspect-square relative group">
            <img src="https://source.unsplash.com/random/800x800/?hiking" alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square relative group">
            <img src="https://source.unsplash.com/random/400x400/?ocean" alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square relative group">
            <img src="https://source.unsplash.com/random/400x400/?mountain,snow" alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square relative group">
            <img src="https://source.unsplash.com/random/400x400/?camping" alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square relative group">
            <img src="https://source.unsplash.com/random/400x400/?forest" alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT FORM & FAQ (page-09.png)
          ═══════════════════════════════════════ */}
      <section id="contact" className="py-24 bg-navy-900 text-white relative">
        <div className="container-main">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Contact Form */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                  <select 
                    id="subject"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="" className="text-navy-900">Select a topic...</option>
                    <option value="booking" className="text-navy-900">Booking Enquiry</option>
                    <option value="custom" className="text-navy-900">Custom Group Tour</option>
                    <option value="support" className="text-navy-900">General Support</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                  <textarea 
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                    placeholder="How can we help you plan your next trip?"
                  />
                </div>
                <button type="button" className="btn-cta w-full py-4 text-base mt-2 shadow-glow-cta">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info & FAQ */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-6">Global Headquarters</h3>
                <div className="space-y-4 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg shrink-0">
                      <MapPin size={20} className="text-teal-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Sydney, AU</h4>
                      <p className="text-slate-400 text-sm">Level 12, Explorer Building<br/>100 Adventure Way, Sydney NSW 2000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg shrink-0">
                      <Phone size={20} className="text-teal-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Phone</h4>
                      <p className="text-slate-400 text-sm">+61 2 8000 1234<br/>Mon-Fri, 9am - 6pm AEST</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg shrink-0">
                      <Mail size={20} className="text-teal-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Email</h4>
                      <p className="text-slate-400 text-sm">hello@zerogravitytours.com<br/>Expect a reply within 24h</p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="faq" className="mt-auto">
                <h3 className="text-xl font-bold mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <h4 className="font-bold text-white mb-2">Are flights included?</h4>
                    <p className="text-sm text-slate-400">Unless specifically stated in the itinerary, international and domestic flights are not included in the tour price.</p>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <h4 className="font-bold text-white mb-2">What is the cancellation policy?</h4>
                    <p className="text-sm text-slate-400">Full refund up to 60 days before departure. 50% refund between 30-60 days. No refund within 30 days.</p>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <h4 className="font-bold text-white mb-2">How fit do I need to be?</h4>
                    <p className="text-sm text-slate-400">Each tour has a physical rating from 1 (Relaxed) to 5 (Challenging). Please check the specific requirements on the trip page.</p>
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
