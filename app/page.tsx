import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import StatisticsSection from "@/components/landing/StatisticsSection";
import Footer from "@/components/layout/Footer";
import { getLandingPageStats } from "@/lib/dashboard-stats";

export default async function HomePage() {
  const stats =
  await getLandingPageStats();
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatisticsSection stats={stats} />
      <Footer />
    </main>
  );
}