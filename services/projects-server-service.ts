"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import type { Project } from "./projects-service";

async function buildClient() {
    const cookieStore = await cookies();
    return createClient(cookieStore);
}

// ── All active projects (with images) ────────────────────────────────────────
export async function getActiveProjectsServer(): Promise<Project[]> {
    const supabase = await buildClient();

    const { data, error } = await supabase
        .from("projects")
        .select("*, project_images(*)")
        .eq("status", "active")
        .order("order", { ascending: true });

    if (error) throw new Error(error.message);

    return (data ?? []).map((p) => ({
        ...p,
        project_images: [...(p.project_images ?? [])].sort((a, b) => a.order - b.order),
    }));
}

// ── Single project by slug (with images) ─────────────────────────────────────
export async function getProjectBySlugServer(slug: string): Promise<Project | null> {
    const supabase = await buildClient();

    const { data, error } = await supabase
        .from("projects")
        .select("*, project_images(*)")
        .eq("slug", slug)
        .eq("status", "active")
        .single();

    if (error) return null;

    return {
        ...data,
        project_images: [...(data.project_images ?? [])].sort((a, b) => a.order - b.order),
    };
}
