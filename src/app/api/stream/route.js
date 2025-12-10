// src/app/api/stream/route.js
export async function POST(req) {
  try {
    const { message, user_id, subject, topic, websearch } = await req.json();

    // Validate
    if (!message || !user_id) {
      return new Response(JSON.stringify({ error: "message and user_id required" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const backendURL = "https://mentoroid-production.up.railway.app/chatbot/stream_production";

    const response = await fetch(backendURL, {
      method: "POST",
      // server-to-server cookies: include if you need to forward cookies (depends on env)
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, user_id, subject, topic, websearch }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return new Response(JSON.stringify({ error: "AI backend error", status: response.status, body: text }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Pipe response body (stream) directly to client
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          controller.enqueue(value);
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("POST /api/stream error:", err);
    return new Response(JSON.stringify({ error: "Streaming failed", details: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
