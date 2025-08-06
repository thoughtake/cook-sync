export const fetchJson = async ({
  url,
  method,
  body,
  headers = { "Content-Type": "application/json" },
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: BodyInit | null;
  headers?: HeadersInit;
}) => {
  const res = await fetch(url, {
    method,
    headers,
    body,
  });

  const result = await res.json();

  if (!res.ok) {
    if (result.details) {
      console.error("詳細エラー", result.details);
    }
    throw new Error(result.error || `${method}に失敗しました。`);
  }

  return result;
};
