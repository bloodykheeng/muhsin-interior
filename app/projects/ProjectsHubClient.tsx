"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { projects } from "@/data/projects";
import { BeforeAfter } from "@/components/helpers/BeforeAfter";

// ─── Category groups ──────────────────────────────────────────────────────────

const categoryGroups = [
    {
        key: "Residential",
        label: "Residential Before & Afters",
        tagline: "Premium residential spaces crafted to perfection — from ceiling installations and custom cabinetry to full interior painting.",
        projects: projects.filter((p) => p.category === "Residential"),
    },
    {
        key: "Commercial",
        label: "Commercial Before & Afters",
        tagline: "Modern commercial environments built for productivity, featuring suspended ceilings, glass partitioning, and professional finishes.",
        projects: projects.filter((p) => p.category === "Commercial"),
    },
    {
        key: "Renovation",
        label: "Renovation Before & Afters",
        tagline: "Complete transformations inside and out — millwork, partitioning, terrace systems, and full interior/exterior painting.",
        projects: projects.filter((p) => p.category === "Renovation"),
    },
    {
        key: "Ceiling",
        label: "Ceiling Before & Afters",
        tagline: "Precision ceiling systems that define the room — suspended, decorative, and custom installations.",
        projects: projects.filter((p) => p.category === "Ceiling"),
    },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProjectsHubClient() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className={isDark ? "bg-[#181B34]" : "bg-white"}>

            {/* ── Hero ── */}
            <section className="relative h-[50vh] min-h-[360px] overflow-hidden flex items-end">
                <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80"
                    alt="Portfolio hero"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-14 w-full">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <p className="text-[#F5C518] text-xs font-semibold tracking-[0.3em] uppercase font-['Poppins'] mb-3">
                            Project Portfolio
                        </p>
                        <h1 className="text-white font-['Poppins'] font-bold text-4xl md:text-6xl leading-tight">
                            Before &amp; Afters
                        </h1>
                        <p className="text-white/60 font-['Poppins'] text-sm mt-3 max-w-xl leading-relaxed">
                            Breathtaking design transformations across residential, commercial, and renovation projects.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Intro ── */}
            <section className={`py-16 border-b ${isDark ? "border-white/10" : "border-slate-100"}`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={`font-['Poppins'] font-bold text-3xl lg:text-4xl leading-snug ${isDark ? "text-white" : "text-[#181B34]"}`}
                    >
                        Breathtaking craftsmanship and design transformations.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={`text-sm leading-relaxed font-['Poppins'] font-light ${isDark ? "text-white/60" : "text-slate-500"}`}
                    >
                        Browse stunning before and after photos from past Yuri Perfections projects — ceiling systems, custom cabinetry, wall partitioning, interior and exterior painting, and full-scale renovations. Ready to create your own transformation? Request a free quote today.
                    </motion.p>
                </div>
            </section>

            {/* ── Category sections ── */}
            {categoryGroups.map((group, gi) => {
                if (group.projects.length === 0) return null;
                const firstProject = group.projects[0];
                const isEven = gi % 2 === 0;

                return (
                    <section
                        key={group.key}
                        className={`py-20 ${!isEven ? isDark ? "bg-[#0f1124]" : "bg-[#F7F8FF]" : ""}`}
                    >
                        <div className="max-w-7xl mx-auto px-6 lg:px-12">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                                {/* Slider side */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    className={!isEven ? "lg:order-2" : ""}
                                >
                                    <BeforeAfter
                                        beforeImage={firstProject.coverBefore}
                                        afterImage={firstProject.coverAfter}
                                        mode="click"
                                        style={{ width: "100%" }}
                                    />
                                    <p className={`text-[10px] tracking-widest uppercase font-semibold font-['Poppins'] mt-3 ${isDark ? "text-white/30" : "text-slate-400"}`}>
                                        {firstProject.title} — Drag slider to compare
                                    </p>
                                </motion.div>

                                {/* Text side */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    className={!isEven ? "lg:order-1" : ""}
                                >
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="h-px w-8 bg-[#F5C518]" />
                                        <span className={`text-xs tracking-[0.3em] uppercase font-semibold font-['Poppins'] ${isDark ? "text-[#F5C518]" : "text-[#181B34]/50"}`}>
                                            {group.key}
                                        </span>
                                    </div>
                                    <h3 className={`font-['Poppins'] font-bold text-2xl lg:text-3xl mb-3 ${isDark ? "text-white" : "text-[#181B34]"}`}>
                                        {group.label}
                                    </h3>
                                    <p className={`text-sm leading-relaxed font-light mb-8 font-['Poppins'] ${isDark ? "text-white/60" : "text-slate-500"}`}>
                                        {group.tagline}
                                    </p>

                                    {/* Project list */}
                                    <div className="space-y-3 mb-8">
                                        {group.projects.map((p) => (
                                            <Link
                                                key={p.id}
                                                href={`/projects/${p.slug}`}
                                                className={`flex items-center justify-between p-4 group transition-all duration-200 ${isDark
                                                    ? "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#F5C518]/40"
                                                    : "bg-white hover:bg-[#F0F3FF] border border-slate-100 hover:border-[#181B34]/20"
                                                    }`}
                                            >
                                                <div>
                                                    <p className={`text-[10px] tracking-widest uppercase font-semibold font-['Poppins'] mb-1 ${isDark ? "text-[#F5C518]" : "text-[#181B34]/50"}`}>
                                                        {p.style}
                                                    </p>
                                                    <p className={`font-['Poppins'] font-semibold text-sm ${isDark ? "text-white" : "text-[#181B34]"}`}>
                                                        {p.title}
                                                    </p>
                                                </div>
                                                <FiArrowRight
                                                    className={`transition-all duration-200 group-hover:translate-x-1 ${isDark ? "text-white/30 group-hover:text-[#F5C518]" : "text-slate-300 group-hover:text-[#181B34]"}`}
                                                    size={18}
                                                />
                                            </Link>
                                        ))}
                                    </div>

                                    <Link
                                        href={`/projects/${firstProject.slug}`}
                                        className="inline-flex items-center gap-3 px-6 py-3 text-xs tracking-[0.15em] uppercase font-bold font-['Poppins'] bg-[#F5C518] text-[#181B34] hover:bg-[#e6b800] transition-colors"
                                    >
                                        View {group.key} Before &amp; Afters
                                        <FiArrowRight size={14} />
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </section>
                );
            })}

            {/* ── Final CTA ── */}
            <section className={`py-24 ${isDark ? "bg-[#0f1124]" : "bg-[#F0F3FF]"}`}>
                <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className={`font-['Poppins'] font-bold text-3xl lg:text-4xl mb-4 ${isDark ? "text-white" : "text-[#181B34]"}`}>
                            Your Home Transformation Starts Here
                        </h2>
                        <p className={`text-sm leading-relaxed font-['Poppins'] font-light mb-8 ${isDark ? "text-white/60" : "text-slate-500"}`}>
                            Ready to experience the Yuri Perfections difference? Contact our team for a free consultation and let&apos;s get started.
                        </p>
                        <Link
                            href="/#contact"
                            className="inline-flex items-center gap-3 px-8 py-4 text-xs tracking-[0.2em] uppercase font-bold font-['Poppins'] bg-[#F5C518] text-[#181B34] hover:bg-[#e6b800] transition-colors"
                        >
                            Get a Free Quote
                            <FiArrowRight size={14} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}