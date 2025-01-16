"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

export default function IntroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="about" className="py-10">
      <motion.section
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
                variants={itemVariants}
              >
                Hi, I&apos;m Haris Ahmad Khan
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                variants={itemVariants}
              >
                A Full Stack Developer specializing in React Native, Next.js,
                React.js, and Django
              </motion.p>
              <motion.div className="flex space-x-4" variants={itemVariants}>
                <a
                  href="#contact"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get in Touch
                </a>
                <a
                  href="#projects"
                  className="border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  View Projects
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative h-[400px] w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <Image
                src="/images/profile.png"
                alt="Haris Ahmad Khan"
                fill
                className="object-cover rounded-2xl transform scale-85"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>
    </section>
  );
}
