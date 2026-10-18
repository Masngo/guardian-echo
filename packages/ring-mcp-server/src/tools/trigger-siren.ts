import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { audit, type RingClient } from "../ring-client.js";

export function registerTriggerChime(server: McpServer, ring: RingClient): void {
  server.registerTool(
    "trigger_chime",
    {
      description:
        "Sound a Ring chime to alert people in the home. Requires confirm=true and a reason.",
      inputSchema: {
        device_id: z.string().describe("Ring chime device identifier"),
        duration_sec: z.number().int().min(1).max(30).default(5),
        confirm: z.literal(true).describe("Must be true to proceed"),
        reason: z.string().min(5).describe("Why the chime is being triggered"),
      },
    },
    async ({ device_id, duration_sec, reason }) => {
      const result = await ring.triggerChime(device_id, duration_sec);
      audit("trigger_chime", { device_id, duration_sec, reason, ok: result.ok });
      return { content: [{ type: "text", text: result.detail }], isError: !result.ok };
    }
  );
}
