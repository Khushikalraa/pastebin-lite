export const runtime = "nodejs";

import { nanoid } from "nanoid";


export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body || typeof body.content !== "string" || body.content.trim() === "") {
    return Response.json(
      { error: "content is required" },
      { status: 400 }
    );
  }

  const ttl = body.ttl_seconds;
  const maxViews = body.max_views;

  if (ttl !== undefined && (!Number.isInteger(ttl) || ttl < 1)) {
    return Response.json(
      { error: "ttl_seconds must be >= 1" },
      { status: 400 }
    );
  }

  if (maxViews !== undefined && (!Number.isInteger(maxViews) || maxViews < 1)) {
    return Response.json(
      { error: "max_views must be >= 1" },
      { status: 400 }
    );
  }

  const id = nanoid(8);
// @ts-ignore
  // TEMP storage (we’ll switch to KV after deploy)
  globalThis.pastes ??= new Map();
  // @ts-ignore
  globalThis.pastes.set(id, {
    content: body.content,
    views: 0,
    max_views: maxViews ?? null,
    expires_at: ttl ? Date.now() + ttl * 1000 : null,
  });

  return Response.json({
    id,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${id}`,
  });
}
