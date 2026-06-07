export function Experience() {
  return (
    <section className="relative py-20 md:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,oklch(0.55_0.2_275/0.18),transparent_70%)] blur-3xl animate-pulse-glow" />
      </div>
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.1] text-gradient">
          Not every problem
          <br />
          needs <em className="italic text-accent-gradient">advice.</em>
        </p>
        <p className="mx-auto mt-10 max-w-xl text-lg text-muted-foreground">
          Sometimes you just need to hear your own mind clearly.
        </p>
      </div>
    </section>
  );
}
