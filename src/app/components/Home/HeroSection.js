"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Brain,
  BookOpen,
  Users,
  BarChart3,
  Globe,
  PlayCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const slides = [
  {
    title: "Every Child Learns Differently. MentoroidAI Learns Your Child.",
    subtitle:
      "Adaptive, bilingual (English/Hindi), NCERT-aligned AI mentor that teaches the way each child understands.",
    highlight: "India’s First AI Mentor Personalised to Every Child.",
    Icon: Brain,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "From English Fear, Maths Horror & Science Confusion… to Clarity.",
    subtitle:
      "AI explains tough topics with visuals, stories, analogies — like the ideal teacher.",
    highlight: "Students: Learn Smarter, Not Harder.",
    Icon: BookOpen,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Your AI Co-Teacher — Plans Lessons, Creates Quizzes, Tracks Progress.",
    subtitle:
      "NCERT-ready lesson plans, worksheets, rubrics & reports — created in minutes.",
    highlight: "Teachers: Save 10 Hours Every Week.",
    Icon: Users,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Simple, Clear Progress Reports — Without Jargon.",
    subtitle:
      "Visual strengths, weaknesses, growth charts & weekly summaries — in Hindi or English.",
    highlight: "Parents: Finally Understand Your Child’s Progress.",
    Icon: BarChart3,
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Learn in English or Hindi — Your Choice.",
    subtitle:
      "AI explains in simple language — no jargon, no judgement.",
    highlight: "India’s First AI Mentor That Speaks Your Language.",
    Icon: Globe,
    gradient: "from-indigo-500 to-purple-500",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = slides[current].Icon;

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 mt-[-40px] sm:mt-[-60px]">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-visible">

        {/* ------------ LEFT TEXT ------------ */}
        <div className="text-center lg:text-left space-y-6">

          <Badge className="bg-[var(--green-home-color)] text-white py-1 px-4 rounded-full text-[12px]">
            Hinglish Learning • Parent Replay • CBSE/ICSE/State Board
          </Badge>

          <h1 className="text-[30px] sm:text-[38px] lg:text-[48px] font-black leading-tight text-zinc-900">
            Learn 40–50% Faster.<br />Score 20–30% Higher.
          </h1>

          <p className="text-[12px] sm:text-[15px] lg:text-[18px] text-zinc-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            AI-powered clarity for Class 6–10 students — 5-minute micro-lessons,  
            adaptive practice & daily discipline through the  
            <strong> 4D Learning System™</strong>.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-3 justify-center lg:justify-start">

            <Button
              className="text-white font-semibold px-6 py-3 rounded-xl text-[13px] shadow-md"
              style={{ backgroundColor: "var(--green-home-color)" }}
              size="lg"
            >
              Claim Free Beta Seat
            </Button>

            <Button
              variant="outline"
              className="border-[var(--color-primary)] text-[var(--color-primary)] text-[13px] px-6 py-3 flex items-center gap-2"
              size="lg"
            >
              <PlayCircle className="w-4 h-4" />
              Watch 60-sec Demo
            </Button>
          </div>

          {/* Features */}
          <div className="flex items-center justify-center lg:justify-start gap-4 text-[11px] text-zinc-600 pt-1">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" /> Bilingual Learning
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" /> Parent Dashboard
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" /> Full Transparency
            </span>
          </div>

        </div>

        {/* ------------ RIGHT SLIDER ------------ */}
        <div className="relative w-full">

          {/* Chakra-Style Card (slight radius + soft shadow) */}
          <Card className="shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-zinc-200 rounded-2xl overflow-hidden relative z-20">
            <CardContent className="p-8">

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.55 }}
                  className="space-y-4 text-center lg:text-left"
                >
                  {/* Icon */}
                  <div className="inline-flex p-4 rounded-2xl bg-zinc-100 shadow-inner">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${slides[current].gradient} shadow-xl`}>
                      <CurrentIcon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <p className="text-[10px] sm:text-[12px] font-bold text-[var(--color-primary)] uppercase tracking-widest">
                    {slides[current].highlight}
                  </p>

                  <h2 className="text-[18px] sm:text-[22px] lg:text-[26px] font-bold text-zinc-900 leading-snug">
                    {slides[current].title}
                  </h2>

                  <p className="text-[12px] sm:text-[14px] text-zinc-600">
                    {slides[current].subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Slider Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`transition-all rounded-full ${
                      current === idx ? "w-10 h-2" : "w-2 h-2 hover:w-6"
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

            </CardContent>
          </Card>

          {/* ---- GLOW FIX (Overflow Removed) ---- */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-[var(--color-primary)]/20 blur-3xl rounded-full -z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-300/30 blur-3xl rounded-full -z-10 pointer-events-none"></div>

        </div>
      </div>
    </section>
  );
}

