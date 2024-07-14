// Login.jsx
import { useState } from "react";
import supabase from "../../utils/supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Error logging in:", error);
    } else {
      const { session } = data;
      if (session) {
        localStorage.setItem("token", session.access_token);
        navigate(from, { replace: true });
      }
    }
  };

  return (
    <form className="form" onSubmit={handleLogin}>
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
