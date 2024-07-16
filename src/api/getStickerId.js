import supabase from "../../utils/supabaseClient";

export async function getStickerId({ stickerId }) {
  const { data, error } = await supabase
    .from("stickers")
    .select("*")
    .eq("id", stickerId) // Utilise 'eq' pour filtrer par un ID exact
    .single(); // Assure la récupération d'un seul enregistrement
  if (error) {
    console.error("Erreur lors de la récupération du sticker", error);
    return null;
  }

  return data; // Retourne un tableau des stickers correspondants
}
