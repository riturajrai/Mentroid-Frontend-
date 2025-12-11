"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import {
  Camera,
  Brain,
  MessageSquare,
  BookOpen,
  Sparkles,
  BarChart3,
  ClipboardList,
  Bot,
} from "lucide-react";

export default function CoreFeatures() {
  const features = [
    {
      title: "AI Homework Helper",
      desc: "Click a photo → get guided hints, not direct answers. Supports Maths, Science, English & more with whiteboard-style explanations.",
      icon: <Camera />,
    },
    {
      title: "Chanakya Mode (Think, Don't Copy)",
      desc: "No direct answers — only analytical questions. Builds logic, reasoning and deeper understanding like a personal Chanakya.",
      icon: <Brain />,
    },
    {
      title: "AI English Lab",
      desc: "Grammar Guru, SpeakRight AI, English Adda & Confidence Coach. Learn with zero fear — in English or Hindi.",
      icon: <MessageSquare />,
    },
    {
      title: "Smart Summaries & Flashcards",
      desc: "Upload any chapter → get notes, flashcards, quizzes, mind maps & podcasts. Saves 70% study time.",
      icon: <BookOpen />,
    },
    {
      title: "Progress Dashboard",
      desc: "See strengths, weaknesses, accuracy trends, streaks, XP & badges. Adaptive practice auto-fixes weak areas.",
      icon: <BarChart3 />,
    },
    {
      title: "Today's Learning Plan",
      desc: "Your daily personalized plan: 1 lesson, 1 quiz, 1 visual/podcast. Builds consistency automatically.",
      icon: <Sparkles />,
    },
    {
      title: "Teacher Toolkit",
      desc: "Lesson plans, rubrics, worksheets, quizzes & student insights in one click. Saves hours of teacher workload.",
      icon: <ClipboardList />,
    },
    {
      title: "AI Tutor (24/7 Help)",
      desc: "Explains like a human, asks Chanakya-style questions, gives diagrams, visuals & examples anytime you need.",
      icon: <Bot />,
    },
  ];

  // Infinite scroll loop
  const infiniteList = [...features, ...features];

  return (
    <section className="w-full bg-[#F9FAFB] dark:bg-zinc-950 py-20 px-6 md:px-12 flex flex-col items-center">

      {/* Animation Styles */}
      <style>
        {`
          .scroll-container {
            display: flex;
            width: max-content;
            animation: scroll 22s linear infinite;
          }
          .scroll-wrapper:hover .scroll-container {
            animation-play-state: paused;
          }
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      {/* Section Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-12 text-center">
        Core <span className="text-[var(--color-primary)]">Features</span>
      </h2>

      {/* Infinite Scroll Cards */}
      <div className="overflow-hidden w-full scroll-wrapper">
        <div className="scroll-container gap-6 py-4">
          {infiniteList.map((feature, index) => (
            <Card
              key={index}
              className="min-w-[280px] max-w-[280px] rounded-2xl border border-zinc-200 
              dark:border-zinc-800 bg-white dark:bg-zinc-900 
              hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div
                  className="p-3 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center"
                >
                  {React.cloneElement(feature.icon, {
                    className: "w-8 h-8 text-[var(--color-primary)]",
                  })}
                </div>
                <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
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
