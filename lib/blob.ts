import { put, head } from "@vercel/blob";

export async function savePaste(id: string, data: any) {
  await put(`paste/${id}.json`, JSON.stringify(data), {
    access: "public",
    contentType: "application/json",
  });
}

export async function loadPaste(id: string) {
  try {
    const meta = await head(`paste/${id}.json`);
    const res = await fetch(meta.url);

    if (!res.ok) return null;

    return await res.json();
  } catch {
    return null;
  }
}
