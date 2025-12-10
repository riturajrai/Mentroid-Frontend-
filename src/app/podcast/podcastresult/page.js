"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import PodcastDetailScreen from "./PodcastDetailScreen";

export default function PodcastResultPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    async function loadPodcast() {
      try {
        const res = await axios.get(`/api/podcast/status/${sessionId}`);
        const d = res.data;

        if (d.status !== "completed") {
          // keep checking until ready
          setTimeout(loadPodcast, 1500);
          return;
        }

        // ⭐ Convert snake_case → camelCase
        setData({
          audioUrl: d.audio_url,
          scriptUrl: d.script_url,
          topic: d.topic,
          subject: d.subject,
          studentName: d.student_name,
          format: d.format || "WAV",
          quality: d.quality || "High Quality",
        });

      } catch (error) {
        console.error("Error fetching podcast:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPodcast();
  }, [sessionId]);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading podcast...
      </div>
    );
  }

  return <PodcastDetailScreen data={data} />;
}
