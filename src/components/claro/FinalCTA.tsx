import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative py-16 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[oklch(0.16_0.005_285)] p-6 sm:p-10 md:p-16 text-center">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.2_240/0.3),transparent_70%)] blur-3xl" />
            <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.2_310/0.3),transparent_70%)] blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-gradient">
              The clearest answers
              <br />
              are usually already <em className="italic text-accent-gradient">inside you.</em>
            </h2>
            <div className="mt-10">
              <Link
                to="/session"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition-all hover:shadow-[0_0_50px_oklch(0.7_0.18_280/0.5)]"
              >
                Start your first thought session
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">No account required to begin. Encrypted by default.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
