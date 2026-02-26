"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { FiMapPin, FiPhone, FiMail, FiSend } from "react-icons/fi";

export default function Contact() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
    };

    const inputClass = `w-full px-4 py-3.5 text-sm border transition-colors focus:outline-none ${isDark
        ? "bg-[#1a1a1a] border-white/10 text-white placeholder-white/30 focus:border-[#c8a97e]"
        : "bg-stone-50 border-stone-200 text-stone-800 placeholder-stone-400 focus:border-[#3d6b5e]"
        }`;

    return (
        <section
            id="contact"
            className={`py-24 lg:py-36 ${isDark ? "bg-[#111111]" : "bg-[#f5f2ee]"}`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className={`h-px w-10 ${isDark ? "bg-[#c8a97e]" : "bg-[#3d6b5e]"}`} />
                        <span className={`text-xs tracking-[0.3em] uppercase font-medium ${isDark ? "text-[#c8a97e]" : "text-[#3d6b5e]"}`}>
                            Get In Touch
                        </span>
                        <div className={`h-px w-10 ${isDark ? "bg-[#c8a97e]" : "bg-[#3d6b5e]"}`} />
                    </div>
                    <h2 className={`font-['Playfair_Display'] font-bold text-4xl lg:text-5xl ${isDark ? "text-white" : "text-stone-900"}`}>
                        Start Your Project
                    </h2>
                    <p className={`mt-4 text-base font-light max-w-lg mx-auto ${isDark ? "text-white/50" : "text-stone-500"}`}>
                        Ready to transform your space? Fill in the form or reach us directly — we&quot;re based right here in Kampala.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        {/* Map placeholder */}
                        <div className="relative h-52 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1578922746465-3a80a228f223?w=600&q=80"
                                alt="Kampala"
                                className="w-full h-full object-cover"
                            />
                            <div className={`absolute inset-0 flex items-center justify-center ${isDark ? "bg-[#0e0e0e]/60" : "bg-stone-900/40"}`}>
                                <div className="text-center">
                                    <FiMapPin className="text-[#c8a97e] mx-auto mb-2" size={28} />
                                    <p className="text-white font-['Playfair_Display'] font-semibold">Kampala, Uganda</p>
                                    <p className="text-white/70 text-xs mt-1">1017 Washington Ave, Kampala</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: FiMapPin, label: "Address", val: "1017 Washington Ave, Kampala, Uganda" },
                                { icon: FiPhone, label: "Phone", val: "+256 700 000 000" },
                                { icon: FiMail, label: "Email", val: "hello@muhsininteriors.ug" },
                            ].map((item) => (
                                <div key={item.label} className="flex items-start gap-4">
                                    <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${isDark ? "bg-[#c8a97e]/10" : "bg-[#3d6b5e]/10"}`}>
                                        <item.icon size={16} className={isDark ? "text-[#c8a97e]" : "text-[#3d6b5e]"} />
                                    </div>
                                    <div>
                                        <p className={`text-xs tracking-widest uppercase font-medium mb-1 ${isDark ? "text-white/40" : "text-stone-400"}`}>{item.label}</p>
                                        <p className={`text-sm ${isDark ? "text-white/80" : "text-stone-700"}`}>{item.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="lg:col-span-3"
                    >
                        {sent ? (
                            <div className={`flex flex-col items-center justify-center h-full min-h-80 text-center p-12 ${isDark ? "bg-[#1a1a1a]" : "bg-white"}`}>
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${isDark ? "bg-[#c8a97e]/10" : "bg-[#3d6b5e]/10"}`}>
                                    <FiSend size={24} className={isDark ? "text-[#c8a97e]" : "text-[#3d6b5e]"} />
                                </div>
                                <h3 className={`font-['Playfair_Display'] text-2xl font-bold mb-3 ${isDark ? "text-white" : "text-stone-900"}`}>
                                    Message Sent!
                                </h3>
                                <p className={`text-sm font-light ${isDark ? "text-white/50" : "text-stone-500"}`}>
                                    Thank you for reaching out. Our team will get back to you within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className={`p-8 lg:p-10 ${isDark ? "bg-[#1a1a1a]" : "bg-white"}`}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className={`block text-xs tracking-[0.15em] uppercase font-medium mb-2 ${isDark ? "text-white/40" : "text-stone-400"}`}>
                                            Full Name
                                        </label>
                                        <input name="name" type="text" placeholder="John Doe" value={form.name} onChange={handleChange} required className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={`block text-xs tracking-[0.15em] uppercase font-medium mb-2 ${isDark ? "text-white/40" : "text-stone-400"}`}>
                                            Email Address
                                        </label>
                                        <input name="email" type="email" placeholder="john@email.com" value={form.email} onChange={handleChange} required className={inputClass} />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className={`block text-xs tracking-[0.15em] uppercase font-medium mb-2 ${isDark ? "text-white/40" : "text-stone-400"}`}>
                                        Service Interested In
                                    </label>
                                    <select name="service" value={form.service} onChange={handleChange} className={inputClass}>
                                        <option value="">Select a service</option>
                                        <option>Residential Design</option>
                                        <option>Commercial Spaces</option>
                                        <option>Space Planning</option>
                                        <option>Renovation & Build</option>
                                        <option>Furniture & Sourcing</option>
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <label className={`block text-xs tracking-[0.15em] uppercase font-medium mb-2 ${isDark ? "text-white/40" : "text-stone-400"}`}>
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={5}
                                        placeholder="Tell us about your space and vision..."
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                        className={`${inputClass} resize-none`}
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full flex items-center justify-center gap-3 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-colors ${isDark
                                        ? "bg-[#c8a97e] text-[#0e0e0e] hover:bg-[#d4b88a]"
                                        : "bg-[#3d6b5e] text-white hover:bg-[#2d5248]"
                                        }`}
                                >
                                    Send Message
                                    <FiSend size={14} />
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}