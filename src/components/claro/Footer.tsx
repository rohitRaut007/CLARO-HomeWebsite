import { Link } from "@tanstack/react-router";
import { Twitter, Github, Instagram, ArrowUp, Lock } from "lucide-react";

export function Footer() {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-white/5 bg-gradient-to-b from-transparent to-black/30 pt-20 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[300px] bg-[radial-gradient(circle_at_center_bottom,oklch(0.55_0.2_275/0.05),transparent_70%)] blur-3xl" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          
          {/* Logo & Statement Column */}
          <div className="flex flex-col items-start gap-4">
            <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
              <span className="relative inline-flex h-6 w-6 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[oklch(0.78_0.14_240)] to-[oklch(0.7_0.18_290)] blur-md opacity-70" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[oklch(0.85_0.12_240)] to-[oklch(0.7_0.18_290)]" />
              </span>
              <span className="text-[17px] font-semibold tracking-tight text-foreground">Claro</span>
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground/80 max-w-[240px]">
              A private reflection space to untangle mental loops. No judgment, no advice.
            </p>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-3.5 py-1.5 text-[11px] text-muted-foreground/80 backdrop-blur-sm select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Private. Encrypted. Yours.
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground/80">Reflection</h4>
            <ul className="space-y-3.5 text-sm text-muted-foreground">
              <li>
                <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
              </li>
              <li>
                <a href="#features" className="transition-colors hover:text-foreground">Features</a>
              </li>
              <li>
                <a href="#download" className="transition-colors hover:text-foreground">Download App</a>
              </li>
              <li>
                <Link to="/session" className="transition-colors hover:text-foreground">Begin Session</Link>
              </li>
            </ul>
          </div>

          {/* Legal & Security Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground/80">Security</h4>
            <ul className="space-y-3.5 text-sm text-muted-foreground">
              <li>
                <a href="#privacy" className="transition-colors hover:text-foreground">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">Contact Support</a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground flex items-center gap-1.5">
                  <Lock className="h-3 w-3 text-accent" />
                  Encryption details
                </a>
              </li>
            </ul>
          </div>

          {/* Download Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-foreground/80">Install Mobile</h4>
            <p className="text-xs leading-relaxed text-muted-foreground/70 max-w-[200px]">
              Keep your reflection space right in your pocket. Offline introspection support.
            </p>
            <div className="flex flex-col gap-2.5 mt-2 w-full max-w-[160px]">
              
              {/* App Store */}
              <a
                href="IOS_LINK_HERE"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-10 items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.01] px-3.5 py-2 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04] hover:shadow-[0_0_20px_oklch(0.65_0.18_280/0.12)] active:scale-95"
                aria-label="Download on the App Store"
              >
                <svg className="h-4 w-4 text-foreground transition-transform group-hover:scale-105" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z"/>
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[7px] uppercase tracking-wider text-muted-foreground/60 leading-none">Get it on</span>
                  <span className="text-[11px] font-semibold text-foreground leading-tight mt-0.5">App Store</span>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="ANDROID_LINK_HERE"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-10 items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.01] px-3.5 py-2 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04] hover:shadow-[0_0_20px_oklch(0.65_0.18_280/0.12)] active:scale-95"
                aria-label="Get it on Google Play"
              >
                <svg className="h-4 w-4 text-foreground transition-transform group-hover:scale-105" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.25 2.25c-.246 0-.476.098-.65.27l9.9 9.9 4.275-2.43c.96-.547.96-1.442 0-1.99l-12.825-7.3c-.22-.124-.467-.18-.7-.18zm-1.5 1.05c-.098.174-.15.378-.15.6v16.2c0 .222.052.426.15.6l8.85-8.85-8.85-8.85zm1.5 16.98c.233 0 .48-.056.7-.18l12.825-7.3c.96-.548.96-1.443 0-1.99L13.65 11.7l-9.9 9.9c.174.172.404.27.65.27z"/>
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[7px] uppercase tracking-wider text-muted-foreground/60 leading-none">Get it on</span>
                  <span className="text-[11px] font-semibold text-foreground leading-tight mt-0.5">Google Play</span>
                </div>
              </a>

            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-white/5 pt-8 flex flex-col-reverse items-center justify-between gap-6 sm:flex-row text-xs text-muted-foreground/50">
          <p>© {new Date().getFullYear()} Claro. Reflection in silence. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="transition-all hover:text-foreground text-muted-foreground/70 hover:scale-105" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="transition-all hover:text-foreground text-muted-foreground/70 hover:scale-105" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="transition-all hover:text-foreground text-muted-foreground/70 hover:scale-105" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
            
            <span aria-hidden className="h-3 w-px bg-white/10 hidden sm:inline" />

            {/* Back to Top */}
            <a
              href="#"
              onClick={scrollToTop}
              className="group hidden sm:flex items-center gap-1 transition-colors hover:text-foreground text-muted-foreground/60"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
