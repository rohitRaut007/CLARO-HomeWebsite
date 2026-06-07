import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/claro/Nav";
import { Hero } from "@/components/claro/Hero";
import { Privacy } from "@/components/claro/Privacy";
import { HowItWorks } from "@/components/claro/HowItWorks";
import { Demo } from "@/components/claro/Demo";
import { Features } from "@/components/claro/Features";
import { Experience } from "@/components/claro/Experience";
import { Download } from "@/components/claro/Download";
import { FinalCTA } from "@/components/claro/FinalCTA";
import { Footer } from "@/components/claro/Footer";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Nav />
      <Hero />
      <Privacy />
      <HowItWorks />
      <Demo />
      <Features />
      <Experience />
      <Download />
      <FinalCTA />
      <Footer />
    </main>
  );
}
