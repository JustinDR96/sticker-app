import supabase from "../utils/supabaseClient";

export async function getStickerInfo(stickerIds) {
  const id = stickerIds instanceof Array ? stickerIds : [stickerIds];

  const { data, error } = await supabase
    .from("stickers")
    .select("*")
    .in("id", id); // Utilise 'in' pour filtrer par un tableau d'IDs
  console.log(data);
  if (error) {
    console.error("Erreur lors de la récupération des stickers", error);
    return null;
  }

  return data; // Retourne un tableau des stickers correspondants
}
