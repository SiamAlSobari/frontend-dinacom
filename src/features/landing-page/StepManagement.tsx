import React from 'react'
import { Package, Lightbulb, CreditCard } from "lucide-react";

type StepItem = {
  title: string;
  desc: string;
  icon: any;
  color: {
    bg: string;
    text: string;
    border: string;
  };
};

const STEPS: StepItem[] = [
  {
    title: "Set base stock",
    desc: "Select top important SKUs as base stock.",
    icon: Package,
    color: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
    },
  },
  {
    title: "Get recommendations",
    desc: "Receive qty ranges, risk level, and short recommendations.",
    icon: Lightbulb,
    color: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-200",
    },
  },
  {
    title: "Connect transactions",
    desc: "Import transaction data from your POS",
    icon: CreditCard,
    color: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-200",
    },
  },
];

function StepCard({ item }: { item: StepItem }) {
  const Icon = item.icon;

  return (
    <div className={`bg-white p-5 rounded-xl shadow-md border ${item.color.border} hover:shadow-lg transition-all duration-300 h-full`}>
      <div className="flex items-start gap-3">
        <div
          className={`w-11 h-11 ${item.color.bg} rounded-lg flex items-center justify-center shrink-0`}
        >
          <Icon className={`w-5 h-5 ${item.color.text}`} />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm mb-1">
            {item.title}
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed">
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function StepManagement() {
  return (
    <section className="relative py-60  overflow-hidden">

      {/* TITLE */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mb-14">
        <span className="inline-block mb-3 text-blue-600 font-semibold text-xs tracking-wide uppercase">
          CHECK THIS OUT
        </span>

        <h2 className="text-3xl font-bold mb-2 text-gray-900">
          How It Works
        </h2>

        <p className="text-gray-500 text-sm">
          Three simple steps to smarter inventory management
        </p>
      </div>

      {/* DECORATION */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute left-0 bottom-40 w-full h-50">
          <svg viewBox="0 0 1000 200" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M 0 100 Q 250 30, 500 100 Q 750 170, 1000 100"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="70"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* CARDS */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">

        {/* ROW 1 */}
        <div className="flex justify-center items-stretch gap-6 mb-6 flex-wrap md:flex-nowrap">
          <div className="w-full max-w-md">
            <StepCard item={STEPS[0]} />
          </div>

          <div className="w-full max-w-md">
            <StepCard item={STEPS[1]} />
          </div>
        </div>

        {/* ROW 2 */}
        <div className="flex justify-center mt-2">
          <div className="w-full max-w-md">
            <StepCard item={STEPS[2]} />
          </div>
        </div>

      </div>
    </section>
  );
}
