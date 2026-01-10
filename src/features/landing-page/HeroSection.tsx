import Image from 'next/image'
import React from 'react'

export default function HeroSection() {
  return (
      <section className="relative min-h-screen mb-100 mx-10 bg-gradient-to-br from-blue-600 to-blue-800 text-white px-6 rounded-b-[50px] overflow-hidden flex pt-20 ">
        <div className="absolute inset-0 z-0">
          <Image
            src="/backgrounds/hero_bg.png"
            alt="Hero Background"
            fill
            priority
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-blue-800/80 z-0"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
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
      </section>
  )
}
