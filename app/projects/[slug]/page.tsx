import React from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ProjectDetailClient from "./ProjectDetailClient";
import { projects } from "@/data/projects";

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for all project slugs
export async function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

// Dynamic metadata per project
export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) return {};
    return {
        title: `${project.title} | Before & After | Yuri Perfections`,
        description: project.desc,
    };
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) notFound();

    return (
        <>
            <Navbar />
            <main className="min-h-dvh">
                <ProjectDetailClient slug={slug} />
            </main>
            <Footer />
            <ScrollToTop />
        </>
    );
}