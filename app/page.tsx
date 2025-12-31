"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  async function createPaste() {
    setError("");
    setUrl("");

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: views ? Number(views) : undefined,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    setUrl(data.url);
  }

  return (
    <div style={{ padding: 24, maxWidth: 700, margin: "auto" }}>
      <h1>Pastebin Lite</h1>

      <textarea
        placeholder="Paste your text here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        style={{ width: "100%", marginBottom: 12 }}
      />

      <input
        placeholder="TTL (seconds, optional)"
        value={ttl}
        onChange={(e) => setTtl(e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />

      <input
        placeholder="Max views (optional)"
        value={views}
        onChange={(e) => setViews(e.target.value)}
        style={{ width: "100%", marginBottom: 12 }}
      />

      <button onClick={createPaste}>Create Paste</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {url && (
        <p>
          Your paste:{" "}
          <a href={url} target="_blank">
            {url}
          </a>
        </p>
      )}
    </div>
  );
}
