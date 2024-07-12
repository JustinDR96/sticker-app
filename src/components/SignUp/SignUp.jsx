/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import supabase from "../../utils/supabaseClient"; // Assurez-vous que le chemin est correct

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const signUp = async (event) => {
    event.preventDefault();

    // Créer un nouvel utilisateur
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
        },
      },
    });

    if (error) {
      console.error("Error signing in:", error.message);
    } else {
      console.log("User signed in successfully:", data);
    }

    const { error: userError } = await supabase
      .from("users")
      .insert([{ email: data.user.email, username: username }]); // Ajout de l'email ici

    if (userError) {
      throw new Error(
        `Erreur lors de l'insertion de l'utilisateur : ${userError.message}`
      );
    }

    return "Inscription réussie !";
  };

  return (
    <form className="form" onSubmit={signUp}>
      <span class="title">Sign up</span>
      <span class="subtitle">Create a free account with your email.</span>
      <div class="form-container">
        <input
          type="text"
          placeholder="Entrez votre nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="input"
        />
        <input
          type="email"
          placeholder="Entrez votre e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />

        <input
          type="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
      </div>
      <button type="submit">S'inscrire</button>
    </form>
  );
}

export default SignUp;
