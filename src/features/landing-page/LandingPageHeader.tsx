"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export default function LandingPageHeader() {
  const [open, setOpen] = useState(false);

  // Variants untuk mobile menu (slide dari atas + fade)
const menuVariants = {
  closed: {
    y: "-100%",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    } as const,
  },
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      when: "beforeChildren" as const,
      staggerChildren: 0.08,
    } as const,
  },
} satisfies Variants; // ini cara modern & paling aman (TS 4.9+)

  // Variants untuk setiap item menu (fade + slide up kecil)
  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0, transition: { ease: "easeOut" } },
  } satisfies Variants;

  // Variants untuk backdrop
  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#6998FF] rounded-lg flex items-center justify-center">
            <Image
              src="/icons/inventa_icon_white.png"
              alt="Logo"
              width={24}
              height={28}
            />
          </div>
          <span className="text-xl font-semibold text-gray-900">Inventa</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="text-gray-700 hover:text-gray-900 transition">
            How it works
          </Link>
          <Link href="#features" className="text-gray-700 hover:text-gray-900 transition">
            Features
          </Link>
          <Link href="#pricing" className="text-gray-700 hover:text-gray-900 transition">
            Pricing
          </Link>
          <Link href="#help" className="text-gray-700 hover:text-gray-900 transition">
            Help
          </Link>
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-gray-700 hover:text-gray-900 font-medium transition">
            Log in
          </Link>
          <Link
            href="/subscribe"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Subscribe
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu dengan Animasi */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-x-0 top-[72px] z-50 bg-white shadow-lg rounded-b-2xl md:hidden overflow-hidden"
            >
              <div className="px-6 py-8 space-y-6">
                {/* Nav Items */}
                <nav className="flex flex-col gap-5">
                  {["How it works", "Features", "Pricing", "Help"].map((text) => (
                    <motion.div key={text} variants={itemVariants}>
                      <Link
                        href={text === "How it works" ? "#how-it-works" :
                              text === "Features" ? "#features" :
                              text === "Pricing" ? "#pricing" : "#help"}
                        onClick={() => setOpen(false)}
                        className="text-lg font-medium text-gray-800 hover:text-blue-600 transition"
                      >
                        {text}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Auth Buttons */}
                <motion.div variants={itemVariants} className="pt-6 border-t border-gray-200 space-y-4">
                  <Link
                    onClick={() => setOpen(false)}
                    href="/login"
                    className="block text-lg font-medium text-gray-700 hover:text-blue-600 transition text-center"
                  >
                    Log in
                  </Link>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/subscribe"
                    className="block bg-blue-600 text-white text-center px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition text-lg"
                  >
                    Subscribe
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}