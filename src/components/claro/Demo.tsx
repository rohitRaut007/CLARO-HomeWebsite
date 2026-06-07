import { useEffect, useRef, useState } from "react";

type Turn = { role: "you" | "claro"; text: string };

const script: Turn[] = [
  { role: "you", text: "I keep starting projects and never finishing them." },
  { role: "claro", text: "When you stop — what is the feeling right before you walk away?" },
  { role: "you", text: "Boredom, maybe. Or like… I already know how it ends." },
  { role: "claro", text: "If you already know how it ends, what were you really hoping to find by starting?" },
  { role: "you", text: "Honestly? The feeling of being new at something." },
  { role: "claro", text: "So the finish was never the point. The beginning was." },
];

export function Demo() {
  const [visible, setVisible] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visible === 0) {
          script.forEach((_, i) => {
            setTimeout(() => setVisible((v) => Math.max(v, i + 1)), i * 1100);
          });
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return (
    <section id="waitlist" className="relative py-16 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">A real session</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-gradient">
            Watch a loop close itself.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            No advice was given. Notice what changed anyway.
          </p>
        </div>

        <div ref={ref} className="relative mx-auto mt-12 md:mt-16 max-w-2xl">
          <div aria-hidden className="absolute -inset-16 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,oklch(0.55_0.2_275/0.2),transparent_70%)] blur-3xl" />
          <div className="glass-strong rounded-3xl p-6 md:p-10 min-h-[480px] shadow-[0_30px_80px_-20px_oklch(0.1_0_0/0.8)]">
            <div className="space-y-5">
              {script.slice(0, visible).map((t, i) => (
                <DemoBubble key={i} role={t.role} text={t.text} />
              ))}
              {visible > 0 && visible < script.length && (
                <div className="flex items-center gap-1.5 pl-3 text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-current animate-blink" />
                  <span className="h-1.5 w-1.5 rounded-full bg-current animate-blink" style={{ animationDelay: "0.2s" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-current animate-blink" style={{ animationDelay: "0.4s" }} />
                </div>
              )}
            </div>
            {visible === script.length && (
              <div className="mt-10 border-t border-white/5 pt-6 text-center opacity-0 animate-fade-up">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Pattern surfaced</p>
                <p className="mt-2 font-display text-xl text-accent-gradient">Boredom avoidance, novelty seeking.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoBubble({ role, text }: Turn) {
  const isYou = role === "you";
  return (
    <div className={`flex opacity-0 animate-fade-up ${isYou ? "justify-end" : "justify-start"}`}>
      <div
        className={
          isYou
            ? "max-w-[80%] rounded-2xl rounded-br-sm bg-white/[0.06] px-4 py-3 text-[15px] leading-relaxed text-foreground break-words"
            : "max-w-[85%] rounded-2xl rounded-bl-sm border border-white/5 bg-[oklch(0.65_0.18_280/0.08)] px-4 py-3 text-[15px] leading-relaxed text-foreground break-words"
        }
      >
        {!isYou && (
          <div className="mb-1 text-[10px] uppercase tracking-[0.2em] font-medium text-accent-gradient">
            Claro
          </div>
        )}
        {text}
      </div>
    </div>
  );
}
