import LandingPageHeader from "@/features/landing-page/LandingPageHeader";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LandingPageHeader />
      <section className="relative min-h-screen mx-10 bg-gradient-to-br from-blue-600 to-blue-800 text-white px-6 rounded-b-[50px] overflow-hidden flex items-center">

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/backgrounds/hero_bg.png"
            alt="Hero Background"
            fill
            priority
            className=""
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-blue-800/80 z-0"></div>

        {/* Content */}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Smart Restock<br />Recommendations for Small<br />Retailers
          </h1>
          <p className="text-lg mb-8 opacity-90">
            Harness the power of AI to optimize your inventory management.<br />
            Get data-driven insights on exactly what products you should order.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Get Started Now
          </button>
        </div>

      </section>



      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold mb-2">SIMPLE PROCESS</p>
          <h2 className="text-3xl font-bold border-t-4 border-b-4 border-blue-600 inline-block px-8 py-2">
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Curved line decoration */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1">
            <svg className="w-full h-20" viewBox="0 0 1000 100" preserveAspectRatio="none">
              <path d="M0,50 Q250,10 500,50 T1000,50" stroke="#3B82F6" strokeWidth="3" fill="none" strokeDasharray="10,5" />
            </svg>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center relative z-10">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-bold mb-2">AI-Backed Insight</h3>
            <p className="text-sm text-gray-600">
              Our advanced AI analyzes your sales patterns to predict future demand accurately.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center relative z-10">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔔</span>
            </div>
            <h3 className="font-bold mb-2">Get recommended products</h3>
            <p className="text-sm text-gray-600">
              Receive tailored recommendations on which products to restock and when.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center relative z-10">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="font-bold mb-2">Order with confidence</h3>
            <p className="text-sm text-gray-600">
              Place informed orders, reduce waste, and maximize your profits effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-600">Everything you need to manage inventory perfectly in detail</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">📈</span>
            </div>
            <h3 className="font-bold mb-2">Smart AI Suggestions</h3>
            <p className="text-sm text-gray-600">
              Get recommendations driven by machine learning algorithms.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">📱</span>
            </div>
            <h3 className="font-bold mb-2">Simple, Quick Dashboard</h3>
            <p className="text-sm text-gray-600">
              Easy-to-use interface designed for busy small business owners.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">💰</span>
            </div>
            <h3 className="font-bold mb-2">Saves Time & Money</h3>
            <p className="text-sm text-gray-600">
              Reduce overstock and stockouts, improving your bottom line.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600">Choose a plan that fits your business size and needs</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
            <h3 className="text-xl font-bold mb-2">Basic</h3>
            <p className="text-gray-600 text-sm mb-4">Perfect for startups</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-blue-600">$20</span>
              <span className="text-gray-600"> / month</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-sm">Up to 100 products</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-sm">Basic AI recommendations</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-sm">Email support</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-sm">Dashboard access</span>
              </li>
            </ul>
            <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
              Choose Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-lg relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full">
              POPULAR
            </div>
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <p className="opacity-90 text-sm mb-4">For growing businesses</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$50</span>
              <span className="opacity-90"> / month</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-green-300 mr-2">✓</span>
                <span className="text-sm">Unlimited products</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-300 mr-2">✓</span>
                <span className="text-sm">Advanced AI insights</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-300 mr-2">✓</span>
                <span className="text-sm">Priority support</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-300 mr-2">✓</span>
                <span className="text-sm">Custom reports & analytics</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-300 mr-2">✓</span>
                <span className="text-sm">API access</span>
              </li>
            </ul>
            <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-around opacity-20">
            <div className="w-20 h-20 border-4 border-blue-600 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-blue-400 rounded-full"></div>
            <div className="w-24 h-24 border-4 border-blue-500 rounded-full"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Ready to optimize your inventory?</h2>
            <p className="text-gray-600 mb-8">
              Join hundreds of small retailers who trust our AI for smarter restocking.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4 text-blue-600">Dinacom</h3>
            <p className="text-sm text-gray-600">Smart inventory management for small retailers</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Features</li>
              <li>Pricing</li>
              <li>Case Studies</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>About Us</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Blog</li>
              <li>Help Center</li>
              <li>Documentation</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
