import { supabase } from "./supabase";

export async function awardPoints(playerId: string, currentScore: number, delta: number) {
  const { data, error } = await supabase
    .from("players")
    .update({ score: currentScore + delta })
    .eq("id", playerId)
    .select();
  return { data, error };
}

