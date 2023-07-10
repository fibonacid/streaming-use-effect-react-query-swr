import { useId, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getCompletion } from "./shared";

export default function useCompletionSWR() {
  const id = useId();
  const { data, mutate } = useSWR<string>(["completion", id], null);
  const [abortController, setAbortController] =
    useState<AbortController | null>();

  const { trigger, isMutating, error } = useSWRMutation<
    void,
    unknown,
    [string, string],
    string
  >(["completion", id], async (_, { arg: prompt }) => {
    void mutate("", false);
    if (abortController) {
      abortController.abort();
    }
    const controller = new AbortController();
    const signal = controller.signal;
    setAbortController(controller);

    for await (const token of getCompletion(prompt, signal)) {
      void mutate((prev) => (prev ? prev + token : token), false);
    }
    setAbortController(null);
  });

  return [trigger, { data, error, isLoading: isMutating }] as const;
}
