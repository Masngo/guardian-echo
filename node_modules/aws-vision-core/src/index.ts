import { analyzeSnapshot, type Analysis } from "./bedrock-analyzer.js";
import { publishHazards } from "./event-bridge.js";

export * from "./bedrock-analyzer.js";
export * from "./event-bridge.js";

export async function processSnapshot(
  cameraId: string,
  imageBase64: string,
  mimeType: string
): Promise<{ analysis: Analysis; published: number }> {
  const analysis = await analyzeSnapshot(imageBase64, mimeType);
  const published = await publishHazards(cameraId, analysis);
  return { analysis, published };
}
