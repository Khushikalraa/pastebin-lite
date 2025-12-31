import kv from "@/lib/kv";
import { headers } from "next/headers";

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 🔹 If KV env vars are missing (local dev), fall back to API
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

    const res = await fetch(`${protocol}://${host}/api/pastes/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return <h1>404 – Paste not found</h1>;
    }

    const data = await res.json();

    return (
      <pre style={{ whiteSpace: "pre-wrap", padding: 20 }}>
        {data.content}
      </pre>
    );
  }

  // 🔹 Production path (Vercel KV available)
  const paste = await kv.get<any>(`paste:${id}`);

  if (!paste) {
    return <h1>404 – Paste not found</h1>;
  }

  if (paste.expires_at && Date.now() >= paste.expires_at) {
    return <h1>404 – Paste expired</h1>;
  }

  return (
    <pre style={{ whiteSpace: "pre-wrap", padding: 20 }}>
      {paste.content}
    </pre>
  );
}
