"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Gamepad2, Lightbulb } from "lucide-react";

export default function WhyMentoroidWorks() {
  const features = [
    {
      id: 1,
      title: "Personalised Paths",
      desc: "AI adapts lessons, quizzes & pace based on your learning pattern.",
      icon: <Target />,
    },
    {
      id: 2,
      title: "Fun, Not Fear",
      desc: "Quests, badges, and streaks make learning addictive — not stressful.",
      icon: <Gamepad2 />,
    },
    {
      id: 3,
      title: "Feedback That Teaches",
      desc: "AI explains why you made an error, helping you truly master topics.",
      icon: <Lightbulb />,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-white to-[var(--color-primary)]/10 py-16 md:py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#123358]">
            Why MentoroidAI Works
          </h2>
          <p className="mt-3 text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            A blend of personalization, motivation, and intelligent feedback — built for real learning.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((item) => (
            <Card
              key={item.id}
              className="group rounded-2xl border border-[var(--color-primary)]/20 p-5 sm:p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <CardContent className="flex flex-col items-center text-center space-y-4 p-0">
                {/* Icon */}
                <div className="mb-4 p-3 w-fit rounded-lg bg-[var(--color-primary)]/10 group-hover:scale-110 transition-transform">
                  {React.cloneElement(item.icon, {
                    className: "w-7 h-7 text-[var(--color-primary)]",
                  })}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#123358] group-hover:text-[var(--color-primary)] transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-[10px] sm:text-sm md:text-base leading-relaxed">
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
