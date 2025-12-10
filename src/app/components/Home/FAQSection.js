"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    { 
      question: "Will this actually improve my child's marks?", 
      answer: "Yes! MentoroidAI adapts to your child's learning style and identifies weak areas for targeted improvement." 
    },
    { 
      question: "Does this replace school or tuition?", 
      answer: "No, it complements school learning and tuition by providing personalized AI-guided practice and feedback." 
    },
    { 
      question: "Is MentoroidAI safe for children?", 
      answer: "Absolutely. The platform is designed with child safety in mind, and data is fully secure." 
    },
    { 
      question: "My child struggles with English. Will this still help?", 
      answer: "Yes, MentoroidAI is bilingual (English + Hindi) and adapts content to your child's language preference." 
    },
    { 
      question: "How does the AI detect my child's weak areas?", 
      answer: "Through interactive quizzes, uploaded notes, and response patterns, the AI identifies topics needing improvement." 
    },
    { 
      question: "How will I track my child's progress?", 
      answer: "You get detailed reports, milestones, and suggestions to monitor and improve learning outcomes." 
    },
    { 
      question: "Will my child actually use this every day?", 
      answer: "Yes, with personalized content, gamification, and adaptive learning, daily engagement is encouraged." 
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-zinc-900 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
            >
              <button
                className="w-full flex justify-between items-center p-4 text-left text-gray-800 font-medium hover:bg-gray-100 transition"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-[var(--color-primary)]" />
                ) : (
                  <Plus className="w-5 h-5 text-[var(--color-primary)]" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-600 text-sm md:text-base">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
