import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { audit, type RingClient } from "../ring-client.js";

export function registerGetSnapshot(server: McpServer, ring: RingClient): void {
  server.registerTool(
    "get_snapshot",
    {
      description: "Capture a still snapshot from a Ring camera for safety analysis.",
      inputSchema: { camera_id: z.string().describe("Ring camera identifier") },
    },
    async ({ camera_id }) => {
      const snap = await ring.getSnapshot(camera_id);
      audit("get_snapshot", { camera_id });
      return {
        content: [
          { type: "image", data: snap.dataBase64, mimeType: snap.mimeType },
          { type: "text", text: `Snapshot from ${snap.cameraId} at ${snap.capturedAt}` },
        ],
      };
    }
  );
}
