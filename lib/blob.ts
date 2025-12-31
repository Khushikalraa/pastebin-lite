import { put, head } from "@vercel/blob";

const PREFIX = "pastes"; // stable namespace

export async function savePaste(id: string, data: any) {
  await put(`${PREFIX}/${id}.json`, JSON.stringify(data), {
    access: "public",
    contentType: "application/json",
  });
}

export async function loadPaste(id: string) {
  try {
    const meta = await head(`${PREFIX}/${id}.json`);
    const res = await fetch(meta.url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
