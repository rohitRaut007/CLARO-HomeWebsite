import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUp, Lock } from "lucide-react";

export const Route = createFileRoute("/session")({
  head: () => ({
    meta: [
      { title: "Session — Claro" },
      { name: "description", content: "A private, AI-guided reflection session." },
    ],
  }),
  component: Session,
});

type Turn = { role: "you" | "claro"; text: string };

const questions = [
  "What does that feeling want you to notice?",
  "When you say that — whose voice does it sound like?",
  "If nothing changed, what would you lose?",
  "What's the smallest piece of this that's actually true?",
  "What would it mean if you stopped trying to solve this for a moment?",
];

function Session() {
  const router = useRouter();
  const [turns, setTurns] = useState<Turn[]>([
    { role: "claro", text: "Take a breath. What's on your mind right now?" },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [turns, thinking]);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      router.navigate({ to: "/" });
    }
  };

  const send = () => {
    const text = input.trim();
    if (!text || thinking) return;
    setTurns((t) => [...t, { role: "you", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const next = questions[qIndex % questions.length];
      setTurns((t) => [...t, { role: "claro", text: next }]);
      setQIndex((i) => i + 1);
      setThinking(false);
    }, 1400);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ambient mood glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,oklch(0.55_0.2_275/0.18),transparent_70%)] blur-3xl animate-pulse-glow" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.2_240/0.12),transparent_70%)] blur-3xl" />
      </div>

      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" />
            <span>Encrypted session</span>
          </div>
          <button
            onClick={handleBack}
            className="rounded-full p-2 text-muted-foreground transition-all hover:bg-white/5 hover:text-foreground active:scale-95 focus:outline-none focus:ring-1 focus:ring-accent/50"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Conversation */}
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-4 pt-24 pb-32 md:px-6 md:pt-28 md:pb-40">
        <div className="flex-1 space-y-10">
          {turns.map((t, i) => (
            <SessionTurn key={i} turn={t} />
          ))}
          {thinking && (
            <div className="flex items-center gap-1.5 pt-2 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-blink" />
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-blink" style={{ animationDelay: "0.2s" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-blink" style={{ animationDelay: "0.4s" }} />
            </div>
          )}
          <div ref={endRef} />
        </div>
      </main>

      {/* Floating input */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-2xl px-4 pb-4 md:px-6 md:pb-8">
          <div className="glass-strong flex items-end gap-3 rounded-3xl p-3 shadow-[0_20px_60px_-20px_oklch(0.05_0_0/0.8)]">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={1}
              placeholder="Type freely. Nothing has to make sense yet."
              className="flex-1 resize-none bg-transparent px-3 py-2.5 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
              style={{ minHeight: 44, maxHeight: 160 }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || thinking}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-foreground text-background transition-all hover:shadow-[0_0_30px_oklch(0.7_0.18_280/0.5)] disabled:opacity-30 disabled:hover:shadow-none"
              aria-label="Send"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-3 text-center text-[11px] text-muted-foreground/70">
            Claro reflects — it does not advise. Press Enter to send.
          </p>
        </div>
      </div>
    </div>
  );
}

function SessionTurn({ turn }: { turn: Turn }) {
  if (turn.role === "claro") {
    return (
      <div className="opacity-0 animate-fade-up min-w-0">
        <div className="mb-2 text-[10px] uppercase tracking-[0.25em] font-medium text-accent-gradient">
          Claro
        </div>
        <p className="font-display text-2xl leading-snug text-gradient md:text-3xl break-words">
          {turn.text}
        </p>
      </div>
    );
  }
  return (
    <div className="flex justify-end opacity-0 animate-fade-up min-w-0">
      <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-white/[0.05] px-4 py-3 text-[15px] leading-relaxed text-foreground/90 break-words">
        {turn.text}
      </p>
    </div>
  );
}
