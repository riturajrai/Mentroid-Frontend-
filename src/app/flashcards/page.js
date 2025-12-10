"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Sparkles, ChevronRight, CheckCircle2 } from "lucide-react";

const subjects = [
  { id: 1, name: "Biology", color: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200", icon: "🧬" },
  { id: 2, name: "Physics", color: "bg-blue-50 hover:bg-blue-100 border-blue-200", icon: "⚡" },
  { id: 3, name: "Chemistry", color: "bg-rose-50 hover:bg-rose-100 border-rose-200", icon: "⚗️" },
  { id: 4, name: "Mathematics", color: "bg-amber-50 hover:bg-amber-100 border-amber-200", icon: "📐" },
  { id: 5, name: "Geography", color: "bg-purple-50 hover:bg-purple-100 border-purple-200", icon: "🌍" },
  { id: 6, name: "History", color: "bg-orange-50 hover:bg-orange-100 border-orange-200", icon: "📜" },
];

export default function Flashcard({ setActive, setFlashData }) {
  const router = useRouter();

  const [selectedSubject, setSelectedSubject] = useState("");
  const [topicText, setTopicText] = useState("");
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const isReady = selectedSubject && topicText.trim().length > 10;

  // ---------------------------------------------------------
  // ⭐ Generate Flashcards + Navigate to FlashcardList Page
  // ---------------------------------------------------------
  const handleGenerate = async () => {
    if (!isReady) return;

    setLoading(true);

    try {
      const res = await fetch("/api/flashcards/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic_text: topicText,
          subject: selectedSubject,
          num_cards: 10,
          difficulty: "medium",
          card_type: "mixed",
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Flashcard generation failed!");
        setLoading(false);
        return;
      }

      router.push(
        `/flashcards/result?data=${encodeURIComponent(JSON.stringify(data.flashcards))}`
      );
      

    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  // ---------------------------------------------------------
  // ⭐ Press ENTER to generate flashcards
  // ---------------------------------------------------------
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-8 md:px-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#173837] rounded-2xl flex items-center justify-center mx-auto shadow-lg mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[#173837]">Generate Flashcards</h1>
          <p className="text-slate-600 text-lg mt-2">
            Transform your notes into interactive flashcards instantly
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-slate-200">
          
          {/* Subject Selection */}
          <h2 className="text-xl font-bold text-[#173837] mb-4">Choose Your Subject</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mb-8">
            {subjects.map((s) => (
              <button 
                key={s.id}
                onClick={() => setSelectedSubject(s.name)}
                className={`p-5 rounded-2xl border-2 ${s.color}
                  ${selectedSubject === s.name ? "border-[#173837] shadow-md scale-105" : "border-transparent"}
                  transition-all duration-300`}
              >
                <div className="text-3xl mb-1">{s.icon}</div>
                <div className="font-semibold">{s.name}</div>
              </button>
            ))}
          </div>

          {/* Topic Input */}
          <h2 className="text-xl font-bold text-[#173837] mb-3">Enter Your Topic</h2>

          <textarea
            value={topicText}
            onChange={(e) => {
              setTopicText(e.target.value);
              setCharCount(e.target.value.length);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Paste text here... (Press Enter to generate)"
            className="w-full min-h-[180px] p-5 border-2 border-slate-200 rounded-2xl focus:border-[#173837] outline-none resize-none"
          />

          <div className="text-right text-sm text-slate-500 mt-1">{charCount} characters</div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!isReady || loading}
            className={`mt-6 w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 
            ${isReady ? "bg-[#173837] text-white hover:bg-[#1f4947]" : "bg-slate-300 text-slate-500"}
            transition-all duration-300 shadow-lg`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Flashcards
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}
 