"use client";
import { useRef, useState, useEffect } from "react";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  FileText,
  Music,
  Download,
} from "lucide-react";

export default function PodcastDetailScreen({ data, setActive }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [scriptContent, setScriptContent] = useState(null);
  const [scriptLoading, setScriptLoading] = useState(true);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  };

  const handleDownloadAudio = async () => {
    if (!data?.audioUrl) return;
    
    const audioUrl =`api/podcast/audio/{sessionId}`
    
    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.topic || "podcast"}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download audio. Please try again.");
    }
  };

  const handleDownloadScript = async () => {
    if (!scriptContent || scriptContent === "No script available." || scriptContent === "Failed to load script.") {
      alert("No script available to download.");
      return;
    }

    try {
      const blob = new Blob([scriptContent], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.topic || "podcast"}-script.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download script. Please try again.");
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    const setAudioDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, []);

  useEffect(() => {
    const fetchScript = async () => {
      if (!data?.scriptUrl) {
        setScriptContent("No script available.");
        setScriptLoading(false);
        return;
      }
  
      setScriptLoading(true);
  
      const sessionId = data.scriptUrl.split("/").pop();
      const apiUrl = `/api/podcast/script/${sessionId}`;
  
      try {
        const res = await fetch(apiUrl);
  
        let resData;
        const contentType = res.headers.get("content-type");
  
        // 🔥 Auto-detect if response is JSON or plain text
        if (contentType && contentType.includes("application/json")) {
          resData = await res.json();
        } else {
          resData = await res.text();
        }
  
        // 🔥 Handle different formats
        if (!resData) {
          setScriptContent("Script not found.");
        } 
        else if (typeof resData === "string") {
          setScriptContent(resData);
        } 
        else if (resData.script) {
          setScriptContent(resData.script);
        } 
        else {
          setScriptContent(JSON.stringify(resData, null, 2));
        }
      } 
      catch (err) {
        console.error("Script load failed:", err);
        setScriptContent("Failed to load script.");
      } 
      finally {
        setScriptLoading(false);
      }
    };
  
    fetchScript();
  }, [data]);
  
  if (!data)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading Podcast...
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Header */}
      {/* <div className="flex items-center gap-3 p-3 sm:p-6 bg-white shadow-sm sticky top-0 z-20">
        <button
          onClick={() => setActive("podcast")}
          className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition touch-manipulation"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800 truncate">
          Podcast
        </h1>
      </div> */}

      {/* Page Content */}
      <div className="flex-1 px-3 sm:px-6 py-4 sm:py-10 flex justify-center overflow-y-auto">
        <div className="w-full max-w-4xl bg-white rounded-xl sm:rounded-3xl shadow-lg p-4 sm:p-6 md:p-10">
          {/* Title */}
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-blue-700 text-center mb-3 sm:mb-4 break-words">
            🎙️ {data.topic}
          </h2>

          {/* Metadata */}
          <div className="text-center text-xs sm:text-base text-gray-600 mb-4 sm:mb-6 space-y-1">
            <p className="break-words px-2">
              <strong>Subject:</strong> {data.subject}
            </p>
            <p className="break-words px-2">
              <strong>Student:</strong> {data.studentName}
            </p>
            <p className="break-words px-2">
              <strong>Format:</strong> {data.format} ({data.quality})
            </p>
          </div>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-10 px-2">
            <button
              onClick={handleDownloadAudio}
              disabled={!data?.audioUrl}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-2.5 rounded-lg sm:rounded-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-sm sm:text-base shadow transition touch-manipulation disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Music className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Download Audio</span>
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownloadScript}
              disabled={!data?.scriptUrl || scriptLoading}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-2.5 rounded-lg sm:rounded-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-sm sm:text-base shadow transition touch-manipulation disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Download Script</span>
              <Download className="w-4 h-4" />
            </button>
          </div>

          {/* Audio Player */}
          <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-inner mb-6 sm:mb-12">
            <audio
              ref={audioRef}
              className="hidden"
              src={
                data.audioUrl?.startsWith("http")
                  ? data.audioUrl
                  : `https://mentoroid-production.up.railway.app/${data.audioUrl}`
              }
            />

            <div className="flex items-center justify-between mb-4">
              <button
                onClick={togglePlay}
                className="p-3 sm:p-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-full text-white transition touch-manipulation shadow-md"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />
                )}
              </button>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                <Volume2 className="w-4 h-4 hidden sm:block" />
                <span className="tabular-nums">{formatTime(currentTime)}</span>
                <span>/</span>
                <span className="tabular-nums">{formatTime(duration)}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div
              className="w-full h-3 sm:h-2 bg-gray-300 rounded-full cursor-pointer touch-manipulation"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const newTime =
                  ((e.clientX - rect.left) / rect.width) * duration;
                audioRef.current.currentTime = newTime;
              }}
            >
              <div
                className="h-3 sm:h-2 bg-blue-600 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Script Section */}
          <div className="h-[40vh] sm:h-[50vh] overflow-y-auto bg-gray-50 p-3 sm:p-6 rounded-lg sm:rounded-2xl border shadow-sm">
            <h3 className="text-base sm:text-xl font-semibold text-gray-800 mb-3 sticky top-0 bg-gray-50 pb-2">
              📝 Podcast Script
            </h3>
            {scriptLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <p className="text-gray-700 text-sm sm:text-base whitespace-pre-wrap leading-relaxed break-words">
                {scriptContent}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}