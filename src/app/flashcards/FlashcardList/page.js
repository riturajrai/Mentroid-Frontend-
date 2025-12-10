"use client";
import { useState } from "react";
import FlashcardItem from "../../components/FlashcardItem";
import { BookOpen, Sparkles, Download, Filter, Search, Grid3x3, LayoutList } from "lucide-react";

export default function FlashcardList({ flashData = [] }) {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Color palette for cards
  const colorPalette = [
    "bg-emerald-400",   // dark pastel green
    "bg-blue-400",      // dark pastel blue
    "bg-rose-400",      // dark pastel rose
    "bg-amber-400",     // dark pastel yellow/orange
    "bg-purple-400",    // dark pastel purple
    "bg-orange-400",    // dark pastel orange
    "bg-cyan-400",      // dark pastel cyan
    "bg-pink-400"       // dark pastel pink
  ];
  
  const filteredData = flashData.filter(card => {
    const front = card.front || card.question || "";
    const back = card.back || card.answer || "";
    return front.toLowerCase().includes(searchQuery.toLowerCase()) ||
           back.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-8 md:px-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-14 h-14 bg-[#173837] rounded-2xl shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#173837]">
                  Your Flashcards
                </h1>
                <p className="text-slate-600 mt-1">
                  {filteredData.length} {filteredData.length === 1 ? 'card' : 'cards'} ready to study
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-white text-[#173837] rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 border-2 border-slate-200 hover:border-[#173837]">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="px-5 py-2.5 bg-[#173837] text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:bg-[#20524f] transition-all flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Study Mode
              </button>
            </div>
          </div>

          {/* Control Bar */}
          {flashData.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-4 border border-slate-200">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search flashcards..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-[#173837] focus:outline-none transition-all"
                  />
                </div>

                {/* Filter & View Toggle */}
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2.5 bg-slate-100 rounded-xl font-medium text-slate-700 hover:bg-slate-200 transition-all flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>

                  <div className="flex bg-slate-100 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-slate-200"
                      }`}
                    >
                      <Grid3x3 className="w-5 h-5 text-slate-700" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-slate-200"
                      }`}
                    >
                      <LayoutList className="w-5 h-5 text-slate-700" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Flashcards Grid/List */}
        {flashData.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-slate-200">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-slate-400" />
            </div>
            <p className="text-slate-500 text-lg font-medium mb-2">No flashcards generated yet</p>
            <p className="text-slate-400">Create your first set to start studying</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-slate-200">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <p className="text-slate-500 text-lg font-medium mb-2">No flashcards found</p>
            <p className="text-slate-400">Try adjusting your search query</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1 max-w-3xl mx-auto"
          }`}>
            {filteredData.map((card, i) => (
              <FlashcardItem
                key={i}
                front={card.front || card.question || "Question"}
                back={card.back || card.answer || "Answer"}
                color={colorPalette[i % colorPalette.length]}
              />
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {flashData.length > 0 && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200 text-center">
              <div className="text-2xl font-bold text-[#173837] mb-1">{flashData.length}</div>
              <div className="text-sm text-slate-600">Total Cards</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200 text-center">
              <div className="text-2xl font-bold text-emerald-600 mb-1">0</div>
              <div className="text-sm text-slate-600">Mastered</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200 text-center">
              <div className="text-2xl font-bold text-amber-600 mb-1">{flashData.length}</div>
              <div className="text-sm text-slate-600">Learning</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">0min</div>
              <div className="text-sm text-slate-600">Study Time</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}