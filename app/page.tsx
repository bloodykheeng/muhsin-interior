import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { getActiveHeroSlidesServer } from "@/services/hero-slides-server-service"; // ← server file
import { HERO_SLIDES_QUERY_KEY } from "@/services/hero-slides-service";

export default async function Home() {
  // ── Prefetch on the server ──────────────────────────────────────────────────
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: HERO_SLIDES_QUERY_KEY,
    queryFn: getActiveHeroSlidesServer,
  });

  return (
    // ── Dehydrate cache and pass it to the client ─────────────────────────────
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative min-h-dvh">
        <Navbar />
        <Hero />
        {/* <Features /> */}
        <About />
        <Services />
        <Projects />
        {/* <Testimonials /> */}
        {/* <DiscountBanner /> */}
        <Contact />
        <Footer />
        <ScrollToTop />
      </main>
    </HydrationBoundary>
  );
}