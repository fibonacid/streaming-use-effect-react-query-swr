export async function getCompletion(
  prompt: string,
  onNewToken: (token: string) => void,
  signal?: AbortSignal
) {
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
  let text = "";
  while (i < 1000) {
    i++;
    const { done, value } = await reader.read();
    if (done) return;
    const chunk = decoder.decode(value);
    onNewToken(chunk);
    text += chunk;
  }

  return text;
}
