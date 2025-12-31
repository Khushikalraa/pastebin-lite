export const runtime = "nodejs";
import { headers } from "next/headers";

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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
