"use client";

import { useState, useEffect } from "react";
import { Send, Mic, Search, AlertCircle, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function PodcastScreen({ user }) {
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("English");
  const [subject, setSubject] = useState("General");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const router = useRouter();

  const languages = ["English", "Hindi", "Spanish", "French", "German", "Mandarin"];
  const subjects = ["General", "Science", "Mathematics", "History", "Geography", "Literature", "Technology"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }

    setLoading(true);
    setError("");
    setStatus("Initializing podcast generation...");
    setProgress(0);

    try {
      const res = await axios.post("/api/podcast/generate", {
        topic: topic.trim(),
        subject: subject,
        grade_level: "Grade 9",
        student_gender: "male",
        student_name: user?.name || "Student"
      });

      if (res.data?.session_id) {
        setSessionId(res.data.session_id);
        setStatus("Podcast generation started...");
        setProgress(10);
      } else {
        setError("No session ID received.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to start podcast generation.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionId) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`/api/podcast/status/${sessionId}`);
        const data = res.data;

        setStatus(data.message || "Generating…");

        if (data.status === "processing") setProgress((p) => Math.min(p + 5, 70));
        if (data.status === "generating_audio") setProgress(80);
        if (data.status === "finalizing") setProgress(90);

        if (data.status === "completed") {
          clearInterval(interval);
          setProgress(100);
          setIsCompleted(true);

          setTimeout(() => {
            router.push(`/podcast/podcastresult?sessionId=${sessionId}`);
          }, 1200);
        }

        if (data.status === "failed") {
          clearInterval(interval);
          setError(data.message || "Podcast generation failed.");
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        clearInterval(interval);
        setError("Failed to fetch podcast status.");
        setLoading(false);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [sessionId]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          Create Podcast
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Generate AI-powered educational podcasts on any topic
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {loading ? (
          /* Loading State */
          <div className="p-6 md:p-8 lg:p-12">
            <div className="max-w-2xl mx-auto">
              {/* Animated Icon */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-green-500 scale-110' 
                      : 'bg-gradient-to-br from-blue-500 to-indigo-600 animate-pulse'
                  } transition-all duration-500`}>
                    {isCompleted ? (
                      <svg className="w-12 h-12 md:w-16 md:h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-white" />
                    )}
                  </div>
                  {!isCompleted && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full animate-ping opacity-20"></div>
                  )}
                </div>
              </div>

              {/* Status Header */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  {isCompleted ? (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                  )}
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                    {isCompleted ? 'Success!' : 'Generating Your Podcast'}
                  </h2>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ease-out relative ${
                      isCompleted 
                        ? 'bg-gradient-to-r from-green-500 to-green-600' 
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                    }`}
                    style={{ width: `${progress}%` }}
                  >
                    {!isCompleted && (
                      <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                    )}
                  </div>
                </div>

                {/* Progress Percentage */}
                <p className="text-sm font-medium text-gray-600 mb-6">
                  {progress}% Complete
                </p>

                {/* Status Message */}
                <div className="space-y-2 mb-6">
                  <p className="text-base md:text-lg text-gray-700 font-medium">
                    {status}
                  </p>
                  {!isCompleted && (
                    <p className="text-sm text-gray-500">
                      This may take a few moments...
                    </p>
                  )}
                  {isCompleted && (
                    <p className="text-sm text-green-600 font-medium">
                      Redirecting to your podcast...
                    </p>
                  )}
                </div>

                {/* Loading Dots */}
                <div className="flex justify-center gap-2 mb-8">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>

              {/* Topic Info Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Generation Details
                </h3>
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-sm font-semibold text-gray-800 min-w-[80px]">Topic:</span>
                    <span className="text-sm text-gray-600">{topic}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-sm font-semibold text-gray-800 min-w-[80px]">Subject:</span>
                    <span className="text-sm text-gray-600">{subject}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-sm font-semibold text-gray-800 min-w-[80px]">Language:</span>
                    <span className="text-sm text-gray-600">{language}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Form State */
          <div className="p-6 md:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              {/* Illustration */}
              <div className="mb-8 flex justify-center">
                <Image
                  src="/assets/createpodcast.png"
                  alt="Create Podcast"
                  width={470}
                  height={300}
                  className="w-full max-w-md md:max-w-lg h-auto"
                  priority
                />
              </div>

              {/* Language Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Language
                </label>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setLanguage(lang)}
                      disabled={loading}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        language === lang
                          ? "bg-blue-600 text-white shadow-md transform scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                      } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Subject
                </label>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subj) => (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => setSubject(subj)}
                      disabled={loading}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        subject === subj
                          ? "bg-indigo-600 text-white shadow-md transform scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                      } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      {subj}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic Input Form */}
              <form onSubmit={handleSubmit} className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Enter Podcast Topic
                </label>
                <div className="relative max-w-2xl mx-auto">
                  <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-gray-300 rounded-2xl shadow-md px-4 py-3 md:py-4 transition-all hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400">
                    <Search className="text-gray-500 w-5 h-5 mr-3 flex-shrink-0" />
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., The Solar System, World War II, Photosynthesis..."
                      className="flex-grow bg-transparent text-gray-700 placeholder-gray-400 text-sm md:text-base focus:outline-none"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="bg-white border border-gray-200 p-2 rounded-full hover:bg-gray-100 transition mr-2 flex-shrink-0 disabled:opacity-50"
                      aria-label="Voice Input"
                      disabled={loading}
                    >
                      <Mic className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 md:p-2.5 rounded-full transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                      disabled={loading}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </form>

              {/* Suggestion Text */}
              <div className="text-center">
                <p className="text-sm md:text-base text-gray-500">
                  💡 <span className="font-medium">Try:</span>{" "}
                  <span className="italic text-gray-600">
                    "Create a podcast about climate change" or "Explain quantum physics"
                  </span>
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-6 max-w-2xl mx-auto">
                  <div className="flex items-start gap-3 text-red-600 text-sm p-4 bg-red-50 border border-red-200 rounded-xl">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold mb-1">Error</p>
                      <p className="text-red-700">{error}</p>
                      <p className="text-xs mt-2 text-red-500">
                        Check the console for more details
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Info Cards - Only show when not loading */}
    
    </div>
  );
}