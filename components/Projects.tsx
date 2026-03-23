"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import { BeforeAfter } from "@/components/helpers/BeforeAfter";

import { projects } from "@/data/projects";

// ─── Shared project data (exported so pages can import it) ───────────────────

const categories = ["All", "Residential", "Commercial", "Ceiling", "Renovation"];



// ─── Thumbnail card ───────────────────────────────────────────────────────────

function ProjectCard({
    project,
    isSelected,
    onClick,
    isDark,
}: {
    project: (typeof projects)[0];
    isSelected: boolean;
    onClick: () => void;
    isDark: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            onClick={onClick}
            className={`group cursor-pointer relative overflow-hidden transition-all duration-300 ${isSelected ? "ring-[3px] ring-[#F5C518]" : ""
                }`}
        >
            <BeforeAfter
                beforeImage={project.coverBefore}
                afterImage={project.coverAfter}
                mode="click"
                style={{ height: 208 }}
                beforeStyle={{ height: 208 }}
                afterStyle={{ height: 208 }}

                // 🔥 ADD THESE
                buttonStyle={{ width: 44, height: 44 }}
            />
            {/* Gradient + title overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
                <p className="text-[#F5C518] text-[9px] tracking-widest uppercase mb-1 font-['Poppins'] font-semibold">
                    {project.style}
                </p>
                <p className="text-white text-sm font-['Poppins'] font-semibold leading-tight">
                    {project.title}
                </p>
            </div>
        </motion.div>
    );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function Projects() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [activeCategory, setActiveCategory] = useState("All");
    const [selected, setSelected] = useState(projects[0]);

    const filtered =
        activeCategory === "All"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    return (
        <section
            id="projects"
            className={`py-24 lg:py-36 ${isDark ? "bg-[#181B34]" : "bg-white"}`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                {/* ── Header ── */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-10 bg-[#F5C518]" />
                            <span className={`text-xs tracking-[0.3em] uppercase font-semibold font-['Poppins'] ${isDark ? "text-[#F5C518]" : "text-[#181B34]/60"}`}>
                                Portfolio
                            </span>
                        </div>
                        <h2 className={`font-['Poppins'] font-bold text-4xl lg:text-5xl ${isDark ? "text-white" : "text-[#181B34]"}`}>
                            Our Last Projects
                        </h2>
                    </motion.div>

                    {/* Category filters */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 text-xs tracking-[0.15em] uppercase font-semibold font-['Poppins'] transition-all duration-200 ${activeCategory === cat
                                    ? "bg-[#F5C518] text-[#181B34]"
                                    : isDark
                                        ? "border border-white/20 text-white/50 hover:border-[#F5C518]/50 hover:text-[#F5C518]"
                                        : "border border-slate-200 text-slate-400 hover:border-[#181B34]/40 hover:text-[#181B34]"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Featured panel ── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selected.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-16 overflow-hidden"
                    >
                        {/* Info */}
                        <div className={`flex flex-col justify-center p-8 lg:p-12 ${isDark ? "bg-[#0f1124]" : "bg-[#F0F3FF]"}`}>
                            <span className={`text-xs tracking-[0.25em] uppercase font-semibold font-['Poppins'] mb-3 flex items-center gap-3 ${isDark ? "text-[#F5C518]" : "text-[#181B34]/60"}`}>
                                {selected.style}
                                <span className="inline-block w-8 h-px bg-[#F5C518]" />
                            </span>
                            <h3 className={`font-['Poppins'] font-bold text-3xl mb-2 ${isDark ? "text-white" : "text-[#181B34]"}`}>
                                {selected.title}
                            </h3>
                            <p className={`text-xs tracking-widest uppercase mb-6 font-['Poppins'] ${isDark ? "text-white/30" : "text-slate-400"}`}>
                                {selected.location}
                            </p>
                            <p className={`text-sm leading-relaxed font-light mb-8 font-['Poppins'] ${isDark ? "text-white/60" : "text-slate-500"}`}>
                                {selected.desc}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                    <Link
                                        href={`/projects/${selected.slug}`}
                                        className="inline-flex items-center gap-3 px-6 py-3 text-xs tracking-[0.15em] uppercase font-bold font-['Poppins'] bg-[#F5C518] text-[#181B34] hover:bg-[#e6b800] transition-colors"
                                    >
                                        View Before &amp; Afters
                                        <FiArrowRight size={14} />
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                    <Link
                                        href="/projects"
                                        className={`inline-flex items-center gap-2 px-6 py-3 text-xs tracking-[0.15em] uppercase font-bold font-['Poppins'] border transition-colors ${isDark
                                            ? "border-white/20 text-white/70 hover:border-[#F5C518] hover:text-[#F5C518]"
                                            : "border-[#181B34]/20 text-[#181B34]/60 hover:border-[#181B34] hover:text-[#181B34]"
                                            }`}
                                    >
                                        All Projects
                                        <FiArrowUpRight size={14} />
                                    </Link>
                                </motion.div>
                            </div>
                        </div>

                        {/* Featured before/after slider */}
                        <div className="min-h-[400px] lg:min-h-0">
                            <BeforeAfter
                                beforeImage={selected.coverBefore}
                                afterImage={selected.coverAfter}
                                mode="click"
                                style={{ height: '100%', minHeight: 400, width: '100%' }}
                                beforeStyle={{ height: '100%' }}
                                afterStyle={{ height: '100%' }}
                                buttonStyle={{ width: 44, height: 44 }}
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* ── Thumbnail grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filtered.map((p) => (
                        <ProjectCard
                            key={p.id}
                            project={p}
                            isSelected={selected.id === p.id}
                            onClick={() => setSelected(p)}
                            isDark={isDark}
                        />
                    ))}
                </div>

                {/* ── Browse all link ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="mt-12 text-center"
                >
                    <Link
                        href="/projects"
                        className={`inline-flex items-center gap-3 text-sm font-semibold font-['Poppins'] tracking-[0.15em] uppercase transition-colors ${isDark ? "text-white/50 hover:text-[#F5C518]" : "text-slate-400 hover:text-[#181B34]"
                            }`}
                    >
                        Browse All Before &amp; Afters
                        <FiArrowRight size={16} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}