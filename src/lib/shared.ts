export async function* getCompletion(prompt: string, signal?: AbortSignal) {
  const url = new URL("/completion", "http://localhost:4000");
  url.searchParams.append("prompt", prompt);

  const res = await fetch(url, {
    method: "GET",
    signal,
  });

  const reader = res.body?.getReader();
  if (!reader) throw new Error("No reader");
  const decoder = new TextDecoder();

  let i = 0;
  while (i < 1000) {
    i++;
    const { done, value } = await reader.read();
    if (done) return;
    const token = decoder.decode(value);
    yield token;

    if (signal?.aborted) {
      await reader.cancel();
      return;
    }
  }
}

export const errorMessage = (err: unknown, fallback?: string) => {
  if (err instanceof Error) {
    return err.message;
  }
  return fallback || "Unknown error";
};
