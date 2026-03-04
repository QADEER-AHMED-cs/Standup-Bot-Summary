import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

export function useStandups() {
  return useQuery({
    queryKey: [api.standups.list.path],
    queryFn: async () => {
      const res = await fetch(api.standups.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch standups");
      
      const data = await res.json();
      return api.standups.list.responses[200].parse(data);
    },
  });
}

export function useCreateStandup() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: z.infer<typeof api.standups.create.input>) => {
      const validated = api.standups.create.input.parse(data);
      const res = await fetch(api.standups.create.path, {
        method: api.standups.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.standups.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to generate standup");
      }
      return api.standups.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.standups.list.path] });
      toast({
        title: "Standup generated successfully",
        description: "Your daily standup has been summarized and added to the feed.",
      });
    },
    onError: (err: Error) => {
      toast({
        title: "Generation failed",
        description: err.message,
        variant: "destructive",
      });
    },
  });
}
