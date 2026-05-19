import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import LoanCalculator from "@/components/LoanCalculator";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import AppShowcase from "@/components/AppShowcase";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <LoanCalculator />
      <HowItWorks />
      <Testimonials />
      <AppShowcase />
      <FAQ />
      <Footer />
    </main>
  );
}