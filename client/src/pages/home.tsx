import { StandupForm } from "@/components/standup-form";
import { StandupFeed } from "@/components/standup-feed";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Refined Navigation / Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <h1 className="font-display font-bold text-xl tracking-tight text-foreground">
              Standup<span className="text-muted-foreground font-medium">AI</span>
            </h1>
          </div>
          
          <div className="text-sm font-medium text-muted-foreground hidden sm:block">
            Smart Daily Summaries
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column - Input Form (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <StandupForm />
          </div>

          {/* Right Column - History Feed */}
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-foreground">Activity Feed</h2>
              <div className="h-px flex-1 bg-border/60 ml-6"></div>
            </div>
            <StandupFeed />
          </div>

        </div>
      </main>
    </div>
  );
}
