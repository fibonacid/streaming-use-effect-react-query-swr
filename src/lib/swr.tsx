import { useId } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getCompletion } from "./shared";

export default function useCompletionSWR() {
  const id = useId();
  const { data, mutate } = useSWR<string>(["completion", id], null);

  const { trigger, isMutating, error } = useSWRMutation<
    void,
    unknown,
    [string, string],
    string
  >(["completion", id], async (_, { arg: prompt }) => {
    for await (const token of getCompletion(prompt)) {
      void mutate((prev) => (prev ? prev + token : token), false);
    }
  });

  return [trigger, { data, error, isLoading: isMutating }] as const;
}
