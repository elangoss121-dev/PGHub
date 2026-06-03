import { generateText, Output } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { z } from "zod"

// Use the provided Gemini project/key (stored as an env var, not hardcoded).
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
})

const suggestionSchema = z.object({
  suggestions: z.array(z.string()).max(6),
})

export async function POST(req: Request) {
  try {
    const { type, query } = (await req.json()) as {
      type: "college" | "company"
      query: string
    }

    if (!query || query.trim().length < 2) {
      return Response.json({ suggestions: [] })
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return Response.json(
        { suggestions: [], error: "Missing GOOGLE_GENERATIVE_AI_API_KEY" },
        { status: 200 },
      )
    }

    const subject =
      type === "company"
        ? "real company / employer names (tech, IT, finance, consulting, etc.)"
        : "real college / university / institution names"

    const { experimental_output } = await generateText({
      model: google("gemini-2.5-flash"),
      // Keep it fast and deterministic for autocomplete.
      temperature: 0.2,
      system:
        "You are an autocomplete engine. Given a partial text, return up to 6 real, well-known " +
        `${subject} that best match what the user is typing. ` +
        "Prioritize Indian institutions/companies when the input is ambiguous, since this is an Indian PG (paying guest) app. " +
        "Return only proper names, no descriptions. If nothing sensible matches, return an empty list.",
      prompt: `The user is typing: "${query}". Suggest matching names.`,
      experimental_output: Output.object({ schema: suggestionSchema }),
    })

    const suggestions = (experimental_output?.suggestions ?? [])
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 6)

    return Response.json({ suggestions })
  } catch (error) {
    console.log("[v0] /api/suggest error:", error instanceof Error ? error.message : error)
    return Response.json({ suggestions: [] }, { status: 200 })
  }
}
