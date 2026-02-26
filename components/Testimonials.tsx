"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const testimonials = [
    {
        name: "Sarah Namutebi",
        role: "Homeowner, Kololo",
        quote:
            "Muhsin Interiors completely transformed our home. They listened, they understood, and they delivered beyond our expectations. Every corner feels intentional.",
        avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
        rating: 5,
    },
    {
        name: "David Okello",
        role: "CEO, Kampala Hospitality Group",
        quote:
            "We hired them to redesign our hotel lobby and three suites. The attention to detail and project management were exceptional. Our guests constantly compliment the new look.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
        rating: 5,
    },
    {
        name: "Amina Hassan",
        role: "Entrepreneur, Bugolobi",
        quote:
            "Our office has never felt more productive and beautiful. The team at Muhsin Interiors brought ideas we had never imagined and stayed within budget.",
        avatar: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=100&q=80",
        rating: 5,
    },
    {
        name: "James Mugisha",
        role: "Property Developer",
        quote:
            "I've worked with interior designers across East Africa. Muhsin Interiors stands out for their creativity, reliability, and true understanding of the Ugandan context.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
        rating: 5,
    },
];

export default function Testimonials() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((p) => (p + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
    const next = () => setCurrent((p) => (p + 1) % testimonials.length);

    return (
        <section
            className={`py-24 lg:py-36 relative overflow-hidden ${isDark ? "bg-[#0a0a0a]" : "bg-[#3d6b5e]"}`}
        >
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-64 h-64 opacity-5">
                <div className="text-[20rem] font-['Playfair_Display'] font-bold text-white leading-none select-none">&quot;</div>
            </div>

            <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-10 bg-[#c8a97e]" />
                        <span className="text-[#c8a97e] text-xs tracking-[0.3em] uppercase font-medium">
                            Client Stories
                        </span>
                        <div className="h-px w-10 bg-[#c8a97e]" />
                    </div>
                    <h2 className="font-['Playfair_Display'] font-bold text-4xl lg:text-5xl text-white">
                        What Our Clients Say
                    </h2>
                </motion.div>

                {/* Testimonial */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center"
                    >
                        <div className="flex justify-center gap-1 mb-8">
                            {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                                <FiStar key={i} className="text-[#c8a97e] fill-[#c8a97e]" size={16} />
                            ))}
                        </div>

                        <blockquote className="text-white/85 text-lg lg:text-xl font-light leading-relaxed mb-10 font-['Playfair_Display'] italic">
                            &quot;{testimonials[current].quote}&quot;
                        </blockquote>

                        <div className="flex items-center justify-center gap-4">
                            <img
                                src={testimonials[current].avatar}
                                alt={testimonials[current].name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-[#c8a97e]"
                            />
                            <div className="text-left">
                                <p className="text-white font-semibold text-sm">{testimonials[current].name}</p>
                                <p className="text-white/50 text-xs tracking-wide">{testimonials[current].role}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6 mt-12">
                    <button onClick={prev} className="w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors flex items-center justify-center">
                        <FiChevronLeft size={16} />
                    </button>

                    <div className="flex gap-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`transition-all duration-300 rounded-full ${i === current ? "bg-[#c8a97e] w-6 h-2" : "bg-white/30 w-2 h-2"
                                    }`}
                            />
                        ))}
                    </div>

                    <button onClick={next} className="w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors flex items-center justify-center">
                        <FiChevronRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
}