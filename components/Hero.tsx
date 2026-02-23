"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { FiArrowRight, FiPlay } from "react-icons/fi";

export default function Hero() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section
            id="home"
            ref={containerRef}
            className={`relative min-h-screen overflow-hidden flex items-center ${isDark ? "bg-[#0e0e0e]" : "bg-[#f5f2ee]"}`}
        >
            {/* Background image with parallax */}
            <motion.div style={{ y }} className="absolute inset-0 scale-110">
                <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=80"
                    alt="Luxury Interior"
                    className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${isDark ? "bg-[#0e0e0e]/75" : "bg-stone-900/50"}`} />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent" : "bg-gradient-to-r from-stone-900/80 via-stone-900/30 to-transparent"}`} />
            </motion.div>

            {/* Content */}
            <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-16">
                <div className="max-w-2xl">
                    {/* Tag */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex items-center gap-3 mb-8"
                    >
                        <div className={`h-px w-12 ${isDark ? "bg-[#c8a97e]" : "bg-[#c8a97e]"}`} />
                        <span className="text-[#c8a97e] text-xs tracking-[0.35em] uppercase font-medium">
                            Premium Interior Design — Kampala
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="font-['Playfair_Display'] font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.05] mb-8"
                    >
                        Discover
                        <br />
                        <span className="italic text-[#c8a97e]">Luxury</span>
                        <br />
                        Interior Design
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.7 }}
                        className="text-white/70 text-base lg:text-lg leading-relaxed mb-10 max-w-md font-light"
                    >
                        We craft breathtaking living spaces for homes and offices across Uganda.
                        Every room is a story waiting to be told.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.9 }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-3 bg-[#c8a97e] text-[#0e0e0e] px-7 py-4 text-sm tracking-[0.15em] uppercase font-semibold hover:bg-[#d4b88a] transition-colors"
                        >
                            View Our Work
                            <FiArrowRight size={16} />
                        </motion.a>
                        <motion.a
                            href="#about"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-3 border border-white/30 text-white px-7 py-4 text-sm tracking-[0.15em] uppercase font-medium hover:bg-white/10 transition-colors"
                        >
                            <FiPlay size={14} />
                            Our Story
                        </motion.a>
                    </motion.div>
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.1 }}
                    className="flex flex-wrap gap-8 mt-20 pt-10 border-t border-white/10"
                >
                    {[
                        { num: "150+", label: "Projects Done" },
                        { num: "8+", label: "Years Experience" },
                        { num: "98%", label: "Client Satisfaction" },
                        { num: "20+", label: "Design Awards" },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <p className="font-['Playfair_Display'] text-3xl font-bold text-[#c8a97e]">{stat.num}</p>
                            <p className="text-white/50 text-xs tracking-[0.2em] uppercase mt-1">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 right-8 lg:right-12 flex flex-col items-center gap-2"
            >
                <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase -rotate-90 mb-4">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
                />
            </motion.div>
        </section>
    );
}