"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  MapPin, 
  Image as ImageIcon, 
  Clock, 
  Users, 
  IndianRupee, 
  FileText,
  Dna,
  Compass,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function PackageBuilder({ currentStep, onNext, onPrev }: { currentStep: number, onNext: () => void, onPrev: () => void }) {
  
  // Dummy state for demonstration
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    destination: "",
    category: "Adventure",
  });

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6 max-w-2xl mx-auto py-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-white mb-2">Basic Information</h2>
              <p className="text-sm text-slate-400">Let's start with the core identity of this expedition.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Package Name</label>
                <input type="text" placeholder="e.g. Kolukkumalai Sunrise Expedition" className="w-full bg-navy-950 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Destination</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input type="text" placeholder="e.g. Kerala, India" className="w-full bg-navy-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
                  <select className="w-full bg-navy-950 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 appearance-none">
                    <option>Adventure</option>
                    <option>Nature</option>
                    <option>Peace</option>
                    <option>Culture</option>
                    <option>Mystery Escape</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Short Description</label>
                <textarea rows={2} placeholder="A brief, exciting hook for the package card..." className="w-full bg-navy-950 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 resize-none" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Description</label>
                <textarea rows={5} placeholder="The complete immersive story of this journey..." className="w-full bg-navy-950 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 resize-none" />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 text-slate-400">
            <FileText size={48} className="mb-4 text-slate-200" />
            <h3 className="text-xl font-bold text-white mb-2">Trip Details</h3>
            <p className="max-w-md">Configure duration, difficulty, capacity, and logistical information.</p>
          </div>
        );
      case 7: // Travel DNA
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 text-slate-400">
            <Dna size={48} className="mb-4 text-teal-500" />
            <h3 className="text-xl font-bold text-white mb-2">Travel DNA Tagging</h3>
            <p className="max-w-md mb-6">Configure the exact psychological profile of this package so the engine can match it to the right travelers.</p>
            <div className="w-full max-w-3xl grid grid-cols-2 gap-x-12 gap-y-6 text-left">
              {[
                { name: "Adventure", val: 85 },
                { name: "Nature", val: 90 },
                { name: "Peace", val: 40 },
                { name: "Social", val: 65 },
                { name: "Comfort", val: 30 },
                { name: "Physical Intensity", val: 95 }
              ].map(trait => (
                <div key={trait.name}>
                  <div className="flex justify-between text-xs font-bold text-white mb-2">
                    <span>{trait.name}</span>
                    <span className="text-teal-400">{trait.val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-navy-950 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: `${trait.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 text-slate-400">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-slate-300">{currentStep}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Step {currentStep} Content</h3>
            <p className="max-w-md">This builder step is under construction for the admin portal.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full absolute inset-0">
      <div className="flex-1 overflow-y-auto hide-scrollbar p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Footer Navigation */}
      <div className="p-4 border-t border-white/5 bg-navy-950/80 backdrop-blur-md flex items-center justify-between mt-auto">
        <button 
          onClick={onPrev}
          disabled={currentStep === 1}
          className="px-6 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-white/5 disabled:opacity-30 transition-colors"
        >
          Back
        </button>
        {currentStep === 9 ? (
          <button className="flex items-center gap-2 px-8 py-2.5 bg-teal-500 text-navy-950 rounded-xl text-sm font-bold hover:bg-teal-400 transition-colors shadow-[0_0_15px_rgba(45,212,191,0.3)]">
            Review & Submit <CheckCircle2 size={16} strokeWidth={2.5} />
          </button>
        ) : (
          <button 
            onClick={onNext}
            className="flex items-center gap-2 px-8 py-2.5 bg-white text-navy-950 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors shadow-lg"
          >
            Continue <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
}
