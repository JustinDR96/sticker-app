/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import supabase from "../../utils/supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

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
    }

    const { error: userError } = await supabase
      .from("users")
      .insert([
        { uuid: data.user.id, email: data.user.email, username: username },
      ]); // Ajout de l'email ici

    if (userError) {
      throw new Error(
        `Erreur lors de l'insertion de l'utilisateur : ${userError.message}`
      );
    } else {
      const { session } = data;
      if (session) {
        localStorage.setItem("token", session.access_token);
        navigate(from, { replace: true });
      }
    }
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
