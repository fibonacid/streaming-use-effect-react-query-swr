import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useId, useState } from "react";
import { getCompletion } from "./shared";

export function useCompletionReactQuery() {
  const id = useId();

  const queryClient = useQueryClient();
  const { data } = useQuery<string>({
    queryKey: ["completion", id],
  });
  const [abortController, setAbortController] =
    useState<AbortController | null>();

  const { mutate, error, isLoading } = useMutation({
    mutationKey: ["completion", id],
    mutationFn: async (prompt: string) => {
      if (abortController) {
        abortController.abort();
      }
      const controller = new AbortController();
      const signal = controller.signal;
      setAbortController(controller);

      for await (const token of getCompletion(prompt, signal)) {
        queryClient.setQueryData<string>(
          ["completion", id],
          (prev) => (prev ? prev + token : token),
        );
      }
      setAbortController(null);
    },
  });

  return [mutate, { data, error, isLoading }] as const;
}
