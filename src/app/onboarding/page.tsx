'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Table, BarChart3, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const onboardingSteps = [
    {
        icon: Upload,
        iconColor: 'bg-blue-500',
        title: 'Import Your Data',
        description:
            'Upload data files from your POS system. We seamlessly integrate and get daily purchase updates.',
        skipButton: true,
        background: '/backgrounds/onboarding_bg_1.png',
    },
    {
        icon: Table,
        iconColor: 'bg-green-500',
        title: 'Map Your Columns',
        description:
            "We'll try to match them to your file, but you might need to map a few columns to ensure accuracy.",
        skipButton: false,
        background: '/backgrounds/onboarding_bg_1.png',
    },
    {
        icon: BarChart3,
        iconColor: 'bg-yellow-500',
        title: 'Track Your Stock',
        description:
            'View real-time insights on sales trends, stock levels and product performance - all in one place',
        skipButton: false,
        background: '/backgrounds/onboarding_bg_1.png',
    },
    {
        icon: Lightbulb,
        iconColor: 'bg-purple-500',
        title: 'Get Smart Recommendations',
        description:
            'Receive AI-powered suggestions on what to order and when based on your sales patterns',
        skipButton: false,
        background: '/backgrounds/onboarding_bg_1.png',
    },
];

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const router = useRouter();

    const handleNext = () => {
        if (currentStep < onboardingSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // step terakhir -> ke dashboard
            router.push('/dashboard');
        }
    };

    const handleSkip = () => {
        // skip onboarding langsung ke dashboard
        router.push('/dashboard');
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const currentStepData = onboardingSteps[currentStep];
    const Icon = currentStepData.icon;

    return (
        <div className='min-h-screen bg-linear-to-br from-blue-600 to-indigo-800/45 flex items-center justify-center p-4 relative overflow-hidden'>
            {/* Background Image */}
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className='absolute inset-0'
                >
                    <Image
                        src={currentStepData.background}
                        alt='Background'
                        fill
                        className='object-cover opacity-20'
                        priority
                    />
                </motion.div>
            </AnimatePresence>

            {/* Onboarding Card */}
            <div className='relative w-full max-w-2xl'>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className='bg-white rounded-3xl shadow-2xl p-12 border border-gray-100 backdrop-blur-sm'
                    >
                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                delay: 0.2,
                                type: 'spring',
                                stiffness: 200,
                                damping: 15,
                            }}
                            className='flex justify-center mb-8'
                        >
                            <div
                                className={`${currentStepData.iconColor} rounded-3xl p-6 shadow-xl`}
                            >
                                <Icon className='w-12 h-12 text-white' strokeWidth={2} />
                            </div>
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className='text-4xl font-bold text-center text-gray-800 mb-6'
                        >
                            {currentStepData.title}
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className='text-center text-gray-600 mb-10 text-lg leading-relaxed max-w-xl mx-auto'
                        >
                            {currentStepData.description}
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className='flex gap-4 justify-center'
                        >
                            {/* Skip hanya di step pertama */}
                            {currentStep === 0 && (
                                <button
                                    onClick={handleSkip}
                                    className='px-8 py-3.5 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-base'
                                >
                                    Skip
                                </button>
                            )}

                            {/* Back di step 2–4 */}
                            {currentStep > 0 && (
                                <button
                                    onClick={handleBack}
                                    className='px-8 py-3.5 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-base'
                                >
                                    Back
                                </button>
                            )}

                            <button
                                onClick={handleNext}
                                className='px-10 py-3.5 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl text-base'
                            >
                                {currentStep === onboardingSteps.length - 1
                                    ? 'Get Started'
                                    : 'Next'}
                            </button>
                        </motion.div>

                        {/* Progress Indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className='flex justify-center gap-3 mt-10'
                        >
                            {onboardingSteps.map((_, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.7 + index * 0.1 }}
                                    className={`h-2.5 rounded-full transition-all duration-300 ${index === currentStep
                                            ? 'w-10 bg-blue-500'
                                            : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                                        }`}
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}