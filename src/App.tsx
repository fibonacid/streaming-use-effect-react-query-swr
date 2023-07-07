/* eslint-disable no-constant-condition */
import { useState, useEffect } from "react";

function useCompletion() {
  const [tokens, setTokens] = useState<string[]>([]);
  useEffect(() => {
    void fetch("http://localhost:4000/completion").then((res) => {
      const reader = res.body?.getReader();
      if (!reader) return;
      const decoder = new TextDecoder();
      while (true) {
        void reader.read().then(({ done, value }) => {
          if (done) return;
          const chunk = decoder.decode(value);
          setTokens((tokens) => [...tokens, ...chunk.split(" ")]);
        });
      }
    });
  }, []);
  return tokens.join("");
}

function App() {
  const completion = useCompletion();
  return <div className="m-4">{completion}</div>;
}

export default App;
