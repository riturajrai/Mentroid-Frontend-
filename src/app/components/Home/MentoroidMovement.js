"use client";

import { useEffect, useRef, useState } from "react";
import { Brain, Building2, TrendingUp, Globe2 } from "lucide-react";

export default function MentoroidMovement() {
  const stats = [
    {
      id: 1,
      number: 49980,
      label: "AI tutoring sessions delivered",
      icon: <Brain className="w-6 h-6 text-white" />,
    },
    {
      id: 2,
      number: 240,
      label: "Partnered schools & institutes",
      icon: <Building2 className="w-6 h-6 text-white" />,
    },
    {
      id: 3,
      number: 60,
      label: "Students showed improvement",
      icon: <TrendingUp className="w-6 h-6 text-white" />,
    },
  ];

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full
        bg-[color:var(--color-primary)]
        py-20 px-6 md:px-12 text-center"
    >
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
          A New Way of Learning for India — Coming Soon
        </h2>

        <p className="text-lg md:text-xl font-bold text-white mb-16">
          Building India’s AI-Powered Learning Future — Launching January 2025.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {stats.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              
              {/* Animated Number */}
              <AnimatedNumber
                target={item.number}
                isVisible={isVisible}
                suffix={item.id === 1 ? "+" : item.id === 2 ? "+" : item.id === 3 ? "%" : ""}
              />

              <div className="flex items-center gap-2 text-white mt-2">
                {item.icon}
                <p className="text-lg">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Language Info */}
        <div className="flex flex-col items-center justify-center text-white">
          <div className="flex items-center gap-2 text-lg font-semibold mb-1">
            <Globe2 className="w-6 h-6 text-white" />
            <span>
              2 Languages • <span className="text-white font-bold">English + Hindi</span>
            </span>
          </div>
          <p className="text-sm opacity-80">CBSE, ICSE & State Boards</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------
    Animated Number Component
--------------------------------*/
function AnimatedNumber({ target, isVisible, suffix = "" }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 1500; // 1.5 sec
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        clearInterval(counter);
        setValue(target);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [isVisible, target]);

  return (
    <p className="text-5xl font-bold text-white">
      {value.toLocaleString()}
      {suffix}
    </p>
  );
};
