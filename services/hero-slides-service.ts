import { createClient } from "@/utils/supabase/client";
import { QueryClient } from "@tanstack/react-query";

export type HeroSlide = {
    id: number;
    image_url: string;
    alt_text: string;
    order: number;
    status: "active" | "inactive";
    created_at: string;
};

export const HERO_SLIDES_QUERY_KEY = ["hero_slides", "active"];

// ── Fetch active slides ───────────────────────────────────────────────────────
export async function getActiveHeroSlides(): Promise<HeroSlide[]> {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("hero_slides")
        .select("*")
        .eq("status", "active")
        .order("order", { ascending: true });

    if (error) throw new Error(error.message);

    return data ?? [];
}

// ── Realtime subscription — call once, pass your queryClient in ───────────────
export function subscribeToHeroSlides(queryClient: QueryClient) {
    const supabase = createClient();

    const channel = supabase
        .channel("hero_slides_realtime")
        .on(
            "postgres_changes",
            {
                event: "*", // INSERT | UPDATE | DELETE
                schema: "public",
                table: "hero_slides",
            },
            () => {
                queryClient.invalidateQueries({ queryKey: HERO_SLIDES_QUERY_KEY });
            }
        )
        .subscribe();

    // Return cleanup function so the component can unsubscribe on unmount
    return () => {
        supabase.removeChannel(channel);
    };
}