router.get("/user-info", async (req, res) => {
  try {
    const sessionResponse = await supabase.auth.getSession();
    const session = sessionResponse.data.session;
    console.log(session);

    if (!session) {
      return res.status(401).json({ error: "Non authentifié" });
    }

    const userId = session.user.id;
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
      return res.status(500).json({
        error: "Erreur lors de la récupération des données utilisateur",
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations utilisateur",
      error
    );
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
});
