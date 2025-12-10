"use client";

import { useState, useEffect } from "react";
import { School, GraduationCap, BookOpen } from "lucide-react";

const testimonials = [
  {
    id: 1,
    icon: <School className="w-12 h-12 text-[var(--color-primary)]" />,
    quote: "Coming January 2025",
    name: "",
    location: "",
  },
  {
    id: 2,
    icon: <GraduationCap className="w-12 h-12 text-amber-500" />, // keep amber as accent
    quote: "Coming January 2025",
    name: "",
    location: "",
  },
  {
    id: 3,
    icon: <BookOpen className="w-12 h-12 text-blue-500" />, // keep blue as accent
    quote: "Coming January 2025",
    name: "",
    location: "",
  },
];

export default function CommunitySlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % testimonials.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-16 px-4 sm:px-8 text-center">
      <h4 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        Why Schools and Coaching Institutes Are Excited About MentoroidAI
      </h4>

      <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-10">
        Voices from Teachers, Parents & Students Joining Our Pilot Program
      </h3>

      {/* Testimonial Card */}
      <div
        key={testimonials[current].id}
        className="max-w-2xl mx-auto bg-gradient-to-br from-[var(--color-primary)]/10 to-orange-50
                   p-8 md:p-10 rounded-2xl shadow-md transition-all duration-700 ease-in-out
                   hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="flex justify-center mb-4">
          {testimonials[current].icon}
        </div>

        <p className="text-lg md:text-xl italic text-gray-700 mb-6 leading-relaxed">
          "{testimonials[current].quote}"
        </p>

        {/* Empty fields (hidden) */}
        {testimonials[current].name && (
          <div className="flex flex-col items-center">
            <h4 className="text-lg font-bold text-gray-900">
              {testimonials[current].name}
            </h4>
            <p className="text-gray-500 text-sm">{testimonials[current].location}</p>
          </div>
        )}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === current ? "bg-[var(--color-primary)] w-5" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
