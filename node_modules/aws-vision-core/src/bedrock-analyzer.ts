import { BedrockRuntimeClient, ConverseCommand } from "@aws-sdk/client-bedrock-runtime";
import { z } from "zod";

export const HAZARD_TYPES = ["FALL_RISK", "UNATTENDED_STOVE", "UNLOCKED_PERIMETER"] as const;

const AnalysisSchema = z.object({
  hazards: z.array(
    z.object({
      type: z.enum(HAZARD_TYPES),
      confidence: z.number().min(0).max(1),
      rationale: z.string(),
    })
  ),
  summary: z.string(),
});
export type Analysis = z.infer<typeof AnalysisSchema>;

const SYSTEM_PROMPT = `You are a home-safety analyst for an elder-care monitoring system.
Examine the image and report ONLY these hazard types if clearly visible:
- FALL_RISK: a person on the floor, collapsed, or in an unstable posture
- UNATTENDED_STOVE: active cooking/flames/pots on a stove with no person nearby
- UNLOCKED_PERIMETER: an exterior door visibly open or unlocked
Be conservative: if unsure, omit the hazard or give low confidence.
Respond with JSON only, no prose or code fences, in this shape:
{"hazards":[{"type":"FALL_RISK","confidence":0.0,"rationale":"..."}],"summary":"one sentence"}
Return {"hazards":[],"summary":"..."} when nothing is wrong.`;

const FORMATS: Record<string, "png" | "jpeg" | "gif" | "webp"> = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/gif": "gif",
  "image/webp": "webp",
};

function parseJson(text: string): unknown {
  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}

export async function analyzeSnapshot(imageBase64: string, mimeType: string): Promise<Analysis> {
  if ((process.env.VISION_MODE ?? "mock") === "mock") {
    return {
      hazards: [
        { type: "FALL_RISK", confidence: 0.91, rationale: "[mock] person appears to be on the floor" },
      ],
      summary: "[mock] simulated analysis result",
    };
  }

  const format = FORMATS[mimeType];
  if (!format) throw new Error(`Unsupported image type: ${mimeType}`);

  const modelId = process.env.BEDROCK_MODEL_ID;
  if (!modelId) throw new Error("BEDROCK_MODEL_ID is not set");

  const client = new BedrockRuntimeClient({ region: process.env.AWS_REGION ?? "us-east-1" });
  const res = await client.send(
    new ConverseCommand({
      modelId,
      system: [{ text: SYSTEM_PROMPT }],
      messages: [
        {
          role: "user",
          content: [
            { image: { format, source: { bytes: Buffer.from(imageBase64, "base64") } } },
            { text: "Analyze this snapshot." },
          ],
        },
      ],
      inferenceConfig: { maxTokens: 500, temperature: 0 },
    })
  );

  const text = res.output?.message?.content?.find((b) => "text" in b && b.text)?.text;
  if (!text) throw new Error("Bedrock returned no text content");
  return AnalysisSchema.parse(parseJson(text));
}
