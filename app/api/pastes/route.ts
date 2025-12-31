export const runtime = "nodejs";
export const dynamic = "force-dynamic";import { nanoid } from "nanoid";
import { savePaste } from "@/lib/blob";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body?.content?.trim()) {
    return Response.json({ error: "content is required" }, { status: 400 });
  }

  const id = nanoid(8);
  const now = Date.now();

  const paste = {
    content: body.content,
    views: 0,
    max_views: body.max_views ?? null,
    expires_at: body.ttl_seconds ? now + body.ttl_seconds * 1000 : null,
  };

  await savePaste(id, paste);

  const url = new URL(req.url);
  url.pathname = `/p/${id}`;
  url.search = "";

  return Response.json({ id, url: url.toString() });
}
