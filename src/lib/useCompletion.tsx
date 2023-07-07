import { useEffect, useState } from "react";
import { getCompletion } from "./shared";

export function useCompletion(prompt: string) {
  const [tokens, setTokens] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const onNewToken = (token: string) => {
      setTokens((tokens) => [...tokens, token]);
    };

    setIsLoading(true);
    getCompletion(prompt, onNewToken, signal)
      .then((res) => {
        setError(null);
        setIsLoading(false);
        console.log("Done", res);
      })
      .catch((err) => {
        setIsLoading(false);
        if (signal.aborted) {
          console.log("Aborted");
        } else {
          setError(err);
        }
      });

    return () => {
      controller.abort();
    };
  }, [prompt]);

  const completion = tokens.join(" ");

  return {
    data: completion,
    isLoading,
    error,
  };
}
