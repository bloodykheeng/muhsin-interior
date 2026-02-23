"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { FiHome, FiBriefcase, FiLayers, FiTool, FiCamera, FiPackage } from "react-icons/fi";

const services = [
    {
        icon: FiHome,
        title: "Residential Design",
        desc: "Transform your home into a sanctuary. We handle full interior overhauls, from concept to final decor.",
        img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80",
    },
    {
        icon: FiBriefcase,
        title: "Commercial Spaces",
        desc: "Offices, hotels, and restaurants — we design environments that work hard and look extraordinary.",
        img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    },
    {
        icon: FiLayers,
        title: "Space Planning",
        desc: "Optimise your square footage with intelligent layouts that maximise both function and flow.",
        img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80",
    },
    {
        icon: FiTool,
        title: "Renovation & Build",
        desc: "Full renovation and construction management — we oversee every nail and tile.",
        img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
    },
    {
        icon: FiCamera,
        title: "Styling & Staging",
        desc: "Whether for sale, rental, or simply because you deserve it — expert property styling.",
        img: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=600&q=80",
    },
    {
        icon: FiPackage,
        title: "Furniture & Sourcing",
        desc: "We source and supply premium furniture, art, and accessories tailored to your vision.",
        img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    },
];

export default function Services() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section
            id="services"
            className={`py-24 lg:py-36 ${isDark ? "bg-[#111111]" : "bg-[#f5f2ee]"}`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="max-w-xl mb-16"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`h-px w-10 ${isDark ? "bg-[#c8a97e]" : "bg-[#3d6b5e]"}`} />
                        <span className={`text-xs tracking-[0.3em] uppercase font-medium ${isDark ? "text-[#c8a97e]" : "text-[#3d6b5e]"}`}>
                            What We Do
                        </span>
                    </div>
                    <h2 className={`font-['Playfair_Display'] font-bold text-4xl lg:text-5xl leading-tight ${isDark ? "text-white" : "text-stone-900"}`}>
                        Our Design Services
                    </h2>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((s, i) => (
                        <motion.div
                            key={s.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            whileHover={{ y: -6 }}
                            className={`group relative overflow-hidden cursor-pointer ${isDark ? "bg-[#1a1a1a]" : "bg-white"} shadow-sm hover:shadow-xl transition-all duration-500`}
                        >
                            {/* Image */}
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src={s.img}
                                    alt={s.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className={`absolute top-4 left-4 w-10 h-10 flex items-center justify-center ${isDark ? "bg-[#c8a97e]" : "bg-[#3d6b5e]"}`}>
                                    <s.icon size={18} className="text-white" />
                                </div>
                            </div>

                            {/* Text */}
                            <div className="p-6">
                                <h3 className={`font-['Playfair_Display'] font-bold text-lg mb-3 ${isDark ? "text-white" : "text-stone-900"}`}>
                                    {s.title}
                                </h3>
                                <p className={`text-sm leading-relaxed font-light ${isDark ? "text-white/55" : "text-stone-500"}`}>
                                    {s.desc}
                                </p>
                                <div className={`mt-5 flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-medium transition-colors ${isDark ? "text-[#c8a97e]" : "text-[#3d6b5e]"}`}>
                                    Learn more
                                    <motion.span
                                        initial={{ x: 0 }}
                                        whileHover={{ x: 4 }}
                                        className="text-base"
                                    >→</motion.span>
                                </div>
                            </div>

                            {/* Bottom accent line */}
                            <div className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-500 group-hover:w-full ${isDark ? "bg-[#c8a97e]" : "bg-[#3d6b5e]"}`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}