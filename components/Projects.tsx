"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { FiArrowRight, FiMaximize2 } from "react-icons/fi";

const categories = ["All", "Residential", "Commercial", "Minimalist", "Renovation"];

const projects = [
    {
        id: 1,
        title: "The Nakasero Residence",
        style: "Minimalist Style",
        category: "Minimalist",
        location: "Nakasero, Kampala",
        desc: "A serene residence with a minimalist and modern interior design — grey tones giving an impression of calm sophistication.",
        imgs: [
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
        ],
    },
    {
        id: 2,
        title: "Kololo Executive Villa",
        style: "Contemporary Luxury",
        category: "Residential",
        location: "Kololo, Kampala",
        desc: "A bold executive residence with warm wood tones, dramatic lighting, and bespoke furniture.",
        imgs: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80",
        ],
    },
    {
        id: 3,
        title: "Bugolobi Office Hub",
        style: "Modern Commercial",
        category: "Commercial",
        location: "Bugolobi, Kampala",
        desc: "A productive, light-filled workspace designed to inspire creativity and collaboration.",
        imgs: [
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80",
        ],
    },
    {
        id: 4,
        title: "Muyenga Townhouse",
        style: "Warm Eclectic",
        category: "Renovation",
        location: "Muyenga, Kampala",
        desc: "A full renovation blending traditional Ugandan textures with modern finishes.",
        imgs: [
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
        ],
    },
];

export default function Projects() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [activeCategory, setActiveCategory] = useState("All");
    const [selected, setSelected] = useState(projects[0]);

    const filtered = activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory);

    return (
        <section
            id="projects"
            className={`py-24 lg:py-36 ${isDark ? "bg-[#0e0e0e]" : "bg-white"}`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`h-px w-10 ${isDark ? "bg-[#c8a97e]" : "bg-[#3d6b5e]"}`} />
                            <span className={`text-xs tracking-[0.3em] uppercase font-medium ${isDark ? "text-[#c8a97e]" : "text-[#3d6b5e]"}`}>
                                Portfolio
                            </span>
                        </div>
                        <h2 className={`font-['Playfair_Display'] font-bold text-4xl lg:text-5xl ${isDark ? "text-white" : "text-stone-900"}`}>
                            Our Last Projects
                        </h2>
                    </motion.div>

                    {/* Category filter */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 text-xs tracking-[0.15em] uppercase font-medium transition-all duration-200 ${activeCategory === cat
                                    ? isDark
                                        ? "bg-[#c8a97e] text-[#0e0e0e]"
                                        : "bg-[#3d6b5e] text-white"
                                    : isDark
                                        ? "border border-white/20 text-white/50 hover:border-white/40 hover:text-white"
                                        : "border border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-700"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured project */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selected.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
                    >
                        {/* Description */}
                        <div className={`flex flex-col justify-center p-8 lg:p-12 ${isDark ? "bg-[#141414]" : "bg-[#f5f2ee]"}`}>
                            <span className={`text-xs tracking-[0.25em] uppercase font-medium mb-3 ${isDark ? "text-[#c8a97e]" : "text-[#3d6b5e]"}`}>
                                {selected.style}
                                <span className={`inline-block w-8 h-px ml-3 align-middle ${isDark ? "bg-[#c8a97e]" : "bg-[#3d6b5e]"}`} />
                            </span>
                            <h3 className={`font-['Playfair_Display'] font-bold text-3xl mb-2 ${isDark ? "text-white" : "text-stone-900"}`}>
                                {selected.title}
                            </h3>
                            <p className={`text-xs tracking-widest uppercase mb-6 ${isDark ? "text-white/30" : "text-stone-400"}`}>
                                {selected.location}
                            </p>
                            <p className={`text-sm leading-relaxed font-light mb-8 ${isDark ? "text-white/60" : "text-stone-500"}`}>
                                {selected.desc}
                            </p>
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={`inline-flex items-center gap-3 self-start px-6 py-3 text-xs tracking-[0.15em] uppercase font-semibold ${isDark
                                    ? "bg-[#c8a97e] text-[#0e0e0e] hover:bg-[#d4b88a]"
                                    : "bg-[#3d6b5e] text-white hover:bg-[#2d5248]"
                                    }`}
                            >
                                Read More
                                <FiArrowRight size={14} />
                            </motion.a>
                        </div>

                        {/* Images grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {selected.imgs.slice(0, 4).map((img, i) => (
                                <motion.div
                                    key={img}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.08 }}
                                    className="relative group overflow-hidden aspect-square"
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                        <FiMaximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Project cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filtered.map((p, i) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setSelected(p)}
                            className={`group cursor-pointer relative overflow-hidden ${selected.id === p.id ? "ring-2 " + (isDark ? "ring-[#c8a97e]" : "ring-[#3d6b5e]") : ""}`}
                        >
                            <img
                                src={p.imgs[0]}
                                alt={p.title}
                                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <p className="text-[#c8a97e] text-[9px] tracking-widest uppercase mb-1">{p.style}</p>
                                <p className="text-white text-sm font-['Playfair_Display'] font-semibold">{p.title}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}