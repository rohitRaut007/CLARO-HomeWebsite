import { Link } from "@tanstack/react-router";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background via-background/95 to-transparent pt-4 pb-12 md:pt-5 md:pb-16 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <nav className="glass flex items-center justify-between rounded-full px-5 py-2.5">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="relative inline-flex h-6 w-6 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[oklch(0.78_0.14_240)] to-[oklch(0.7_0.18_290)] blur-md opacity-70" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[oklch(0.85_0.12_240)] to-[oklch(0.7_0.18_290)]" />
            </span>
            <span className="text-[15px] font-medium tracking-tight">Claro</span>
          </Link>
          <div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#download" className="transition-colors hover:text-foreground">Download</a>
            <a href="#privacy" className="transition-colors hover:text-foreground">Privacy</a>
          </div>
          <Link
            to="/session"
            className="rounded-full bg-foreground/95 px-4 py-1.5 text-sm font-medium text-background transition-colors hover:bg-foreground"
          >
            Begin
          </Link>
        </nav>
      </div>
    </header>
  );
}
