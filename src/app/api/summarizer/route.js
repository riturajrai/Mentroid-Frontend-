import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    
    console.log("API Route received:", JSON.stringify(body, null, 2));

    const response = await axios.post(
      "https://mentoroid-production.up.railway.app/summarizer",
      body,
      { 
        headers: { "Content-Type": "application/json" },
        timeout: 60000 // 60 second timeout for file processing
      }
    );

    console.log("Backend response:", response.data);
    return NextResponse.json(response.data);
    
  } catch (err) {
    console.error("=== SUMMARIZER ERROR ===");
    console.error("Error message:", err.message);
    console.error("Error response:", err.response?.data);
    console.error("Error status:", err.response?.status);
    console.error("========================");
    
    // Return detailed error information
    return NextResponse.json(
      { 
        success: false, 
        error: err.response?.data?.error || err.response?.data || err.message || "Server error",
        details: err.response?.data,
        status: err.response?.status
      },
      { status: err.response?.status || 500 }
    );
  }
}