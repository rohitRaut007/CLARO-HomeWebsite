import { ArrowLeft, Lock, ArrowUp, ChevronRight } from "lucide-react";

export function Download() {
  return (
    <section id="download" className="relative py-20 md:py-32 overflow-hidden border-t border-white/5">
      {/* Ambient glowing background orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,oklch(0.65_0.18_280/0.18),transparent_70%)] blur-3xl animate-pulse-glow" />
        <div className="absolute left-[5%] bottom-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.2_240/0.08),transparent_70%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-16 lg:flex-row">
          
          {/* Left Column: Premium Value Proposition & App Buttons */}
          <div className="flex-1 text-center lg:text-left">
            {/* Premium Pill Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Private. Encrypted. Yours.
            </div>

            {/* Headline */}
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-gradient">
              Take clarity
              <br />
              with you.
            </h2>

            {/* Subheadline */}
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground lg:mx-0">
              Your private reflection space — available on iPhone and Android. Clear the thought before it controls you, wherever you are.
            </p>

            {/* App Store and Google Play buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              
              {/* Apple App Store */}
              <a
                href="IOS_LINK_HERE"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-3 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_0_30px_oklch(0.65_0.18_280/0.2)] active:scale-95"
                aria-label="Download on the App Store"
              >
                <svg className="h-6 w-6 text-foreground transition-transform group-hover:scale-105" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z"/>
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground/80 leading-none">Download on the</span>
                  <span className="text-sm font-semibold text-foreground leading-tight mt-0.5">App Store</span>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="ANDROID_LINK_HERE"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-3 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_0_30px_oklch(0.65_0.18_280/0.2)] active:scale-95"
                aria-label="Get it on Google Play"
              >
                <svg className="h-6 w-6 text-foreground transition-transform group-hover:scale-105" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.25 2.25c-.246 0-.476.098-.65.27l9.9 9.9 4.275-2.43c.96-.547.96-1.442 0-1.99l-12.825-7.3c-.22-.124-.467-.18-.7-.18zm-1.5 1.05c-.098.174-.15.378-.15.6v16.2c0 .222.052.426.15.6l8.85-8.85-8.85-8.85zm1.5 16.98c.233 0 .48-.056.7-.18l12.825-7.3c.96-.548.96-1.443 0-1.99L13.65 11.7l-9.9 9.9c.174.172.404.27.65.27z"/>
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground/80 leading-none">Get it on</span>
                  <span className="text-sm font-semibold text-foreground leading-tight mt-0.5">Google Play</span>
                </div>
              </a>

            </div>

            {/* QR Code and desktop integration */}
            <div className="mt-12 hidden items-center justify-center gap-6 lg:flex lg:justify-start">
              
              {/* Premium vector Mock QR Code */}
              <div className="group relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-2.5 backdrop-blur-sm">
                <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-violet-500/20 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
                <svg className="relative h-full w-full text-foreground/80 group-hover:text-foreground transition-colors" viewBox="0 0 100 100" fill="currentColor">
                  {/* Position squares */}
                  <rect x="5" y="5" width="25" height="25" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="12" y="12" width="11" height="11" rx="2" />
                  
                  <rect x="70" y="5" width="25" height="25" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="77" y="12" width="11" height="11" rx="2" />
                  
                  <rect x="5" y="70" width="25" height="25" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="12" y="77" width="11" height="11" rx="2" />

                  {/* Aesthetic random dot blocks of QR */}
                  <rect x="42" y="5" width="6" height="15" rx="1.5" />
                  <rect x="52" y="12" width="12" height="6" rx="1.5" />
                  <rect x="42" y="24" width="18" height="6" rx="1.5" />
                  <rect x="5" y="42" width="15" height="6" rx="1.5" />
                  <rect x="5" y="52" width="6" height="12" rx="1.5" />
                  
                  <rect x="24" y="42" width="12" height="12" rx="2" />
                  <rect x="42" y="42" width="16" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
                  
                  <rect x="70" y="42" width="12" height="6" rx="1.5" />
                  <rect x="86" y="42" width="9" height="18" rx="1.5" />
                  <rect x="70" y="54" width="6" height="12" rx="1.5" />
                  
                  <rect x="42" y="70" width="12" height="6" rx="1.5" />
                  <rect x="42" y="80" width="6" height="15" rx="1.5" />
                  <rect x="54" y="76" width="10" height="18" rx="1.5" />
                  
                  <rect x="70" y="70" width="15" height="6" rx="1.5" />
                  <rect x="80" y="80" width="15" height="15" rx="3" />
                  
                  {/* Central design element (small glowing dot) */}
                  <circle cx="50" cy="50" r="5" className="fill-accent animate-pulse" />
                </svg>
              </div>

              <div className="text-left">
                <span className="text-sm font-medium text-foreground flex items-center gap-1">
                  Scan to download instantly
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                </span>
                <p className="text-xs text-muted-foreground/80 mt-1">Point your camera to jump directly to your store.</p>
              </div>

            </div>
          </div>

          {/* Right Column: Pure CSS Floating Phone Mockup */}
          <div className="relative flex flex-1 justify-center lg:justify-end">
            
            {/* Phone Chassis */}
            <div className="animate-float relative z-10 w-[290px] h-[580px] sm:w-[310px] sm:h-[620px] rounded-[3.25rem] border-[9px] border-white/10 bg-black p-3 shadow-[0_40px_100px_-20px_oklch(0.02_0_0/0.9)] outline outline-1 outline-white/5 select-none">
              
              {/* Dynamic Island Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-between px-3.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <span className="h-1.5 w-5 rounded-full bg-white/25" />
              </div>

              {/* Inner Screen Screen Content */}
              <div className="w-full h-full rounded-[2.75rem] overflow-hidden bg-background relative flex flex-col p-4 pt-10">
                
                {/* Status Bar */}
                <div className="flex items-center justify-between px-2 pb-3 text-[10px] font-medium text-muted-foreground/80 border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <Lock className="h-3 w-3 text-accent" />
                    <span>Encrypted session</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-1 w-1.5 bg-current rounded-sm" />
                    <span className="h-1 w-2 bg-current rounded-sm" />
                    <span className="h-1 w-3 bg-current rounded-sm" />
                  </div>
                </div>

                {/* Chat content container */}
                <div className="flex-1 space-y-5 pt-5 text-left text-xs overflow-hidden">
                  
                  {/* Claro Turn */}
                  <div className="animate-fade-up opacity-0" style={{ animationDelay: "100ms" }}>
                    <div className="mb-1 text-[8px] uppercase tracking-widest text-accent-gradient font-medium">Claro</div>
                    <p className="font-display text-lg text-gradient leading-tight">
                      What are you holding onto that is no longer serving you?
                    </p>
                  </div>

                  {/* You Turn */}
                  <div className="flex justify-end animate-fade-up opacity-0" style={{ animationDelay: "600ms" }}>
                    <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-white/[0.05] px-3.5 py-2.5 text-[12px] text-foreground/90 leading-relaxed">
                      The need to control every single step. It's exhausting.
                    </div>
                  </div>

                  {/* Claro Turn 2 */}
                  <div className="animate-fade-up opacity-0" style={{ animationDelay: "1200ms" }}>
                    <div className="mb-1 text-[8px] uppercase tracking-widest text-accent-gradient font-medium">Claro</div>
                    <p className="font-display text-lg text-gradient leading-tight">
                      If you let go of the step... what stays?
                    </p>
                  </div>

                  {/* Thinking/Pulsing State */}
                  <div className="flex items-center gap-1.5 pl-2 pt-1 text-muted-foreground/60 animate-fade-up opacity-0" style={{ animationDelay: "1800ms" }}>
                    <span className="h-1 w-1 rounded-full bg-current animate-blink" />
                    <span className="h-1 w-1 rounded-full bg-current animate-blink" style={{ animationDelay: "0.2s" }} />
                    <span className="h-1 w-1 rounded-full bg-current animate-blink" style={{ animationDelay: "0.4s" }} />
                  </div>

                </div>

                {/* Bottom Input Field */}
                <div className="pt-2">
                  <div className="glass-strong flex items-center gap-2 rounded-2xl p-2">
                    <div className="flex-1 text-[11px] text-muted-foreground/60 pl-2">
                      Type freely...
                    </div>
                    <button className="flex h-7 w-7 items-center justify-center rounded-xl bg-foreground text-background shrink-0" disabled aria-label="Send">
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Glowing backdrop shadow element */}
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.65_0.18_280/0.25),transparent_70%)] blur-3xl" />
          </div>

        </div>
      </div>
    </section>
  );
}
