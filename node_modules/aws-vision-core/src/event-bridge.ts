import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import type { Analysis } from "./bedrock-analyzer.js";

export async function publishHazards(cameraId: string, analysis: Analysis): Promise<number> {
  const threshold = Number(process.env.HAZARD_CONFIDENCE_THRESHOLD ?? 0.7);
  const actionable = analysis.hazards.filter((h) => h.confidence >= threshold);
  if (actionable.length === 0) return 0;

  const entries = actionable.map((h) => ({
    Source: "guardian-echo.vision",
    DetailType: h.type,
    EventBusName: process.env.EVENT_BUS_NAME ?? "default",
    Detail: JSON.stringify({
      cameraId,
      confidence: h.confidence,
      rationale: h.rationale,
      detectedAt: new Date().toISOString(),
    }),
  }));

  if ((process.env.EVENTS_MODE ?? "mock") === "mock") {
    console.log("[mock] would publish:", JSON.stringify(entries, null, 2));
    return entries.length;
  }

  const client = new EventBridgeClient({ region: process.env.AWS_REGION ?? "us-east-1" });
  const res = await client.send(new PutEventsCommand({ Entries: entries }));
  if (res.FailedEntryCount) throw new Error(`${res.FailedEntryCount} event(s) failed to publish`);
  return entries.length;
}
