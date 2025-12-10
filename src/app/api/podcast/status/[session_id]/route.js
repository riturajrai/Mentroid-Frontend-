import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  // ⬅️ FIX: params is a Promise in your Next.js version
  const { session_id } = await context.params;

  console.log("🔍 Status API called | session_id:", session_id);

  if (!session_id) {
    return NextResponse.json(
      { error: "Missing session_id" },
      { status: 400 }
    );
  }

  const backendUrl = `https://mentoroid-production.up.railway.app/status/${session_id}`;
  console.log("🌐 Fetching from backend:", backendUrl);

  try {
    const response = await axios.get(backendUrl, {
      headers: { Accept: "application/json" },
      timeout: 15000,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("❌ Failed to fetch podcast status:", {
      message: error.message,
      status: error?.response?.status,
      backend: error?.response?.data,
    });

    return NextResponse.json(
      {
        error: "Failed to fetch podcast status",
        details: error?.response?.data || error.message,
      },
      { status: error?.response?.status || 500 }
    );
  }
}
