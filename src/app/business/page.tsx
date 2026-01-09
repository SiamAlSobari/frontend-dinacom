'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import BusinessService from '@/services/BusinessService';

export default function BusinessPage() {
    const [businessName, setBusinessName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const {mutate: createBusiness, isPending: isCreating} = useMutation({
        mutationFn: BusinessService.createBusiness,
        onSuccess: () => {
            router.push('/onboarding');
        },
    })
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedName = businessName.trim();

        // Validasi minimal 3 karakter
        if (!trimmedName) {
            setError('Nama bisnis tidak boleh kosong');
            return;
        }
        if (trimmedName.length < 3) {
            setError('Nama bisnis minimal 3 karakter');
            return;
        }
        createBusiness({ name: businessName });

        setError(''); // Clear error jika valid


    };

    const trimmedName = businessName.trim();
    const isValid = trimmedName.length >= 3;

    const features = [
        { icon: CheckCircle2, text: 'Real-time inventory tracking' },
        { icon: CheckCircle2, text: 'Smart recommendations' },
        { icon: CheckCircle2, text: 'Sales analytics' },
    ];

    return (
        <div className='min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden'>
            {/* Decorative Elements */}
            <div className='absolute inset-0 overflow-hidden'>
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className='absolute -top-24 -right-24 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl'
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className='absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl'
                />
            </div>

            {/* Main Content */}
            <div className='relative w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center'>
                {/* Left Side - Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className='text-center lg:text-left space-y-6'
                >
                    {/* ... (bagian kiri tetap sama) ... */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className='inline-block'
                    >
                        <div className='bg-linear-to-br from-blue-500 to-purple-600 rounded-3xl p-4 shadow-2xl'>
                            <Building2 className='w-16 h-16 text-white' strokeWidth={2} />
                        </div>
                    </motion.div>
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className='text-5xl lg:text-6xl font-bold text-gray-800 mb-4'
                        >
                            Start Your
                            <span className='bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                                {' '}Business Journey
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className='text-xl text-gray-600 leading-relaxed'
                        >
                            Create your business profile and unlock powerful tools to manage
                            your inventory smarter.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className='space-y-4'
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                className='flex items-center gap-3'
                            >
                                <feature.icon className='w-6 h-6 text-green-500' />
                                <span className='text-gray-700 text-lg'>{feature.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right Side - Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className='bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100'>
                        <div className='mb-8'>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, type: 'spring' }}
                                className='flex items-center gap-3 mb-4'
                            >
                                <Sparkles className='w-8 h-8 text-yellow-500' />
                                <h2 className='text-3xl font-bold text-gray-800'>
                                    Create Business
                                </h2>
                            </motion.div>
                            <p className='text-gray-600'>
                                Let's start with your business name
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className='space-y-6'>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <label
                                    htmlFor='businessName'
                                    className='block text-sm font-semibold text-gray-700 mb-3'
                                >
                                    Business Name
                                </label>
                                <div className='relative'>
                                    <input
                                        type='text'
                                        id='businessName'
                                        value={businessName}
                                        onChange={(e) => {
                                            setBusinessName(e.target.value);
                                            setError(''); // clear error saat mengetik
                                        }}
                                        placeholder='Enter your business name'
                                        className={`w-full px-6 py-4 text-lg border-2 rounded-xl focus:ring-4 focus:ring-blue-100 transition-all outline-none ${
                                            error
                                                ? 'border-red-400 focus:border-red-500'
                                                : 'border-gray-200 focus:border-blue-500'
                                        }`}
                                    />
                                    {/* Check icon hanya muncul jika valid */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: isValid ? 1 : 0 }}
                                        className='absolute right-4 top-1/2 -translate-y-1/2'
                                    >
                                        <CheckCircle2 className='w-6 h-6 text-green-500' />
                                    </motion.div>
                                </div>

                                {/* Pesan error atau hint */}
                                {error ? (
                                    <p className='mt-2 text-sm text-red-600'>{error}</p>
                                ) : (
                                    <p className='mt-2 text-sm text-gray-500'>
                                        Choose a name that represents your business (minimal 3 karakter)
                                    </p>
                                )}
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                type='submit'
                                disabled={!isValid || isCreating}
                                className='w-full bg-linear-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 text-lg group'
                            >
                                {isCreating ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                ease: 'linear',
                                            }}
                                            className='w-6 h-6 border-4 border-white border-t-transparent rounded-full'
                                        />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        Continue
                                        <ArrowRight className='w-6 h-6 group-hover:translate-x-1 transition-transform' />
                                    </>
                                )}
                            </motion.button>
                        </form>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className='mt-8 pt-6 border-t border-gray-200'
                        >
                            {/* <div className='flex items-center justify-center gap-2 text-sm text-gray-500'>
                                <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
                                <span>Secure & encrypted</span>
                            </div> */}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}