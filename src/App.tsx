/* eslint-disable no-constant-condition */
import { ReactNode, useState } from "react";
import { useCompletionCustom } from "./lib/custom";
import useCompletionSWR from "./lib/swr";

function App() {
  return (
    <main className="m-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold mb-4">Autocomplete</h1>
        <p>
          This app is here to demonstrate three different ways to consume
          streaming responses in React.
        </p>
        <p>
          The completions come from a local server that uses the LLama model
        </p>
      </div>
      <div className="divider" />
      <CustomHookSection />
      <div className="divider" />
      <SWRHookSection />
      <div className="divider" />
      <ReactQuerySection />
    </main>
  );
}

export default App;

function CustomHookSection() {
  const [mutate, { data, isLoading }] = useCompletionCustom();
  return (
    <Section
      title="Custom Hook"
      form={
        <Form
          onSubmit={(prompt) => {
            void mutate(prompt);
          }}
        />
      }
      result={isLoading ? "Loading..." : data ?? ""}
    />
  );
}

function SWRHookSection() {
  const [mutate, { data, isLoading }] = useCompletionSWR();
  return (
    <Section
      title="SWR Hook"
      form={
        <Form
          onSubmit={(prompt) => {
            void mutate(prompt);
          }}
        />
      }
      result={isLoading ? "Loading..." : data ?? ""}
    />
  );
}

function ReactQuerySection() {
  const [mutate, { data, isLoading }] = useCompletionCustom();
  return (
    <Section
      title="React Query Hook"
      form={
        <Form
          onSubmit={(prompt) => {
            void mutate(prompt);
          }}
        />
      }
      result={isLoading ? "Loading..." : data ?? ""}
    />
  );
}

function Section({
  title,
  form,
  result,
}: {
  title: string;
  form: ReactNode;
  result: string;
}) {
  return (
    <section className="flex">
      <div className="basis-96">
        <h3 className="mb-4 font-bold text-lg">{title}</h3>
        {form}
      </div>
      <div className="flex-1 border border-accent rounded-lg p-4">
        <p>{result}</p>
      </div>
    </section>
  );
}

function Form({ onSubmit }: { onSubmit: (prompt: string) => void }) {
  const [prompt, setPrompt] = useState("");
  return (
    <form
      className="mb-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(prompt);
        setPrompt("");
      }}
    >
      <div className="form-control w-full max-w-xs mb-4">
        <label className="sr-only" htmlFor="prompt">
          Prompt
        </label>
        <input
          id="prompt"
          className="input-bordered input-md w-full max-w-xs"
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt"
          value={prompt}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <button className="btn btn-accent btn-" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
