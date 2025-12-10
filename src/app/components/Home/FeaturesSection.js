"use client";

import React, { useState } from "react";
import {
  Camera,
  MessageSquareQuote,
  Languages,
  FileText,
  Gauge,
  Calendar,
  PenTool,
  ClipboardList,
  Lightbulb,
  Sparkles,
  Gamepad,
  BookOpen,
  Users,
  Target,
} from "lucide-react";

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState("students");

  const featuresData = {
    students: [
      {
        icon: <Camera className="w-7 h-7 text-[var(--color-primary)]" />,
        title: "AI Homework Helper (Photo → Steps)",
        desc: "Click a photo → get guided hints & steps. Helps in Maths, Science & English.",
      },
      {
        icon: <MessageSquareQuote className="w-7 h-7 text-[var(--color-primary)]" />,
        title: "Chanakya Mode",
        desc: "Teaches how to think instead of copying direct answers.",
      },
      {
        icon: <Languages className="w-7 h-7 text-[var(--color-primary)]" />,
        title: "AI English Lab",
        desc: "Grammar Guru, Speaking Coach & Pronunciation Trainer.",
      },
      {
        icon: <FileText className="w-7 h-7 text-[var(--color-primary)]" />,
        title: "Smart Summaries",
        desc: "Upload any chapter → get notes, flashcards & quizzes instantly.",
      },
      {
        icon: <Gauge className="w-7 h-7 text-[var(--color-primary)]" />,
        title: "Progress Dashboard",
        desc: "Track strengths, weak areas, accuracy trends & streaks.",
      },
      {
        icon: <Calendar className="w-7 h-7 text-[var(--color-primary)]" />,
        title: "Daily Personalized Plan",
        desc: "Daily lessons, quick quizzes & streak tracking.",
      },
    ],

    teachers: [
      {
        icon: <PenTool className="w-7 h-7 text-[var(--color-primary)]" />,
        title: "Teacher Toolkit",
        desc: "Generate lesson plans, rubrics, worksheets & activities.",
      },
      {
        icon: <ClipboardList className="w-7 h-7 text-[var(--color-primary)]" />,
        title: "Track Student Progress",
        desc: "AI analytics showing chapter-wise performance.",
      },
      {
        icon: <Lightbulb className="w-7 h-7 text-[var(--color-primary)]" />,
        title: "Smart Teaching Aids",
        desc: "Visual aids & bilingual explanations.",
      },
      {
        icon: <Sparkles className="w-7 h-7 text-[var(--color-primary)]" />,
        title: "AI Suggestions",
        desc: "Recommends custom lessons based on student behavior.",
      },
      {
        icon: <Gamepad className="w-7 h-7 text-[var(--color-primary)]" />,
        title: "Interactive Classes",
        desc: "Gamified teaching tools for engagement.",
      },
      {
        icon: <BookOpen className="w-7 h-7 text-[var(--color-primary)]" />,
        title: "Curriculum Support",
        desc: "Aligned with CBSE, ICSE & state boards.",
      },
    ],

    parents: [
      {
        icon: <Users className="w-7 h-7 text-[var(--color-primary)]" />,
        title: "Monitor Learning",
        desc: "See real-time learning insights of your child.",
      },
      {
        icon: <Target className="w-7 h-7 text-[var(--color-primary)]" />,
        title: "AI Progress Reports",
        desc: "Weekly reports with strengths & improvements.",
      },
      {
        icon: <Lightbulb className="w-7 h-7 text-[var(--color-primary)]" />,
        title: "Smart Notifications",
        desc: "Reminders for lessons, tests & milestones.",
      },
      {
        icon: <Sparkles className="w-7 h-7 text-[var(--color-primary)]" />,
        title: "Balanced Screen Time",
        desc: "Tracks usage & maintains a healthy balance.",
      },
      {
        icon: <Gamepad className="w-7 h-7 text-[var(--color-primary)]" />,
        title: "Gamified Rewards",
        desc: "Stars, XP & badges for motivation.",
      },
      {
        icon: <Languages className="w-7 h-7 text-[var(--color-primary)]" />,
        title: "Bilingual Parent Portal",
        desc: "All reports in Hindi & English.",
      },
    ],
  };

  const features = featuresData[activeTab];

  return (
    <section
      id="features"
      className="w-full bg-gradient-to-b from-white to-[var(--color-primary)]/10 py-14 sm:py-20 px-4 sm:px-8"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-[#123358] mb-12">
          Who We Empower
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mb-12">
          {["students", "teachers", "parents"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 sm:px-7 sm:py-3 rounded-full font-semibold 
                text-[10px] sm:text-xs md:text-sm transition-all duration-300
                ${
                  activeTab === tab
                    ? "bg-[var(--color-primary)] text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 border border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)]/10"
                }
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white border border-[var(--color-primary)]/20 rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="mb-4 p-3 w-fit rounded-lg bg-[var(--color-primary)]/10 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>

              <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#123358] group-hover:text-[var(--color-primary)] transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-600 text-[10px] sm:text-sm md:text-base leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
