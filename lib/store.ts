type Paste = {
  content: string;
  views: number;
  max_views: number | null;
  expires_at: number | null;
};

const store =
  (globalThis as any).__PASTE_STORE__ ??
  new Map<string, Paste>();

(globalThis as any).__PASTE_STORE__ = store;

export function savePaste(id: string, paste: Paste) {
  store.set(id, paste);
}

export function loadPaste(id: string) {
  return store.get(id) ?? null;
}
