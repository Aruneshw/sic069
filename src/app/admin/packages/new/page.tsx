"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, ShieldCheck, ChevronRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import PackageBuilder from "@/components/admin/PackageBuilder";

export default function NewPackagePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    "Basic Info",
    "Trip Details",
    "Pricing",
    "Itinerary",
    "Inclusions",
    "Media",
    "Travel DNA",
    "Local Guide",
    "Review",
  ];

  return (
    <div className="animate-in fade-in duration-500 flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/admin/packages" className="p-2 bg-navy-900 text-slate-400 hover:text-white rounded-lg border border-white/5 transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Create Package</h1>
            <p className="text-sm text-slate-400">Design a new premium expedition.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-navy-800 text-white rounded-lg text-sm font-semibold hover:bg-navy-700 transition-colors border border-white/5 shadow-sm">
            <Save size={16} /> Save Draft
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-navy-950 rounded-lg text-sm font-bold hover:bg-teal-400 transition-colors shadow-[0_0_15px_rgba(45,212,191,0.3)]">
            <ShieldCheck size={16} strokeWidth={2.5} />
            Submit for Approval
          </button>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="bg-navy-900 border border-white/5 rounded-xl p-4 mb-6 shrink-0 overflow-x-auto hide-scrollbar">
        <div className="flex items-center min-w-max">
          {steps.map((step, index) => {
            const stepNum = index + 1;
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;
            return (
              <div key={step} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(stepNum)}
                  className={`flex items-center gap-2 transition-colors ${
                    isActive ? "text-teal-400" : isCompleted ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold border transition-colors ${
                    isActive ? "bg-teal-500/20 border-teal-500/50 text-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.2)]" : 
                    isCompleted ? "bg-teal-500 border-teal-500 text-navy-950" : 
                    "bg-navy-800 border-white/10 text-slate-500"
                  }`}>
                    {isCompleted ? <Check size={12} strokeWidth={3} /> : stepNum}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? "text-white" : ""}`}>{step}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-px mx-3 transition-colors ${isCompleted ? "bg-teal-500/50" : "bg-white/10"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Builder Area */}
      <div className="flex-1 bg-navy-900 border border-white/5 rounded-2xl overflow-hidden relative">
        <PackageBuilder currentStep={currentStep} onNext={() => setCurrentStep(prev => Math.min(prev + 1, steps.length))} onPrev={() => setCurrentStep(prev => Math.max(prev - 1, 1))} />
      </div>
    </div>
  );
}
