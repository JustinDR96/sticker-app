// src/components/Homepage.jsx
import React, { useEffect, useState } from "react";
import supabase from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api/getUserInfo";

const Homepage = () => {
  const navigate = useNavigate(); // Utilisez useNavigate pour la redirection après déconnexion
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
    };
    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return <div>Chargement des informations de l'utilisateur...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    supabase.auth.signOut();
    navigate("/register");
  };

  return (
    <div>
      <h1>Protected Data</h1>
      <p>Nom : {userInfo.username}</p>
      <p>Email : {userInfo.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Homepage;
