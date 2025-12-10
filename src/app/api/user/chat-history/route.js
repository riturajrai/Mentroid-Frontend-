// src/app/api/user/chat-history/route.js
import { NextResponse } from "next/server";

/**
 * POST -> Add a chat entry
 * body: { user_id, role, text }
 */
export async function POST(req) {
  try {
    const { user_id, role, text } = await req.json();

    if (!user_id || !role || !text) {
      return NextResponse.json({ error: "Missing fields: user_id, role, text required" }, { status: 400 });
    }

    // TODO: Replace with actual DB save
    // Example:
    // const saved = await db.chatHistory.create({ data: { userId: user_id, role, text } });

    return NextResponse.json({ success: true, message: "Chat saved", /* data: saved */ });
  } catch (err) {
    console.error("POST /api/user/chat-history error:", err);
    return NextResponse.json({ error: "Failed to save chat", details: err.message }, { status: 500 });
  }
}

/**
 * GET -> Fetch chat history
 * query: ?user_id=...
 */
export async function GET(req) {
  try {
    const user_id = req.nextUrl.searchParams.get("user_id");
    if (!user_id) {
      return NextResponse.json({ error: "user_id is required" }, { status: 400 });
    }

    // TODO: Replace with DB fetch
    // Example:
    // const chats = await db.chatHistory.findMany({ where: { userId: user_id }, orderBy: { createdAt: 'asc' } });

    const chats = []; // placeholder

    return NextResponse.json({ success: true, data: chats });
  } catch (err) {
    console.error("GET /api/user/chat-history error:", err);
    return NextResponse.json({ error: "Failed to fetch history", details: err.message }, { status: 500 });
  }
}

/**
 * DELETE -> Delete chat history
 * query: ?user_id=...
 */
export async function DELETE(req) {
  try {
    const user_id = req.nextUrl.searchParams.get("user_id");
    if (!user_id) {
      return NextResponse.json({ error: "user_id is required" }, { status: 400 });
    }

    // TODO: Replace with DB delete
    // Example:
    // await db.chatHistory.deleteMany({ where: { userId: user_id } });

    return NextResponse.json({ success: true, message: "Chat history deleted" });
  } catch (err) {
    console.error("DELETE /api/user/chat-history error:", err);
    return NextResponse.json({ error: "Failed to delete history", details: err.message }, { status: 500 });
  }
}
