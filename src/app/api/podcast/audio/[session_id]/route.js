import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  // 🔥 FIX FOR NEXT 15+: params is a Promise
  const { session_id } = await context.params;

  if (!session_id) {
    return NextResponse.json(
      { error: "Missing session_id" },
      { status: 400 }
    );
  }

  const backendUrl = `https://mentoroid-production.up.railway.app/podcast/audio/${session_id}`;

  try {
    const response = await axios.get(backendUrl, {
      responseType: "arraybuffer",
      headers: { Accept: "audio/wav" },
    });

    return new NextResponse(response.data, {
      status: 200,
      headers: {
        "Content-Type": "audio/wav",
        "Content-Disposition": `attachment; filename="podcast-${session_id}.wav"`,
        "Content-Length": response.data.byteLength,
      },
    });

  } catch (err) {
    console.error("❌ Audio fetch error:", err.response?.data || err.message);

    return NextResponse.json(
      {
        error: "Failed to fetch podcast audio",
        details: err.response?.data || err.message,
      },
      { status: err.response?.status || 500 }
    );
  }
}