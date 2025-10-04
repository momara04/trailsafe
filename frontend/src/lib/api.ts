// Simple typed fetch wrapper that targets your backend base URL
export const API_BASE =
  import.meta.env.VITE_API_BASE ?? 'http://localhost:4000/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export async function api<T = unknown>(
  path: string,
  options: { method?: HttpMethod; body?: any; headers?: Record<string, string> } = {}
): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${method} ${path} failed: ${res.status} ${text}`);
  }
  return (await res.json()) as T;
}
