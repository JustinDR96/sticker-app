import React from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../utils/supabaseClient";

function NavBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    supabase.auth.signOut();
    navigate("/register");
  };

  return (
    <div className="navbar">
      <ul>
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/register">Register</a>
        </li>
        <li>
          <a href="/collection">Collection</a>
        </li>
        <li>
          <button className="deconnexion" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
