// getUserInfo.js
import supabase from "../../utils/supabaseClient"; // Assurez-vous que le chemin d'accès est correct

export async function getUserInfo() {
  const sessionResponse = await supabase.auth.getSession();
  const session = sessionResponse.data.session;

  if (session) {
    const userId = session.user.id;
    const username = session.user.user_metadata.username;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error(
        "Erreur lors de la récupération des données utilisateur",
        error
      );
      return null;
    }

    return data;
  }

  return null;
}
