import supabase from "../utils/supabaseClient";
import { getStickerInfo } from "./getStickersInfo"; // Assurez-vous que le chemin d'importation est correct

export async function getStickersUsers() {
  const sessionResponse = await supabase.auth.getSession();
  const session = sessionResponse.data.session;

  if (session) {
    const userId = session.user.id;

    const { data, error } = await supabase
      .from("user_stickers")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error(
        "Erreur lors de la récupération des données utilisateur",
        error
      );
      return null;
    }

    // Supposons que vous vouliez appeler getStickerInfo pour chaque sticker_id récupéré
    data.forEach((sticker) => {
      getStickerInfo(sticker.sticker_id);
    });

    return data;
  }

  return null;
}
