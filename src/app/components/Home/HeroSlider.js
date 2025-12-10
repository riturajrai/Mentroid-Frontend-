"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// SHADCN UI
import { Card, CardContent } from "@/components/ui/card";

// Lucide Icons
import { Brain, Target, BarChart3, Lightbulb } from "lucide-react";

const ChildFeaturesSlider = () => {
  const slides = [
    {
      title: "Adaptive Practice",
      description:
        "Smart quizzes & flashcards tailor learning to each child's level for maximum growth.",
      icon: <Target className="text-[var(--color-primary)] w-7 h-7" />,
    },
    {
      title: "Concept Clarity",
      description:
        "AI explains concepts using visuals, real-life examples & child-friendly language.",
      icon: <Lightbulb className="text-[var(--color-primary)] w-7 h-7" />,
    },
    {
      title: "Personalized Feedback",
      description:
        "Clear strengths, weaknesses & weekly improvement tips for every chapter.",
      icon: <Brain className="text-[var(--color-primary)] w-7 h-7" />,
    },
    {
      title: "Progress Tracking",
      description:
        "Beautiful growth charts show progress in English or Hindi — updated daily.",
      icon: <BarChart3 className="text-[var(--color-primary)] w-7 h-7" />,
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto slide every 3 secs
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className="w-full flex flex-col items-center py-12 sm:py-16 px-4">

      {/* Title */}
      <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-center text-[#123358] mb-6 sm:mb-10 leading-snug">
        What MentoroidAI Does for Your Child
      </h2>

      {/* MAIN CARD */}
      <Card className="
        w-full max-w-4xl 
        min-h-[200px] sm:min-h-[250px] md:min-h-[280px]
        rounded-2xl shadow-xl border border-gray-200 bg-white
      ">
        <CardContent className="flex items-center justify-center h-full p-6 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center space-y-3 sm:space-y-5"
            >
              {/* Icon */}
              <div className="p-3 rounded-full bg-[var(--btn-home-color)]/[0.3]">
                {slide.icon}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-[#123358] text-sm sm:text-xl md:text-2xl">
                {slide.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-xs sm:text-sm md:text-lg leading-relaxed max-w-2xl">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* DOTS */}
      <div className="flex gap-2 sm:gap-3 justify-center mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 sm:h-3 rounded-full transition-all ${
              current === index
                ? "w-6 sm:w-8 bg-[var(--green-home-color)]"
                : "w-2 sm:w-3 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ChildFeaturesSlider;
