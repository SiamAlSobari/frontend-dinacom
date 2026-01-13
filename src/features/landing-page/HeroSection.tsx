import Image from 'next/image'
import React from 'react'

export default function HeroSection() {
  return (
    <section className="relative min-h-240 mb-100 px-6 pt-20">

      {/* WRAPPER BG (ini yang rounded & overflow hidden) */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-blue-800 rounded-b-[50px] overflow-hidden z-0">

        <Image
          src="/backgrounds/hero_bg.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-br from-blue-600/80 to-blue-800/80" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Smart Restock
          <br />
          Recommendations for Small
          <br />
          Retailers
        </h1>

        <p className="text-lg mb-8 opacity-90">
          Harness the power of AI to optimize your inventory management.
          <br />
          Get data-driven insights on exactly what products you should order.
        </p>

        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Get Started Now
        </button>
      </div>

      {/* DASHBOARD */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-20 w-[90%] max-w-6xl pointer-events-none">
        <Image
          src="/backgrounds/dashboard.png"
          alt="Dashboard Illustration"
          width={1600}
          height={1000}
          className="w-full h-auto object-contain drop-shadow-2xl"
          priority
        />
      </div>

    </section>
  )
}
