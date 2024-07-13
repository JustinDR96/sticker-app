// Login.jsx
import { useState } from "react";
import supabase from "../../utils/supabaseClient";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) console.error("Error signing in:", error.message);
  };

  return (
    <form className="form" onSubmit={handleSignIn}>
      <span class="title">Login</span>
      <span class="subtitle">Create a free account with your email.</span>
      <div class="form-container">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
