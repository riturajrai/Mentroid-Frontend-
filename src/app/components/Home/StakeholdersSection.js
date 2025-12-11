"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, HeartHandshake, Gamepad2 } from "lucide-react";

export default function StakeholdersSection() {
  const iconColor = "text-white";

  const features = [
    {
      id: 1,
      title: "Personalised Intelligence",
      desc: "Adaptive learning paths tailored to every student’s pace and style.",
      icon: <Brain className={`w-12 h-12 ${iconColor}`} />,
    },
    {
      id: 2,
      title: "Human-Like Support",
      desc: "Meaningful feedback that guides students, not just scores them.",
      icon: <HeartHandshake className={`w-12 h-12 ${iconColor}`} />,
    },
    {
      id: 3,
      title: "Motivation That Lasts",
      desc: "Gamified, bilingual, stress-free learning to keep learners engaged.",
      icon: <Gamepad2 className={`w-12 h-12 ${iconColor}`} />,
    },
  ];

  return (
    <section className="w-full bg-[color:var(--color-primary)] py-20 px-6 md:px-12 text-center">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
          One Platform. Total Clarity.
          Real Confidence. Complete Transparency.
        </h2>

        <p className="text-zinc-200 mb-16 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
          MentoroidAI makes learning clear, measurable, and joyful for every child.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md 
              rounded-2xl p-8 shadow-md hover:shadow-xl hover:scale-[1.05] transition-all border border-white/20"
            >
              <CardContent className="flex flex-col items-center text-center space-y-6">
                <div className="flex items-center justify-center bg-white/20 rounded-full p-6 shadow-inner mb-2">
                  {feature.icon}
                </div>
                <h3 className="text-white font-semibold text-xl">{feature.title}</h3>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xs">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
