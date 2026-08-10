import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json({ choices: [{ message: { content: "I am offline right now. My OpenRouter API Key is missing from Vercel's Environment Variables!" } }] });
    }

    const { messages } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemini-flash-1.5", // Valid OpenRouter model ID
        messages: [
          { role: "system", content: "You are a helpful and enthusiastic travel agent assistant for Zero Gravity Tours. You provide short, exciting responses to help users book trips and packages under ₹10,000." },
          ...messages
        ]
      })
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}
