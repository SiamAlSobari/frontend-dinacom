"use client";

import LandingPageHeader from "@/features/landing-page/LandingPageHeader";
import StepManagement from "@/features/landing-page/StepManagement";
import HeroSection from "@/features/landing-page/HeroSection";
import Features from "@/features/landing-page/Features";
import Pricing from "@/features/landing-page/Pricing";
import Footer from "@/features/landing-page/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LandingPageHeader />
      <HeroSection />
      <StepManagement />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}
