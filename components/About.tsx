"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { FiArrowRight } from "react-icons/fi";

export default function About() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section
            id="about"
            className={`py-24 lg:py-36 ${isDark ? "bg-[#0e0e0e]" : "bg-white"}`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Images block */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80"
                                alt="Living room design"
                                className="w-full h-[480px] object-cover"
                            />
                            {/* Floating accent image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.7 }}
                                className="absolute -bottom-10 -right-6 lg:-right-12 w-48 h-52 lg:w-56 lg:h-60 border-4 border-white dark:border-[#0e0e0e] shadow-2xl"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80"
                                    alt="Kitchen design"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                            {/* Years badge */}
                            <div className={`absolute top-6 -left-4 lg:-left-8 w-20 h-20 flex flex-col items-center justify-center ${isDark ? "bg-[#c8a97e]" : "bg-[#3d6b5e]"}`}>
                                <span className="text-white font-['Playfair_Display'] font-bold text-2xl leading-none">8+</span>
                                <span className="text-white/80 text-[9px] tracking-widest uppercase mt-1">Years</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        className="lg:pl-8 mt-12 lg:mt-0"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`h-px w-10 ${isDark ? "bg-[#c8a97e]" : "bg-[#3d6b5e]"}`} />
                            <span className={`text-xs tracking-[0.3em] uppercase font-medium ${isDark ? "text-[#c8a97e]" : "text-[#3d6b5e]"}`}>
                                About Us
                            </span>
                        </div>

                        <h2 className={`font-['Playfair_Display'] font-bold text-4xl lg:text-5xl leading-tight mb-6 ${isDark ? "text-white" : "text-stone-900"}`}>
                            Agerior Agency
                        </h2>

                        <p className={`text-base leading-relaxed mb-6 font-light ${isDark ? "text-white/60" : "text-stone-500"}`}>
                            We are an interior design and renovation agency based in Kampala, Uganda.
                            At Muhsin Interiors, we believe your space should be a reflection of who you are —
                            elevated, intentional, and deeply personal.
                        </p>
                        <p className={`text-base leading-relaxed mb-10 font-light ${isDark ? "text-white/60" : "text-stone-500"}`}>
                            From minimalist contemporary spaces to warm, textured traditional aesthetics,
                            we bring expertise and creativity to every project across Uganda and East Africa.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-10">
                            {[
                                { num: "150+", label: "Projects" },
                                { num: "50+", label: "Happy Clients" },
                                { num: "8+", label: "Years Active" },
                                { num: "5", label: "Design Awards" },
                            ].map((s) => (
                                <div key={s.label} className={`pb-4 border-b ${isDark ? "border-white/10" : "border-stone-100"}`}>
                                    <p className={`font-['Playfair_Display'] text-2xl font-bold ${isDark ? "text-[#c8a97e]" : "text-[#3d6b5e]"}`}>{s.num}</p>
                                    <p className={`text-xs tracking-[0.2em] uppercase mt-1 ${isDark ? "text-white/40" : "text-stone-400"}`}>{s.label}</p>
                                </div>
                            ))}
                        </div>

                        <motion.a
                            href="#services"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`inline-flex items-center gap-3 px-7 py-4 text-sm tracking-[0.15em] uppercase font-semibold transition-colors ${isDark
                                ? "bg-[#c8a97e] text-[#0e0e0e] hover:bg-[#d4b88a]"
                                : "bg-[#3d6b5e] text-white hover:bg-[#2d5248]"
                                }`}
                        >
                            Read More
                            <FiArrowRight size={16} />
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}