"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Brain, BookOpen, Users, BarChart3, Globe, PlayCircle } from "lucide-react";

const slides = [
  {
    title: "Every Child Learns Differently. MentoroidAI Learns Your Child.",
    subtitle: "Adaptive, bilingual (English/Hindi), NCERT-aligned AI mentor that teaches the way each child understands.",
    highlight: "India’s First AI Mentor Personalised to Every Child.",
    Icon: Brain,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "From English Fear, Maths Horror & Science Confusion… to Clarity.",
    subtitle: "AI explains tough topics with visuals, stories, analogies — like the ideal teacher.",
    highlight: "Students: Learn Smarter, Not Harder.",
    Icon: BookOpen,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Your AI Co-Teacher — Plans Lessons, Creates Quizzes, Tracks Progress.",
    subtitle: "NCERT-ready lesson plans, worksheets, rubrics & reports — created in minutes.",
    highlight: "Teachers: Save 10 Hours Every Week.",
    Icon: Users,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Simple, Clear Progress Reports — Without Jargon.",
    subtitle: "Visual strengths, weaknesses, growth charts & weekly summaries — in Hindi or English.",
    highlight: "Parents: Finally Understand Your Child’s Progress.",
    Icon: BarChart3,
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Learn in English or Hindi — Your Choice.",
    subtitle: "AI explains in simple language — no jargon, no judgement.",
    highlight: "India’s First AI Mentor That Speaks Your Language.",
    Icon: Globe,
    gradient: "from-indigo-500 to-purple-500",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = slides[current].Icon;

  return (
    <section className="w-full px-3 sm:px-6 lg:px-10 py-10 sm:py-14 lg:py-20 mt-[-40px] sm:mt-[-60px] overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ------------ TEXT SECTION ------------ */}
          <div className="text-center lg:text-left space-y-6">

         <div className="inline-block bg-[color:var(--green-home-color)] px-4 py-1 rounded-full text-[12px] font-semibold text-white">
  Hinglish Learning • Parent Replay • CBSE/ICSE/State Board
</div>


            <h1 className="text-[30px] sm:text-[38px] lg:text-[46px] xl:text-[52px] font-black text-zinc-900 leading-tight">
              Learn 40–50% Faster.<br />
              Score 20–30% Higher.
            </h1>

            <p className="text-[12px] sm:text-[15px] lg:text-[18px] text-zinc-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              AI-powered clarity for Class 6–10 students — 5-minute micro-lessons, 
              adaptive practice & daily discipline through the <strong>4D Learning System™</strong>.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-3">

              {/* NEW BTN COLOR */}
              <button
                className="text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all text-[12px]"
                style={{ backgroundColor: "var(--green-home-color)" }}
              >
                Claim Free Beta Seat
                <div className="text-[10px] font-light">1000 spots only</div>
              </button>

              <button className="border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-semibold px-6 py-3 rounded-xl flex items-center gap-2 text-[12px] hover:bg-blue-50">
                <PlayCircle className="w-4 h-4" />
                Watch 60-sec Demo
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 text-[11px] text-zinc-600 pt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Bilingual Learning
              </span>

              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Parent Dashboard
              </span>

              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Full Transparency
              </span>
            </div>
          </div>

          {/* ------------ SLIDER SECTION ------------ */}
          <div>
            <div className="relative">
              <div className="bg-white dark:bg-zinc-900/90 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-6 sm:p-8 lg:p-10 overflow-hidden">

                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -40, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-4 text-center lg:text-left"
                  >
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 shadow-inner">
                      <div className={`p-4 rounded-xl bg-gradient-to-br ${slides[current].gradient} shadow-xl`}>
                        <CurrentIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                      </div>
                    </div>

                    <p className="text-[9px] sm:text-[11px] font-bold text-[var(--color-primary)] uppercase tracking-widest">
                      {slides[current].highlight}
                    </p>

                    <h2 className="text-[16px] sm:text-[22px] lg:text-[26px] font-black text-zinc-900 leading-snug">
                      {slides[current].title}
                    </h2>

                    <p className="text-[10px] sm:text-[14px] text-zinc-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                      {slides[current].subtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* ------------ UPDATED SLIDER DOTS ------------ */}
                <div className="flex justify-center gap-2 mt-6">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrent(idx)}
                      className={`transition-all rounded-full ${
                        current === idx
                          ? "w-10 h-2"
                          : "w-2 h-2 hover:w-6"
                      }`}
                      style={{
                        backgroundColor:
                          current === idx
                            ? "var(--green-home-color)"
                            : "#d1d5db",
                      }}
                    />
                  ))}
                </div>

              </div>

              {/* BG BLOBS */}
              <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full blur-3xl -z-10"
                style={{ backgroundColor: "var(--color-primary)", opacity: 0.2 }} />

              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-green-300/20 rounded-full blur-3xl -z-10"></div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
