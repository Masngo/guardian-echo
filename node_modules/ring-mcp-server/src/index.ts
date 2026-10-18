import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createRingClient } from "./ring-client.js";
import { registerGetSnapshot } from "./tools/get-camera-feed.js";
import { registerTriggerChime } from "./tools/trigger-siren.js";
import { registerUnlockDoor } from "./tools/unlock-door.js";

const server = new McpServer({ name: "guardian-echo-ring", version: "0.1.0" });
const ring = createRingClient();

registerGetSnapshot(server, ring);
registerTriggerChime(server, ring);
registerUnlockDoor(server, ring);

await server.connect(new StdioServerTransport());
console.error("guardian-echo-ring MCP server running on stdio");
