import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@shared/routes";
import { useCreateStandup } from "@/hooks/use-standups";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type FormValues = z.infer<typeof api.standups.create.input>;

export function StandupForm() {
  const createStandup = useCreateStandup();

  const form = useForm<FormValues>({
    resolver: zodResolver(api.standups.create.input),
    defaultValues: {
      yesterday: "",
      today: "",
      blockers: "None",
    },
  });

  const onSubmit = (data: FormValues) => {
    createStandup.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  const isPending = createStandup.isPending;

  return (
    <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Write your update</h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          Dump your raw notes below. Our AI will perfectly format them into a clean, professional standup summary.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="yesterday"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80 font-medium">Yesterday's Work</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g. Finished the auth module, fixed that weird CSS bug..."
                    className="min-h-[100px] resize-none bg-background focus-visible:ring-1 transition-all"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="today"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80 font-medium">Today's Plan</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g. Start on the dashboard layout, review PRs..."
                    className="min-h-[100px] resize-none bg-background focus-visible:ring-1 transition-all"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="blockers"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80 font-medium">Blockers</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g. Waiting on design assets..."
                    className="min-h-[80px] resize-none bg-background focus-visible:ring-1 transition-all"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl text-base font-semibold group relative overflow-hidden"
            disabled={isPending}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Summary...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Standup
                  <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </>
              )}
            </span>
            {!isPending && (
              <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-r from-primary via-primary/90 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
