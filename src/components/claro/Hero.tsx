import { Link } from "@tanstack/react-router";
import { Play, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-32">
      {/* ambient gradients */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.55_0.2_275/0.35),transparent_60%)] blur-3xl animate-pulse-glow" />
        <div className="absolute left-[20%] top-[40%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,oklch(0.6_0.18_240/0.25),transparent_70%)] blur-3xl" />
        <div className="absolute right-[15%] top-[30%] h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.2_310/0.2),transparent_70%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-6 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_10px_oklch(0.7_0.18_150)]" />
          Private. Encrypted. Never trained on.
        </div>

        <h1 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.98] text-gradient">
          Clear the thought
          <br />
          <em className="italic text-accent-gradient">before</em> it controls you.
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Claro helps you untangle mental loops through private AI-guided reflection —
          one question at a time. No advice. No judgment.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/session"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:shadow-[0_0_40px_oklch(0.7_0.18_280/0.4)]"
          >
            Start Clearing
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.06]">
            <Play className="h-3.5 w-3.5 fill-current" />
            Watch Demo
          </button>
        </div>

        <HeroConversation />
      </div>
    </section>
  );
}

function HeroConversation() {
  return (
    <div className="relative mx-auto mt-16 md:mt-24 max-w-2xl">
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,oklch(0.55_0.2_275/0.25),transparent_70%)] blur-2xl" />
      <div className="glass-strong rounded-3xl p-5 md:p-8 shadow-[0_30px_80px_-20px_oklch(0.1_0_0/0.8)]">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Session 014</span>
        </div>

        <div className="mt-6 space-y-5 text-left">
          <Bubble role="you" delay={0}>
            I keep saying I'll start, but I never actually begin.
          </Bubble>
          <Bubble role="claro" delay={150}>
            What does the moment <em>just before</em> not starting feel like?
          </Bubble>
          <Bubble role="you" delay={300}>
            Heavy. Like the whole thing has to be perfect before I touch it.
          </Bubble>
          <Bubble role="claro" delay={450}>
            Whose standard of perfect are you protecting?
          </Bubble>
          <div className="flex items-center gap-1.5 pl-3 pt-2 text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-blink" />
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-blink" style={{ animationDelay: "0.2s" }} />
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-blink" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({
  role,
  children,
  delay,
}: {
  role: "you" | "claro";
  children: React.ReactNode;
  delay: number;
}) {
  const isYou = role === "you";
  return (
    <div
      className={`flex opacity-0 animate-fade-up ${isYou ? "justify-end" : "justify-start"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={
          isYou
            ? "max-w-[80%] rounded-2xl rounded-br-sm bg-white/[0.06] px-4 py-2.5 text-[15px] text-foreground break-words"
            : "max-w-[85%] rounded-2xl rounded-bl-sm border border-white/5 bg-[oklch(0.65_0.18_280/0.08)] px-4 py-2.5 text-[15px] text-foreground break-words"
        }
      >
        {!isYou && (
          <div className="mb-1 text-[10px] uppercase tracking-[0.2em] text-accent-gradient font-medium">
            Claro
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
