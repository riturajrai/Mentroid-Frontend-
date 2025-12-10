"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpenCheck,
  FlaskConical,
  Route,
  ClipboardList,
  Gamepad2,
  Languages,
} from "lucide-react";

export default function LearningUnderstandsYou() {
  const features = [
    {
      id: 1,
      title: "Your Weaknesses Don’t Stay Weak",
      desc: "MentoroidAI detects exactly where you struggle — whether it’s fractions in math or grammar rules — and builds a personalized path to fix them.",
      icon: <BookOpenCheck className="w-7 h-7 text-[var(--color-primary)]" />,
    },
    {
      id: 2,
      title: "Lessons Explained the Way YOU Learn",
      desc: "MentoroidAI adapts explanations using analogies, visuals, Hinglish breakdowns, diagrams, and story-based examples.",
      icon: <FlaskConical className="w-7 h-7 text-[var(--color-primary)]" />,
    },
    {
      id: 3,
      title: "Your Daily Plan, Built Just for You",
      desc: "Daily tasks automatically adjust. Slow day → lighter tasks. Focused day → more challenges.",
      icon: <Route className="w-7 h-7 text-[var(--color-primary)]" />,
    },
    {
      id: 4,
      title: "Revision That Fits Your Attention Span",
      desc: "Topics turn into mini quizzes, summaries, podcasts, flashcards, and even fun mini-games.",
      icon: <ClipboardList className="w-7 h-7 text-[var(--color-primary)]" />,
    },
    {
      id: 5,
      title: "Adaptive Practice That Adjusts to You",
      desc: "Wrong answer → easier questions. Right answer → difficulty increases. Fully personalized.",
      icon: <Gamepad2 className="w-7 h-7 text-[var(--color-primary)]" />,
    },
    {
      id: 6,
      title: "An AI Mentor That Knows You",
      desc: "Whether you learn visually, by listening, or by examples — the AI adapts to your needs.",
      icon: <Languages className="w-7 h-7 text-[var(--color-primary)]" />,
    },
  ];

  return (
    <section className="w-full overflow-hidden py-16 px-4 md:px-10 bg-gradient-to-b from-white to-[var(--color-primary)]/10">
      {/* Heading */}
      <div className="max-w-5xl w-full text-center mx-auto mb-10">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-[#123358] mb-3">
          Learning That Understands You
        </h2>
        <p className="text-[10px] sm:text-sm text-gray-600">
          Personalized solutions for every learner.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((item) => (
          <Card
            key={item.id}
            className="bg-white/80 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-md"
          >
            <CardContent className="flex flex-col items-center text-center space-y-4 p-6">
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-primary)]/10 mb-2">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-[12px] sm:text-sm md:text-base text-[#123358]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
