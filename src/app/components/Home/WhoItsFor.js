"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Presentation, Building2, Heart } from "lucide-react";

export default function WhoItsFor() {
  const cards = [
    {
      title: "Students",
      desc: "AI makes every subject fun, personalised, and exam-ready.",
      icon: <GraduationCap className="w-8 h-8 text-[var(--color-primary)]" />,
      border: "border-[var(--color-primary)]",
      bg: "bg-[var(--color-primary)]/10 dark:bg-[var(--color-primary)]/20",
    },
    {
      title: "Teachers",
      desc: "Save hours with AI lesson prep & student analytics.",
      icon: <Presentation className="w-8 h-8 text-amber-500" />,
      border: "border-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      title: "Schools / Coaching",
      desc: "Personalised dashboards, real-time insights & better results.",
      icon: <Building2 className="w-8 h-8 text-sky-500" />,
      border: "border-sky-400",
      bg: "bg-sky-50 dark:bg-sky-900/20",
    },
    {
      title: "Parents",
      desc: "Track progress, strengths, and engagement — with clarity.",
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      border: "border-pink-400",
      bg: "bg-pink-50 dark:bg-pink-900/20",
    },
  ];

  return (
    <section className="w-full bg-[#F9FAFB] dark:bg-zinc-950 py-20 px-6 md:px-12 flex flex-col items-center">
      <div className="w-full text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-12">
          Who <span className="text-[var(--color-primary)]">It’s For</span>
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <Card
              key={index}
              className={`rounded-2xl border ${card.border} p-6 flex flex-col items-start text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
            >
              <CardContent className="flex flex-col items-start space-y-4 p-0">
                {/* Icon */}
                <div className={`p-3 rounded-xl mb-2 flex items-center justify-center ${card.bg}`}>
                  {card.icon}
                </div>

                {/* Title */}
                <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
