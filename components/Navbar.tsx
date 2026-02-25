"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Service", href: "#services" },
    { label: "Project", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <>
            {/* ─── Navbar
          The nav sits on top of the two-tone hero background.
          Left half is transparent (shows white hero bg).
          Right half is transparent (shows grey hero bg strip).
          So the nav itself is just fully transparent.
      ─── */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-[72px]">

                    {/* Logo — sits on the white left side */}
                    <a href="#home" className="flex items-center">
                        <Image
                            src="/logos/yuri-logo.jpg"
                            alt="Yuri Perfections"
                            width={80}   // you can adjust
                            height={80}  // make width = height for square
                            className="h-20 w-20 object-contain" // Tailwind square size
                            priority
                        />
                    </a>

                    {/* Desktop links — sit on the grey right side */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-[11px] font-semibold tracking-[0.18em] uppercase font-['Poppins']
                                           transition-colors duration-200 relative group
                                           text-[#181B34]/55 hover:text-[#181B34]
                                           dark:text-white/55 dark:hover:text-[#F5C518]"
                            >
                                {link.label}
                                <span
                                    className="absolute -bottom-1 left-0 w-0 h-[2px]
                                               transition-all duration-300 group-hover:w-full
                                               bg-[#181B34] dark:bg-[#F5C518]"
                                />
                            </a>
                        ))}

                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            aria-label="Toggle theme"
                            className="w-9 h-9 rounded-full flex items-center justify-center
                                       transition-colors border
                                       border-[#181B34]/20 text-[#181B34] hover:bg-[#181B34]/8
                                       dark:border-white/15 dark:text-white dark:hover:bg-white/10"
                        >
                            {theme === "dark" ? <FiSun size={15} /> : <FiMoon size={15} />}
                        </button>
                    </div>

                    {/* Mobile controls */}
                    <div className="flex md:hidden items-center gap-3">
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            aria-label="Toggle theme"
                            className="w-9 h-9 rounded-full flex items-center justify-center border
                                       border-[#181B34]/20 text-[#181B34]
                                       dark:border-white/15 dark:text-white"
                        >
                            {theme === "dark" ? <FiSun size={15} /> : <FiMoon size={15} />}
                        </button>

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-[#181B34] dark:text-white"
                        >
                            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* ─── Mobile full-screen menu ─── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.28 }}
                        className="fixed inset-0 z-40 pt-[72px] bg-white dark:bg-[#181B34]"
                    >
                        {/* Logo */}
                        <div className="absolute top-4 left-4 sm:left-6">
                            <Image
                                src="/logos/yuri-logo.jpg"
                                alt="Yuri Perfections"
                                width={100}
                                height={44}
                                className="h-9 w-auto object-contain"
                            />
                        </div>

                        <div className="flex flex-col px-6 pt-6">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    initial={{ opacity: 0, x: 18 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.055 }}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-2xl font-bold font-['Poppins'] py-4 border-b
                                               transition-colors
                                               text-[#181B34] border-[#181B34]/10 hover:text-[#181B34]/50
                                               dark:text-white dark:border-white/10 dark:hover:text-[#F5C518]"
                                >
                                    {link.label}
                                </motion.a>
                            ))}

                            <motion.a
                                href="#contact"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.32 }}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center justify-center w-full py-4 mt-6
                                           bg-[#F5C518] text-[#181B34]
                                           font-bold font-['Poppins'] text-sm
                                           tracking-[0.15em] uppercase"
                            >
                                Get a Free Quote
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}