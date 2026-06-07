const steps = [
  { n: "01", title: "Dump the thought", body: "Type what's looping. Raw, unfiltered, contradictory — it doesn't need to make sense yet." },
  { n: "02", title: "Claro asks one deeper question", body: "No advice. No reframe. Just the next question your own mind would ask if it had the space." },
  { n: "03", title: "Reach your own clarity", body: "After a few exchanges, the knot loosens. You leave with your own answer — not someone else's." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-16 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">How it works</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-gradient">
            Three steps. One quiet mind.
          </h2>
        </div>

        <div className="relative mt-12 md:mt-20">
          <div
            aria-hidden
            className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent md:left-[31px]"
          />
          <ol className="space-y-12">
            {steps.map((s, i) => (
              <li key={s.n} className="relative flex gap-6 md:gap-8">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,oklch(0.65_0.18_280/0.4),transparent_70%)] blur-xl" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[oklch(0.18_0.005_285)] font-display text-lg text-accent-gradient">
                    {s.n}
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="font-display text-2xl text-foreground">{s.title}</h3>
                  <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
                {i < steps.length - 1 && <div className="absolute left-0 right-0 -bottom-6" />}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
