"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ChildFeaturesSlider = () => {
  const slides = [
    {
      title: "Adaptive Practice",
      description:
        "Smart quizzes & flashcards tailor learning to the child's level. Every practice session is optimized for maximum growth.",
    },
    {
      title: "Concept Clarity",
      description:
        "AI explains every topic using visuals, examples and simple language—ensuring deep understanding.",
    },
    {
      title: "Personalized Feedback",
      description:
        "Get clear strengths, weaknesses, and improvement suggestions for every chapter and topic.",
    },
    {
      title: "Progress Tracking",
      description:
        "Beautiful, easy-to-read growth charts show improvement every week in Hindi or English.",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = slides[current];

  return (
    <div className="w-full flex flex-col items-center py-12 sm:py-16 px-4">

      {/* Title */}
      <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-center text-[#123358] mb-6 sm:mb-10 leading-snug">
        What MentoroidAI Does for Your Child
      </h2>

      {/* Slider Card */}
      <div className="
        w-full 
        max-w-4xl 
        min-h-[180px] sm:min-h-[230px] md:min-h-[260px] 
        bg-white 
        shadow-md sm:shadow-lg 
        border border-gray-200 
        rounded-xl 
        p-5 sm:p-10
        flex 
        items-center 
        justify-center
      ">

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-3 sm:space-y-4 px-2"
          >
            <h3 className="font-semibold text-[#123358] 
              text-[12px] sm:text-lg md:text-2xl"
            >
              {currentSlide.title}
            </h3>

            <p className="
              text-gray-600 
              text-[10px] sm:text-sm md:text-lg 
              leading-relaxed"
            >
              {currentSlide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex gap-2 sm:gap-3 justify-center mt-5 sm:mt-6">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 sm:h-3 rounded-full transition-all ${
              current === idx
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
