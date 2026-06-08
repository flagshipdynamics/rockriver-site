interface Env {
  OPENAI_API_KEY: string;
}

interface RequestBody {
  message: string;
  pageUrl?: string;
}

const ALLOWED_ORIGIN = "https://rockriverresearch.com";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const SYSTEM_PROMPT = `You are a helpful support assistant for RockTerm, a Windows terminal emulator for network engineers and IT professionals. RockTerm supports SSH, Telnet, Serial, and Raw TCP connections.

Guidelines:
- Answer questions about RockTerm features, configuration, and troubleshooting.
- Be concise and helpful.
- If you are unsure about an answer, tell the user to contact support at info@rockriverresearch.com.
- NEVER request, accept, or store: passwords, private keys, API keys, authentication tokens, session contents, or any credentials.
- If a user shares sensitive information, remind them not to share credentials in chat and suggest they contact support directly.
- Do not make up features that RockTerm does not have.`;

function jsonResponse(body: object, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

// In-memory rate limit — best-effort per isolate. Add a Cloudflare Rate Limiting
// rule in the dashboard for durable per-IP enforcement across edge locations.
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const ip = context.request.headers.get("CF-Connecting-IP") || "unknown";
  if (isRateLimited(ip)) {
    return jsonResponse({ error: "Too many requests. Please wait a moment." }, 429);
  }

  const apiKey = context.env.OPENAI_API_KEY;
  if (!apiKey) {
    return jsonResponse({ error: "Service unavailable" }, 503);
  }

  let body: RequestBody;
  try {
    body = await context.request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }

  if (!body.message || typeof body.message !== "string") {
    return jsonResponse({ error: "Message is required" }, 400);
  }

  const message = body.message.trim();
  if (message.length === 0) {
    return jsonResponse({ error: "Message cannot be empty" }, 400);
  }
  if (message.length > 4000) {
    return jsonResponse({ error: "Message exceeds 4000 character limit" }, 400);
  }

  const pageUrl =
    body.pageUrl && typeof body.pageUrl === "string"
      ? body.pageUrl.slice(0, 200)
      : "";
  const userContent = pageUrl
    ? `[User is viewing: ${pageUrl}]\n\n${message}`
    : message;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        instructions: SYSTEM_PROMPT,
        input: userContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error: ${response.status} ${errorText}`);
      return jsonResponse({ error: "Failed to generate response" }, 502);
    }

    const data: any = await response.json();
    const answer =
      data.output
        ?.filter((item: any) => item.type === "message")
        .map((item: any) =>
          item.content
            ?.filter((c: any) => c.type === "output_text")
            .map((c: any) => c.text)
            .join("")
        )
        .join("") || "I'm unable to answer right now. Please contact support at info@rockriverresearch.com.";

    return jsonResponse({ answer });
  } catch (err) {
    console.error("Request failed:", err);
    return jsonResponse({ error: "Service temporarily unavailable" }, 503);
  }
};
