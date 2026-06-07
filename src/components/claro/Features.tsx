import { Brain, ScanSearch, Waves, RefreshCw, GitBranch, ShieldCheck } from "lucide-react";

const features = [
  { icon: Brain, title: "Stateful memory", body: "Claro remembers the threads you're pulling on across sessions — without forcing continuity." },
  { icon: ScanSearch, title: "Bias detection", body: "Quietly notices distortions: catastrophizing, mind-reading, all-or-nothing patterns." },
  { icon: Waves, title: "Tone matching", body: "Adapts cadence to your emotional state. Gentle when raw, sharper when stuck." },
  { icon: RefreshCw, title: "Reflection engine", body: "A questioning model — not a generation model. Trained on Socratic dialogue, not influencer scripts." },
  { icon: GitBranch, title: "Loop tracking", body: "Surfaces recurring themes over time so you can see the shape of your own mind." },
  { icon: ShieldCheck, title: "Encrypted storage", body: "Zero-knowledge architecture. Even we cannot decrypt your sessions." },
];

export function Features() {
  return (
    <section id="features" className="relative py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Under the calm</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-gradient">
            Quietly intelligent.
          </h2>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px overflow-hidden rounded-3xl border border-white/5 bg-white/5">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group relative bg-[oklch(0.16_0.005_285)] p-8 transition-colors hover:bg-[oklch(0.19_0.006_285)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.2_275/0.18),transparent_70%)] blur-2xl" />
              </div>
              <Icon className="h-5 w-5 text-foreground/60" />
              <h3 className="mt-6 text-base font-medium text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
