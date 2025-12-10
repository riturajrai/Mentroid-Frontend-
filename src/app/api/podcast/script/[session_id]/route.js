import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  // 🔥 FIX FOR NEXT 16: params is a Promise
  const { session_id } = await context.params;

  // console.log("🔍 Script API called | session_id:", session_id);

  if (!session_id) {
    return NextResponse.json(
      { error: "Missing session_id" },
      { status: 400 }
    );
  }

  const backendUrl = `https://mentoroid-production.up.railway.app/podcast/script/${session_id}`;

  try {
    const response = await axios.get(backendUrl, {
      responseType: "text",
      headers: { Accept: "text/plain" },
    });

    return new NextResponse(response.data, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });

  } catch (err) {
    console.error("❌ Script fetch error:", err.response?.data || err.message);

    return NextResponse.json(
      {
        error: "Failed to fetch podcast script",
        details: err.response?.data || err.message,
      },
      { status: err.response?.status || 500 }
    );
  }
}
