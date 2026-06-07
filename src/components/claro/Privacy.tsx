import { Lock, KeyRound, EyeOff, Heart } from "lucide-react";

const items = [
  { icon: Lock, title: "End-to-end encrypted", body: "Your thoughts are sealed before they leave your device. We can't read them. Neither can anyone else." },
  { icon: KeyRound, title: "Your logs, your keys", body: "Export, archive, or permanently erase any session. Nothing about you is held hostage." },
  { icon: EyeOff, title: "No advice. No judgment.", body: "Claro reflects — it does not prescribe. It will never tell you what to think or feel." },
  { icon: Heart, title: "Designed for reflection", body: "Built with therapists and researchers. Tuned for clarity, not engagement metrics." },
];

export function Privacy() {
  return (
    <section id="privacy" className="relative py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">A private room</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-gradient">
            What you share here, stays here.
          </h2>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[oklch(0.18_0.005_285/0.5)] p-6 transition-all hover:border-white/10 hover:bg-[oklch(0.2_0.006_285/0.6)]"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.2_275/0.2),transparent_70%)] opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
              <Icon className="h-5 w-5 text-foreground/70" />
              <h3 className="mt-5 text-[15px] font-medium text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
