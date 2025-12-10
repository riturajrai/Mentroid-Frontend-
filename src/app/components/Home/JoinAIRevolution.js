"use client";

import { Phone, Play, BookOpenCheck, Brain, Sigma, Smile } from "lucide-react";

export default function JoinLearningSection() {
  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* -------- TOP GRADIENT TEXT SECTION -------- */}
      <section className="bg-gradient-to-r from-[#1E466D] via-[#245F59] to-[#2F6E49] text-white text-center py-20 px-4 sm:px-6 md:px-10 lg:px-20 w-full">
        <div className="space-y-8 text-xl sm:text-2xl md:text-3xl font-semibold leading-relaxed">

          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold">
            MentoroidAi Transforms Challenges Into Strengths
          </h1>

          {/* Line 1 */}
          <p className="flex items-center justify-center gap-3 text-white">
            <Smile className="w-7 h-7 text-white" />
            <span>
              <span className="text-white font-semibold">From Grammar Fear</span> →{" "}
              <span className="text-white font-semibold">English Cheer!</span>
            </span>
          </p>

          {/* Line 2 */}
          <p className="flex items-center justify-center gap-3 text-white">
            <Brain className="w-7 h-7 text-white" />
            <span>
              <span className="text-white font-semibold">From Science Confusion</span> →{" "}
              <span className="text-white font-semibold">Concept Clarity!</span>
            </span>
          </p>

          {/* Line 3 */}
          <p className="flex items-center justify-center gap-3 text-white">
            <Sigma className="w-7 h-7 text-white" />
            <span>
              <span className="text-white font-semibold">From Maths Horror</span> →{" "}
              <span className="text-white font-semibold">Logical Power!</span>
            </span>
          </p>

          {/* Line 4 */}
          <p className="flex items-center justify-center gap-3 text-white">
            <BookOpenCheck className="w-7 h-7 text-white" />
            <span>
              <span className="text-white font-semibold">From Exam Stress</span> →{" "}
              <span className="text-white font-semibold">Smart Success!</span>
            </span>
          </p>

        </div>
      </section>

      {/* -------- BOTTOM GRADIENT SECTION -------- */}
      <section className="w-full bg-gradient-to-r from-[#1E466D] via-[#245F59] to-[#2F6E49] py-20 px-6 md:px-12 text-center">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
            Join the AI Learning Revolution
          </h2>

          <p className="text-white text-base sm:text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-12">
            Education meets Intelligence. Empower your classroom, your students, your future.
          </p>

          {/* ------ Input Row ------ */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-7 max-w-4xl mx-auto">

            {/* Button */}
            <button className="flex items-center justify-center gap-2 bg-[#0A0E1A] hover:bg-zinc-900 text-white font-semibold py-3 px-8 rounded-2xl shadow-lg transition-all duration-300 w-full md:w-auto">
              <Play className="w-5 h-5 text-yellow-300" />
              Start Learning Free
            </button>

            {/* Name Input */}
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full md:w-80 p-3 rounded-2xl outline-none border-none text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-white shadow-md"
            />

            {/* Phone Input */}
            <div className="relative w-full md:w-60">
              <Phone className="absolute left-3 top-3.5 w-5 h-5 text-white" />
              <input
                type="text"
                placeholder="Phone number"
                className="w-full p-3 pl-10 rounded-2xl outline-none border-none text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-white shadow-md"
              />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
