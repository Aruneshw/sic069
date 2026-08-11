import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json({ choices: [{ message: { content: "I am offline right now. My OpenRouter API Key is missing from Vercel's Environment Variables!" } }] });
    }

    const { messages, context } = await req.json();

    let systemPrompt = "You are an enthusiastic Local Guide & AI Travel Intelligence assistant for Zero Gravity Tours, helping users find budget trips under ₹10,000 INR.";
    if (context?.travelState) {
      systemPrompt += ` The user's active travel state is: ${context.travelState.state || "Escape"}.`;
    }
    if (context?.travelDna) {
      systemPrompt += ` User Travel DNA: Nature (${context.travelDna.nature}%), Adventure (${context.travelDna.adventure}%), Peace (${context.travelDna.peace}%), Crowd Tolerance (${context.travelDna.crowdTolerance}%). Adapt your advice to match their Travel DNA.`;
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        max_tokens: 1000,
        messages: [
          { role: "system", content: systemPrompt },
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
