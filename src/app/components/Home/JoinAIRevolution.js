"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Play, BookOpenCheck, Brain, Sigma, Smile } from "lucide-react";

export default function JoinLearningSection() {
  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* -------- TOP SECTION -------- */}
      <section className="bg-[color:var(--color-primary)] text-white text-center py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-20 w-full">
        <div className="space-y-6 text-[10px] sm:text-xl md:text-2xl font-semibold leading-relaxed">
          <h5 className="text-white text-[14px] sm:text-3xl md:text-5xl font-extrabold">
            MentoroidAI Transforms Challenges Into Strengths
          </h5>

          {[
            { icon: <Smile />, text: "From Grammar Fear → English Cheer!" },
            { icon: <Brain />, text: "From Science Confusion → Concept Clarity!" },
            { icon: <Sigma />, text: "From Maths Horror → Logical Power!" },
            { icon: <BookOpenCheck />, text: "From Exam Stress → Smart Success!" },
          ].map((item, idx) => (
            <p key={idx} className="flex items-center justify-center gap-2 sm:gap-3">
              {React.cloneElement(item.icon, { className: "w-4 h-4 sm:w-7 sm:h-7 text-white" })}
              <span className="font-semibold">{item.text.split("→")[0]}</span> →{" "}
              <span className="font-semibold">{item.text.split("→")[1]}</span>
            </p>
          ))}
        </div>
      </section>

      {/* -------- BOTTOM SECTION -------- */}
      <section className="w-full bg-[color:var(--color-primary)] py-16 sm:py-20 px-4 sm:px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-8">

          <h2 className="text-[14px] sm:text-4xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6 drop-shadow-lg">
            Join the AI Learning Revolution
          </h2>

          <p className="text-[10px] sm:text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8 sm:mb-12 text-white">
            Education meets Intelligence. Empower your classroom, your students, your future.
          </p>

          <Card className="p-6 md:p-8 bg-white/10 backdrop-blur-md border border-white/20 
            shadow-lg rounded-2xl flex flex-col md:flex-row items-center justify-center gap-5 md:gap-7">

            {/* Start Learning Button */}
            <Button className="flex items-center gap-2 bg-[#0A0E1A] hover:bg-zinc-900 
              text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 w-full md:w-auto rounded-xl">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
              Start Learning Free
            </Button>

            {/* Name Input */}
            <Input
              type="text"
              placeholder="Enter your name"
              className="
                w-full md:w-72 
                p-3 rounded-xl
                bg-white/10 border border-white/20 
                text-white placeholder-white/70
                focus:ring-2 focus:ring-white
              "
            />

            {/* Phone Input */}
            <div className="relative w-full md:w-60">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />

              <Input
                type="text"
                placeholder="Phone number"
                className="
                  w-full pl-12 p-3 rounded-xl
                  bg-white/10 border border-white/20 
                  text-white placeholder-white/70
                  focus:ring-2 focus:ring-white
                "
              />
            </div>

          </Card>
        </div>
      </section>
    </div>
  );
}
