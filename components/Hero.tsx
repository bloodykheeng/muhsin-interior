"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const slides = [
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=90",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=90",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=90",
];

export default function Hero() {
    const [current, setCurrent] = useState(0);
    const nextIndex = (current + 1) % slides.length;

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <section className="relative w-full overflow-hidden">

            {/* SPLIT BACKGROUND */}
            <div className="absolute inset-0 flex">
                <div className="w-1/2 bg-white dark:bg-neutral-950" />
                <div className="w-1/2 bg-neutral-100 dark:bg-neutral-900" />
            </div>

            <div className="relative z-10 w-full mx-auto px-2 md:px-4 lg:px-8 pt-24 pb-20">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* ── SLIDER ── */}
                    <div className="relative w-full lg:w-1/2 h-[250px] md:h-[420px] lg:h-[650px] flex items-center justify-center order-1 lg:order-2 lg:mt-15">
                        <div className="relative w-full h-full lg:w-[65%] lg:h-[55%] flex justify-center items-center">

                            <div className="relative w-[85%] h-[80%] z-20 shadow-2xl lg:absolute lg:w-[170%] lg:h-[130%] lg:bottom-[20%] lg:right-[40%]">
                                {slides.map((src, index) => (
                                    <Image
                                        key={index}
                                        src={src}
                                        alt={`Yuri Perfections project ${index + 1}`}
                                        fill
                                        className={`object-cover transition-opacity duration-700 ${index === current ? "opacity-100" : "opacity-0"}`}
                                        priority={index === 0}
                                    />
                                ))}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                                    {slides.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrent(index)}
                                            className={`transition-all duration-300 ${index === current ? "w-6 h-2 bg-[#F5C518]" : "w-2 h-2 bg-white/60"}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="absolute bottom-3 right-3 w-[40%] h-[30%] z-10 lg:relative lg:w-full lg:h-full lg:bottom-0 lg:right-0">
                                <Image src={slides[nextIndex]} alt="Next project preview" fill className="object-cover shadow-xl" />
                            </div>
                        </div>
                    </div>

                    {/* ── TEXT ── */}
                    <div className="relative z-30 w-full lg:w-1/2 order-2 lg:order-1 flex justify-start px-4 sm:px-6 lg:px-0">
                        <div className="w-full max-w-sm lg:max-w-none bg-white/90 dark:bg-black/70 backdrop-blur-md shadow-xl px-6 py-6 lg:bg-transparent lg:dark:bg-transparent lg:backdrop-blur-none lg:shadow-none lg:px-0 lg:py-0">

                            {/*
                                Headline — each word/phrase gets its own tight inline bg block.
                                Reduced font size so "Precision Craftsmanship." fits on one row
                                and "Exceptional Finishes." fits on another row.
                            */}
                            <h1 className="font-['Poppins'] font-bold uppercase leading-[1.6] tracking-[0.04em] text-[28px] sm:text-[34px] lg:text-[38px] xl:text-[44px]">
                                {/* Row 1: Precision Craftsmanship. */}
                                <span className="block">
                                    <span className="inline bg-white dark:bg-neutral-950 text-[#181B34] dark:text-white px-2 py-0.5 box-decoration-clone">
                                        Precision{" "}
                                    </span>
                                    <span className="inline bg-[#181B34] dark:bg-[#181B34] text-[#F5C518] px-2 py-0.5 box-decoration-clone">
                                        Craftsmanship.
                                    </span>
                                </span>
                                {/* Row 2: Exceptional Finishes. */}
                                <span className="block mt-1">
                                    <span className="inline bg-white dark:bg-neutral-950 text-[#181B34] dark:text-white px-2 py-0.5 box-decoration-clone">
                                        Exceptional{" "}
                                    </span>
                                    <span className="inline bg-white dark:bg-neutral-950 text-[#181B34] dark:text-white px-2 py-0.5 box-decoration-clone">
                                        Finishes.
                                    </span>
                                </span>
                            </h1>

                            <p className="mt-5 text-[14px] lg:text-[15px] text-gray-600 dark:text-gray-400 max-w-xs lg:max-w-[280px] leading-7 font-['Poppins'] font-light">
                                At Yuri Perfections, we specialize in interior &amp; exterior renovation — ceiling installation, wall remodeling, painting, custom cabinetry, aluminum framing, and terrace systems.
                            </p>

                            <div className="mt-7 flex flex-wrap gap-3">
                                <a
                                    href="#contact"
                                    className="inline-flex items-center bg-[#F5C518] text-[#181B34] px-6 py-3 text-[11px] tracking-[0.18em] uppercase font-bold font-['Poppins'] hover:bg-[#e6b800] transition-colors whitespace-nowrap"
                                >
                                    Schedule Consultation
                                </a>
                                <a
                                    href="#projects"
                                    className="inline-flex items-center border-2 border-[#181B34] dark:border-white text-[#181B34] dark:text-white px-6 py-3 text-[11px] tracking-[0.18em] uppercase font-bold font-['Poppins'] hover:bg-[#181B34] hover:text-white dark:hover:bg-white dark:hover:text-[#181B34] transition-colors whitespace-nowrap"
                                >
                                    View Portfolio
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}