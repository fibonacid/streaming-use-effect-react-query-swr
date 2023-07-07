/* eslint-disable no-constant-condition */
import { useCompletion } from "./lib/useCompletion";

function App() {
  const prompt = "Hello World";
  const { data } = useCompletion(prompt);
  return (
    <div className="m-4">
      <h1>{prompt}</h1>
      <p>{data || "Loading completion..."}</p>
    </div>
  );
}

export default App;
