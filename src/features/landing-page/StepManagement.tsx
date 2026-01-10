import Image from 'next/image'
import React from 'react'
import { Package, Lightbulb, CreditCard } from "lucide-react";

type StepItem = {
  title: string;
  desc: string;
  icon: any;
  color: {
    bg: string;
    text: string;
  };
};

const STEPS: StepItem[] = [
  {
    title: "Set base stock",
    desc: "Select top important SKUs as base stock.",
    icon: Package,
    color: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
  },
  {
    title: "Get recommendations",
    desc: "Receive qty ranges, risk level, and short recommendations.",
    icon: Lightbulb,
    color: {
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
  },
  {
    title: "Connect transactions",
    desc: "Import transaction data from your POS",
    icon: CreditCard,
    color: {
      bg: "bg-green-100",
      text: "text-green-600",
    },
  },
];

function StepCard({ item }: { item: StepItem }) {
  const Icon = item.icon;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex items-start gap-4">
        <div
          className={`w-14 h-14 ${item.color.bg} rounded-xl flex items-center justify-center flex-shrink-0`}
        >
          <Icon className={`w-7 h-7 ${item.color.text}`} />
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">{item.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
export default function StepManagement() {
  return (
      <section className="relative py-20 overflow-hidden">
        {/* Title */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-blue-600 font-semibold text-sm tracking-wide border border-blue-600 px-6 py-2 rounded-full">
              CHECK THIS OUT
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 text-lg">
            Three simple steps to smarter inventory management
          </p>
        </div>

        {/* Background Vector */}
        <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none select-none overflow-hidden">
          <Image
            src="/backgrounds/Vector.png"
            alt="How It Works Illustration"
            fill
            className="object-cover object-center opacity-40 scale-110 md:scale-100"
          />
        </div>

        {/* Cards */}
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 mb-10">
            {STEPS.slice(0, 2).map((item, i) => (
              <StepCard key={i} item={item} />
            ))}
          </div>

          <div className="max-w-md mx-auto">
            <StepCard item={STEPS[2]} />
          </div>
        </div>
      </section>
  )
}
