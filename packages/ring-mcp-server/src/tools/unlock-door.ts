import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { audit, type RingClient } from "../ring-client.js";

export function registerUnlockDoor(server: McpServer, ring: RingClient): void {
  server.registerTool(
    "unlock_door",
    {
      description:
        "Unlock a door (for example to admit emergency responders). HIGH RISK: requires confirm=true and a reason.",
      inputSchema: {
        lock_id: z.string().describe("Lock identifier"),
        confirm: z.literal(true).describe("Must be true to proceed"),
        reason: z.string().min(10).describe("Why the door must be unlocked"),
      },
    },
    async ({ lock_id, reason }) => {
      const result = await ring.unlockDoor(lock_id);
      audit("unlock_door", { lock_id, reason, ok: result.ok });
      return { content: [{ type: "text", text: result.detail }], isError: !result.ok };
    }
  );
}
