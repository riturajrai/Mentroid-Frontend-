"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Compass, BookOpen, FileText, Users, GraduationCap } from "lucide-react";

export default function ChildFeatures() {
  const features = [
    {
      id: 1,
      icon: <Activity className="w-6 h-6 text-primary" />,
      title: "AI Homework Helper",
      description: "Step-by-step hints that build understanding, not copying.",
    },
    {
      id: 2,
      icon: <Compass className="w-6 h-6 text-primary" />,
      title: "Chanakya Mode",
      description: "AI that asks guiding questions to build reasoning.",
    },
    {
      id: 3,
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      title: "English Lab",
      description: "Tools for grammar, writing, speaking & fluency.",
    },
    {
      id: 4,
      icon: <FileText className="w-6 h-6 text-primary" />,
      title: "Smart Notes",
      description: "Auto-generated summaries, flashcards, mind maps, audio lessons.",
    },
    {
      id: 5,
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Parent Dashboard",
      description: "Full visibility: time spent, topics covered, strengths & weaknesses.",
    },
    {
      id: 6,
      icon: <GraduationCap className="w-6 h-6 text-primary" />,
      title: "Teacher Toolkit",
      description: "Homework generators, quizzes, worksheets, class heatmaps.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
          What Your Child Gets
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card
            key={feature.id}
            className="rounded-xl shadow-sm hover:shadow-lg border border-gray-200 transition-all duration-300"
          >
            <CardContent className="flex flex-col text-left p-6 space-y-4">
              <div className="flex items-center gap-3">
                {feature.icon}
                <h3 className="text-lg font-semibold text-primary">{feature.title}</h3>
              </div>
              <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
