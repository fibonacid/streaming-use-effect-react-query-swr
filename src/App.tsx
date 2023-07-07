/* eslint-disable no-constant-condition */
import { useState } from "react";
import { useCompletion } from "./lib/useCompletion";

function App() {
  const [prompt, setPrompt] = useState("");
  const [mutate, { data }] = useCompletion();
  return (
    <main className="m-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void mutate(prompt);
        }}
      >
        <label htmlFor="prompt">Prompt</label>
        <input
          id="prompt"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{data}</p>
    </main>
  );
}

export default App;
