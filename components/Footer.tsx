"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { FiInstagram, FiFacebook, FiTwitter, FiLinkedin, FiYoutube } from "react-icons/fi";

const footerLinks = {
    Agency: ["About Us", "Our Team", "Careers", "Press"],
    Services: ["Residential Design", "Commercial Spaces", "Renovation", "Furniture & Sourcing"],
    "Quick Links": ["Projects", "Blog", "Tools", "Contact"],
    Help: ["Help Center", "Documentation", "Product & Service"],
};

const socials = [
    { icon: FiInstagram, href: "#", label: "Instagram" },
    { icon: FiFacebook, href: "#", label: "Facebook" },
    { icon: FiTwitter, href: "#", label: "Twitter" },
    { icon: FiLinkedin, href: "#", label: "LinkedIn" },
    { icon: FiYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <footer className={`${isDark ? "bg-[#0a0a0a]" : "bg-[#1a1a1a]"} text-white`}>
            {/* Top section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-[#c8a97e] flex items-center justify-center">
                                <span className="text-white font-bold text-sm">M</span>
                            </div>
                            <div>
                                <span className="font-['Playfair_Display'] font-bold text-lg tracking-wider">MUHSIN</span>
                                <span className="block text-[9px] tracking-[0.3em] uppercase font-light text-[#c8a97e] -mt-1">Interiors</span>
                            </div>
                        </div>
                        <p className="text-white/40 text-sm font-light leading-relaxed mb-6 max-w-xs">
                            We are an interior design and renovation agency engaged in providing premium design services for homes and offices across Uganda.
                        </p>
                        {/* Socials */}
                        <div className="flex gap-3">
                            {socials.map((s) => (
                                <motion.a
                                    key={s.label}
                                    href={s.href}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    aria-label={s.label}
                                    className="w-9 h-9 border border-white/10 hover:border-[#c8a97e] hover:text-[#c8a97e] flex items-center justify-center text-white/40 transition-colors"
                                >
                                    <s.icon size={14} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([heading, links]) => (
                        <div key={heading}>
                            <h4 className="text-white/80 text-xs tracking-[0.25em] uppercase font-medium mb-5">{heading}</h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-white/35 text-sm hover:text-[#c8a97e] transition-colors font-light">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/25 text-xs">
                        © {new Date().getFullYear()} Muhsin Interiors. All rights reserved. Kampala, Uganda.
                    </p>
                    <p className="text-white/20 text-xs">
                        bloodykheeng
                    </p>
                </div>
            </div>
        </footer>
    );
}