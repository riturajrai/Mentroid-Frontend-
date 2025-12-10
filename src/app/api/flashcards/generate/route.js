import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const response = await axios.post(
      "https://mentoroid-production.up.railway.app/flashcard_gen",
      body,
      { headers: { "Content-Type": "application/json" } }
    );

    return NextResponse.json(response.data);
  } catch (err) {
    console.error("Flashcard generation error:", err.response?.data);
    return NextResponse.json(
      { success: false, error: err.response?.data || "Server error" },
      { status: 500 }
    );
  }
}
