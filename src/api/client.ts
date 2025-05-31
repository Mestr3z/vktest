const API_BASE = "http://localhost:4000";

export async function getJSON<T>(
  url: string,
  params?: Record<string, any>
): Promise<T> {
  const query = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      )
    : "";
  const res = await fetch(`${API_BASE}${url}${query}`);
  if (!res.ok) throw new Error(`Fetch error ${res.status}`);
  return res.json() as Promise<T>;
}

export async function postJSON<T>(url: string, body: any): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Fetch error ${res.status}`);
  return res.json() as Promise<T>;
}
