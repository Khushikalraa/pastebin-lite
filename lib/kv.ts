import { kv as vercelKv } from "@vercel/kv";

// Manually map prefixed env vars → what @vercel/kv expects
if (
  !process.env.KV_REST_API_URL &&
  process.env.STORAGE_KV_REST_API_URL
) {
  process.env.KV_REST_API_URL =
    process.env.STORAGE_KV_REST_API_URL;
}

if (
  !process.env.KV_REST_API_TOKEN &&
  process.env.STORAGE_KV_REST_API_TOKEN
) {
  process.env.KV_REST_API_TOKEN =
    process.env.STORAGE_KV_REST_API_TOKEN;
}

export default vercelKv;
