import React from 'react'
import { Check, Phone } from 'lucide-react'

export default function Pricing() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 via-blue-400/40 to-blue-200/30 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to manage inventory smarter
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Left Column - 2 Pricing Cards */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Pricing Card 1 */}
            <div className="bg-white rounded-2xl shadow-lg px-8 pt-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-6">
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      STARTER
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-gray-900">$20</span>
                      <span className="text-xl text-gray-600">/month</span>
                    </div>
                  </div>

                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg mb-8 transition-colors">
                    Get Started now
                  </button>
                </div>

                <ul className="space-y-4 flex-1">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Flexible data mapping & cleanup</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Data export for stock, POS, and decisions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Bulk daily activity capture</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Low stock alerts and monitoring</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pricing Card 2 */}
            <div className="bg-white rounded-2xl shadow-lg px-8 pt-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-6">
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      STARTER
                    </span>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-gray-900">$20</span>
                      <span className="text-xl text-gray-600">/month</span>
                    </div>
                  </div>

                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg mb-8 transition-colors">
                    Get Started now
                  </button>
                </div>

                <ul className="space-y-4 flex-1">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Flexible data mapping & cleanup</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Data export for stock, POS, and decisions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Bulk daily activity capture</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Low stock alerts and monitoring</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Us Card */}
          <div className="lg:col-span-1">
            <div className="bg-blue-600 rounded-2xl shadow-lg p-8 text-white hover:shadow-xl transition-shadow h-full">
              <div className="flex flex-col items-center text-center h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-6">
                    Contact Us
                  </h3>
                  
                  <p className="text-blue-100 mb-8 leading-relaxed">
                    Need something? Send us a message and we'll get back soon
                  </p>
                </div>

                <button className="w-full bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-6 rounded-lg transition-colors">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
