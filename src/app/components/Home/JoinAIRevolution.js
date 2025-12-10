"use client";

import { Phone, Play, BookOpenCheck, Brain, Sigma, Smile } from "lucide-react";

export default function JoinLearningSection() {
  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* -------- TOP SECTION -------- */}
      <section className="bg-[color:var(--color-primary)] text-white text-center py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-20 w-full">

        <div
          className="
            space-y-6 
            text-[10px]              /* Phone font size */
            sm:text-xl
            md:text-2xl 
            font-semibold 
            leading-relaxed
          "
        >
          <h5
            className="
              text-white 
              text-[14px]            /* Phone */
              sm:text-3xl 
              md:text-5xl 
              font-extrabold
            "
          >
            MentoroidAi Transforms Challenges Into Strengths
          </h5>

          {/* Line 1 */}
          <p className="flex items-center justify-center gap-2 sm:gap-3">
            <Smile className="w-4 h-4 sm:w-7 sm:h-7" />
            <span>
              <span className="font-semibold">From Grammar Fear</span> →{" "}
              <span className="font-semibold">English Cheer!</span>
            </span>
          </p>

          {/* Line 2 */}
          <p className="flex items-center justify-center gap-2 sm:gap-3">
            <Brain className="w-4 h-4 sm:w-7 sm:h-7" />
            <span>
              <span className="font-semibold">From Science Confusion</span> →{" "}
              <span className="font-semibold">Concept Clarity!</span>
            </span>
          </p>

          {/* Line 3 */}
          <p className="flex items-center justify-center gap-2 sm:gap-3">
            <Sigma className="w-4 h-4 sm:w-7 sm:h-7" />
            <span>
              <span className="font-semibold">From Maths Horror</span> →{" "}
              <span className="font-semibold">Logical Power!</span>
            </span>
          </p>

          {/* Line 4 */}
          <p className="flex items-center justify-center gap-2 sm:gap-3">
            <BookOpenCheck className="w-4 h-4 sm:w-7 sm:h-7" />
            <span>
              <span className="font-semibold">From Exam Stress</span> →{" "}
              <span className="font-semibold">Smart Success!</span>
            </span>
          </p>
        </div>
      </section>

      {/* -------- BOTTOM SECTION -------- */}
      <section className="w-full bg-[color:var(--color-primary)] py-16 sm:py-20 px-4 sm:px-6 md:px-12 text-center">
        <div className="max-w-6xl mx-auto">

          <h2
            className="
              text-[14px]           /* Small screen */
              sm:text-4xl 
              md:text-5xl 
              font-extrabold 
              text-white 
              mb-4 sm:mb-6 
              drop-shadow-lg
            "
          >
            Join the AI Learning Revolution
          </h2>

          <p
            className="
              text-[10px]           /* Phone */
              sm:text-lg 
              md:text-xl 
              opacity-90 
              max-w-2xl 
              mx-auto 
              mb-8 sm:mb-12
              text-white
            "
          >
            Education meets Intelligence. Empower your classroom, your students, your future.
          </p>

          {/* ------ Input Row ------ */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-7 max-w-4xl mx-auto">

            {/* Button */}
            <button className="flex items-center justify-center gap-2 bg-[#0A0E1A] hover:bg-zinc-900 text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-2xl shadow-lg transition-all duration-300 w-full md:w-auto text-[10px] sm:text-base">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
              Start Learning Free
            </button>

            {/* Name Input */}
            <input
              type="text"
              placeholder="Enter your name"
              className="
                w-full 
                md:w-80 
                p-2.5 sm:p-3 
                rounded-2xl 
                outline-none 
                border-none 
                text-gray-800 
                placeholder-gray-500 
                focus:ring-2 
                focus:ring-white 
                shadow-md
                text-[10px] sm:text-base
              "
            />

            {/* Phone Input */}
            <div className="relative w-full md:w-60">
              <Phone className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <input
                type="text"
                placeholder="Phone number"
                className="
                  w-full 
                  p-2.5 sm:p-3 
                  pl-10 
                  rounded-2xl 
                  outline-none 
                  border-none 
                  text-gray-800 
                  placeholder-gray-500 
                  focus:ring-2 
                  focus:ring-white 
                  shadow-md
                  text-[10px] sm:text-base
                "
              />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
