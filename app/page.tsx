import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import DiscountBanner from "@/components/DiscountBanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="relative min-h-dvh">
      <Navbar />
      <Hero />
      {/* <Features /> */}
      <About />
      <Services />
      <Projects />
      <Testimonials />
      <DiscountBanner />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
}