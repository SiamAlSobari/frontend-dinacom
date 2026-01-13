"use client";

import LandingPageHeader from "@/features/landing-page/LandingPageHeader";
import Image from "next/image";
import { Package, Lightbulb, CreditCard } from "lucide-react";
import StepManagement from "@/features/landing-page/StepManagement";
import HeroSection from "@/features/landing-page/HeroSection";



export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LandingPageHeader />
      <HeroSection  />
      <StepManagement />
    </div>
  );
}
