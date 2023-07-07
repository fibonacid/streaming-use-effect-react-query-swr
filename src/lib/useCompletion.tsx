import { useCallback, useState } from "react";
import { getCompletion } from "./shared";

export function useCompletion(signal?: AbortSignal) {
  const [tokens, setTokens] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const mutate = useCallback(
    async (prompt: string) => {
      setIsLoading(true);
      try {
        await getCompletion(
          prompt,
          (token) => {
            setTokens((tokens) => [...tokens, token]);
          },
          signal
        );
      } catch (err) {
        if (signal?.aborted) {
          console.log("Aborted");
        } else {
          setError(err);
        }
      }
      setIsLoading(false);
    },
    [signal]
  );

  const data = tokens.join("");
  return [mutate, { data, isLoading, error }] as const;
}
