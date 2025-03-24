"use client";
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';

const ThankYouPage = () => {
  const locale = useLocale();
  const t = useTranslations('thankYou');
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Countdown effect
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Redirect to home after countdown
      router.push(`/${locale}`);
    }
  }, [countdown, router, locale]);

  useEffect(() => {
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-10"></div>
        
        {/* Confetti effect */}
        {showConfetti && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full"
                initial={{
                  top: -20,
                  left: Math.random() * 100 + 'vw',
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  top: '100vh',
                  rotate: Math.random() * 520,
                  x: Math.random() * 200 - 100
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  ease: 'easeOut',
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        )}

        <div className="container mx-auto px-4 z-10">
          <motion.div 
            className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            
            <div className="p-8 text-center">
              <motion.h1 
                className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {t('thank')} 🎉
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-600 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {t('success')}
              </motion.p>
              
              <motion.p
                className="text-gray-500 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                {t('emailInfo')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="mb-8 p-4 bg-blue-50 rounded-lg"
              >
                <p className="text-blue-700">
                  {t('redirect')} <span className="font-bold">{countdown}</span> {t('seconds')}
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-col md:flex-row gap-4 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                <Link href="/" className="btn btn-dark px-8 py-3 rounded-md hover:bg-black transition-colors">
                  {t('home')}
                </Link>
                <Link href="/contact" className="btn bg-blue-50 text-blue-700 px-8 py-3 rounded-md hover:bg-blue-100 transition-colors">
                  {t('contact')}
                </Link>
              </motion.div>
            </div>

            <motion.div 
              className="py-4 bg-gray-50 text-center border-t"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <p className="text-sm text-gray-500">{t('reference')}: <span className="font-mono font-bold">HT-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span></p>
            </motion.div>
          </motion.div>

          {/* Flying paper planes */}
          <motion.div
            className="absolute -right-20 top-1/4"
            animate={{
              x: [-100, 50, -80, 100, -100],
              y: [-20, 40, -30, 20, -20],
              rotate: [0, 15, -15, 5, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 4L10 12L3 8L3 20L10 16L21 20V4Z" fill="#3B82F6" stroke="#2563EB" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </motion.div>

          <motion.div
            className="absolute -left-20 top-2/3"
            animate={{
              x: [100, -50, 80, -100, 100],
              y: [20, -40, 30, -20, 20],
              rotate: [0, -15, 15, -5, 0]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 4L10 12L3 8L3 20L10 16L21 20V4Z" fill="#EC4899" stroke="#DB2777" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

export default ThankYouPage; 