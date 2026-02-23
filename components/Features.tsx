"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { FiDollarSign, FiAward, FiClock, FiShield } from "react-icons/fi";

const features = [
    {
        icon: FiDollarSign,
        title: "Friendly Price",
        desc: "We design the interior of your home at an affordable price without compromising quality.",
    },
    {
        icon: FiAward,
        title: "Great Quality",
        desc: "The quality of materials we use is of the highest standard, built to last.",
    },
    {
        icon: FiClock,
        title: "Best Time",
        desc: "We work on your home interior in the most efficient and timely manner.",
    },
    {
        icon: FiShield,
        title: "Warranty",
        desc: "We provide a 1 month warranty after project completion for your peace of mind.",
    },
];

export default function Features() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section className={`relative py-0 ${isDark ? "bg-[#1a2e26]" : "bg-[#3d6b5e]"}`}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12, duration: 0.6 }}
                            className="group px-8 py-10 hover:bg-white/5 transition-colors duration-300 text-center"
                        >
                            <div className="flex justify-center mb-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#c8a97e]/20 transition-colors">
                                    <f.icon size={20} className="text-[#c8a97e]" />
                                </div>
                            </div>
                            <h3 className="text-white font-['Playfair_Display'] font-semibold text-sm tracking-widest uppercase mb-3">
                                {f.title}
                            </h3>
                            <p className="text-white/60 text-xs leading-relaxed font-light">
                                {f.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}