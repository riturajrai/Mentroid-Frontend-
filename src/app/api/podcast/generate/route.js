import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // Log payload for debugging
    console.log("📤 Sending request to backend:", body);

    // Forward to Mentoroid backend
    const response = await axios.post(
      "https://mentoroid-production.up.railway.app/generate",
      body,
      {
        headers: { "Content-Type": "application/json" },
        timeout: 30000,
      }
    );

    console.log("✅ Backend response:", response.data);

    return NextResponse.json(response.data, { status: 200 });

  } catch (error) {
    console.error("❌ Podcast generate error:", {
      message: error.message,
      response: error?.response?.data,
      status: error?.response?.status,
      url: error?.config?.url,
    });

    const errorMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error.message ||
      "Failed to start podcast generation";

    return NextResponse.json(
      {
        error: errorMessage,
        details: error?.response?.data,
        success: false,
      },
      { status: error?.response?.status || 500 }
    );
  }
}
