import { useStandups } from "@/hooks/use-standups";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { CheckCircle2, Rocket, AlertTriangle, Clock, Ghost, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function StandupFeed() {
  const { data: standups, isLoading, error } = useStandups();

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card border rounded-2xl p-6 md:p-8">
            <Skeleton className="h-6 w-1/3 mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8 text-center">
        <AlertTriangle className="w-10 h-10 text-destructive mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-destructive">Failed to load feed</h3>
        <p className="text-destructive/80 mt-2">Please try refreshing the page.</p>
      </div>
    );
  }

  if (!standups || standups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed rounded-2xl bg-muted/10">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
          <Ghost className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">No standups yet</h3>
        <p className="text-muted-foreground max-w-sm">
          Write your first update on the left. The AI will transform it into a polished summary here.
        </p>
      </div>
    );
  }

  // Sort standups by newest first
  const sortedStandups = [...standups].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="space-y-6 pb-20"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {sortedStandups.map((standup) => (
        <motion.div 
          key={standup.id} 
          variants={item}
          className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-center gap-2 text-muted-foreground mb-6 pb-4 border-b border-border/50">
            <Clock className="w-4 h-4" />
            <time className="text-sm font-medium">
              {format(new Date(standup.createdAt), "MMMM d, yyyy 'at' h:mm a")}
            </time>
          </div>

          <div className="space-y-8">
            {/* Completed Section */}
            <div className="group">
              <h4 className="flex items-center gap-2.5 font-semibold text-base text-foreground mb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                Completed
              </h4>
              <div className="pl-11 text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                {standup.summaryCompleted || "Nothing reported."}
              </div>
            </div>

            {/* Planned Section */}
            <div className="group">
              <h4 className="flex items-center gap-2.5 font-semibold text-base text-foreground mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
                  <Rocket className="w-4 h-4" />
                </div>
                Planned
              </h4>
              <div className="pl-11 text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                {standup.summaryPlanned || "Nothing reported."}
              </div>
            </div>

            {/* Blockers Section */}
            {standup.summaryBlockers && standup.summaryBlockers.toLowerCase() !== "none" && (
              <div className="group">
                <h4 className="flex items-center gap-2.5 font-semibold text-base text-foreground mb-3">
                  <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-600">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  Blockers
                </h4>
                <div className="pl-11 text-rose-600/90 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                  {standup.summaryBlockers}
                </div>
              </div>
            )}
            {/* Weak Areas Section */}
            {standup.weakAreas && standup.weakAreas.toLowerCase() !== "none" && (
              <div className="group bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 mt-4">
                <h4 className="flex items-center gap-2.5 font-semibold text-sm text-amber-700 mb-2">
                  <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  Insights & Weak Areas
                </h4>
                <div className="pl-8 text-amber-800/80 text-xs leading-relaxed whitespace-pre-wrap italic">
                  {standup.weakAreas}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
