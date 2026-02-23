"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isDark = theme === "dark";

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? isDark
                        ? "bg-[#0e0e0e]/95 backdrop-blur-md shadow-2xl border-b border-white/5"
                        : "bg-white/95 backdrop-blur-md shadow-lg border-b border-stone-200/80"
                    : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-18 py-4">
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        className="flex items-center gap-3 group"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className={`w-8 h-8 flex items-center justify-center ${isDark ? "bg-[#c8a97e]" : "bg-[#3d6b5e]"}`}>
                            <span className="text-white font-bold text-sm">M</span>
                        </div>
                        <div>
                            <span className={`font-['Playfair_Display'] font-bold text-lg tracking-wider ${isDark ? "text-white" : "text-[#1a1a1a]"}`}>
                                MUHSIN
                            </span>
                            <span className={`block text-[9px] tracking-[0.3em] uppercase font-light -mt-1 ${isDark ? "text-[#c8a97e]" : "text-[#3d6b5e]"}`}>
                                Interiors
                            </span>
                        </div>
                    </motion.a>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i + 0.3 }}
                                className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-200 relative group ${isDark ? "text-white/70 hover:text-[#c8a97e]" : "text-stone-600 hover:text-[#3d6b5e]"
                                    }`}
                            >
                                {link.label}
                                <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${isDark ? "bg-[#c8a97e]" : "bg-[#3d6b5e]"}`} />
                            </motion.a>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setTheme(isDark ? "light" : "dark")}
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isDark ? "bg-white/10 hover:bg-white/20 text-[#c8a97e]" : "bg-stone-100 hover:bg-stone-200 text-[#3d6b5e]"
                                }`}
                        >
                            {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
                        </motion.button>

                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`hidden md:block text-xs tracking-[0.15em] uppercase px-5 py-2.5 font-medium transition-all duration-300 ${isDark
                                ? "bg-[#c8a97e] text-[#0e0e0e] hover:bg-[#d4b88a]"
                                : "bg-[#3d6b5e] text-white hover:bg-[#2d5248]"
                                }`}
                        >
                            Get Quote
                        </motion.a>

                        {/* Mobile menu button */}
                        <button
                            className={`md:hidden w-9 h-9 flex items-center justify-center ${isDark ? "text-white" : "text-stone-800"}`}
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className={`fixed inset-0 z-40 flex flex-col pt-24 px-8 pb-12 ${isDark ? "bg-[#0e0e0e]" : "bg-white"
                            }`}
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.07 }}
                                onClick={() => setMenuOpen(false)}
                                className={`font-['Playfair_Display'] text-3xl font-bold py-4 border-b transition-colors ${isDark
                                    ? "text-white border-white/10 hover:text-[#c8a97e]"
                                    : "text-stone-800 border-stone-100 hover:text-[#3d6b5e]"
                                    }`}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-auto"
                        >
                            <p className={`text-xs tracking-[0.2em] uppercase mb-2 ${isDark ? "text-white/40" : "text-stone-400"}`}>
                                Based in Kampala, Uganda
                            </p>
                            <p className={`text-sm ${isDark ? "text-white/60" : "text-stone-500"}`}>
                                +256 700 000 000
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}