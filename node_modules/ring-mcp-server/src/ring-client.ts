export interface Snapshot {
  cameraId: string;
  capturedAt: string;
  mimeType: string;
  dataBase64: string;
}

export interface ActionResult {
  ok: boolean;
  detail: string;
}

export interface RingClient {
  getSnapshot(cameraId: string): Promise<Snapshot>;
  triggerChime(deviceId: string, durationSec: number): Promise<ActionResult>;
  unlockDoor(lockId: string): Promise<ActionResult>;
}

// IMPORTANT: stdio MCP servers must never write to stdout (it carries the protocol).
// All logging goes to stderr.
export function audit(event: string, data: Record<string, unknown>): void {
  console.error(JSON.stringify({ ts: new Date().toISOString(), event, ...data }));
}

// 1x1 PNG placeholder so the vision pipeline has a valid image to work with.
const PLACEHOLDER_PNG =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

export class SimulatorRingClient implements RingClient {
  async getSnapshot(cameraId: string): Promise<Snapshot> {
    return {
      cameraId,
      capturedAt: new Date().toISOString(),
      mimeType: "image/png",
      dataBase64: PLACEHOLDER_PNG,
    };
  }

  async triggerChime(deviceId: string, durationSec: number): Promise<ActionResult> {
    return { ok: true, detail: `[simulator] chime on ${deviceId} for ${durationSec}s` };
  }

  async unlockDoor(lockId: string): Promise<ActionResult> {
    return { ok: true, detail: `[simulator] lock ${lockId} unlocked` };
  }
}

export function createRingClient(): RingClient {
  const mode = process.env.RING_MODE ?? "simulator";
  if (mode === "simulator") return new SimulatorRingClient();
  throw new Error(`RING_MODE="${mode}" is not implemented yet; use "simulator".`);
}
