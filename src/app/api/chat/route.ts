import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json({ choices: [{ message: { content: "I am offline right now. My OpenRouter API Key is missing from Vercel's Environment Variables!" } }] });
    }

    const { messages, context } = await req.json();

    let systemPrompt = `You are a context-aware Local Friend & Word-of-Mouth Intelligence Guide for Zero Gravity Tours.
You solve the problem: "What do locals actually know that generic websites miss?"

RULES:
1. Speak like a trusted friend who has actually been there.
2. Structure advice cleanly when asked "what should I know" or "what to expect":
   - 🕐 Timing (What experienced travelers recommend)
   - 🌦 Conditions (Current/recent context)
   - 💰 Money (Realistic spending expectations beyond package)
   - 🚗 Getting Around (Transport friction & road reality)
   - 🍴 Food (Local authentic spots vs tourist traps)
   - ⚠️ Avoid (Known tourist mistakes)
   - ⭐ Don't Miss (High-confidence recommendations)
3. NO HALLUCINATIONS: Never invent prices, operating hours, safety issues, or fake restaurants. If data is unverified, explicitly state "Based on recent traveler reports..." or "I don't have verified data for that exact detail."
4. Prioritize USER VALUE over popularity.`;

    if (context?.travelState) {
      systemPrompt += `\nUser Travel State: ${context.travelState.state || "Escape"}.`;
    }
    if (context?.travelDna) {
      systemPrompt += `\nUser Travel DNA: Nature (${context.travelDna.nature}%), Adventure (${context.travelDna.adventure}%), Peace (${context.travelDna.peace}%), Crowd Tolerance (${context.travelDna.crowdTolerance}%). Tailor recommendations specifically to their preferences.`;
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
