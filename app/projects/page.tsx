import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ProjectsHubClient from "./ProjectsHubClient";

export const metadata = {
    title: "Project Portfolio | Before & Afters | Yuri Perfections",
    description:
        "Browse stunning before and after photos from Yuri Perfections projects — ceiling systems, custom cabinetry, renovations, and more.",
};

export default async function ProjectsPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-dvh">
                <ProjectsHubClient />
            </main>
            <Footer />
            <ScrollToTop />
        </>
    );
}