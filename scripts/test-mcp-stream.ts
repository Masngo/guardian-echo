import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: process.execPath,
  args: ["--import", "tsx", "packages/ring-mcp-server/src/index.ts"],
  stderr: "inherit",
});

const client = new Client({ name: "test-client", version: "0.1.0" });
await client.connect(transport);

const { tools } = await client.listTools();
console.log("Tools:", tools.map((t) => t.name).join(", "));

const snap = await client.callTool({ name: "get_snapshot", arguments: { camera_id: "cam-1" } });
console.log("get_snapshot ->", (snap.content as any[]).map((c) => c.type).join(", "));

const chime = await client.callTool({
  name: "trigger_chime",
  arguments: { device_id: "chime-1", duration_sec: 3, confirm: true, reason: "Resident unresponsive" },
});
console.log("trigger_chime ->", (chime.content as any[])[0].text);

// Safety gate: this must be rejected
try {
  const bad = await client.callTool({ name: "unlock_door", arguments: { lock_id: "front" } });
  console.log("unlock_door without confirm ->", bad.isError ? "REJECTED (good)" : "ALLOWED (bad!)");
} catch (e) {
  console.log("unlock_door without confirm -> REJECTED (good)");
}

await client.close();
