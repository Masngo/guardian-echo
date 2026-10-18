import "dotenv/config";
import { readFileSync } from "node:fs";
import { extname } from "node:path";
import { processSnapshot } from "../packages/aws-vision-core/src/index.js";

const MIME: Record<string, string> = {
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
};
const PLACEHOLDER_PNG =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

const file = process.argv[2];
const [data, mime] = file
  ? [readFileSync(file).toString("base64"), MIME[extname(file).toLowerCase()] ?? "image/jpeg"]
  : [PLACEHOLDER_PNG, "image/png"];

console.log(`Mode: vision=${process.env.VISION_MODE ?? "mock"}, events=${process.env.EVENTS_MODE ?? "mock"}`);
const result = await processSnapshot("cam-1", data, mime);
console.log(JSON.stringify(result, null, 2));
