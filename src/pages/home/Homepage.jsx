// src/components/Homepage.jsx
import React, { useEffect, useState } from "react";
import supabase from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api/getUserInfo";
import { StickerCard } from "../../components";
import { getStickersUsers } from "../../api/getStickersUsers";

const Homepage = () => {
  const navigate = useNavigate(); // Utilisez useNavigate pour la redirection après déconnexion
  const [userInfo, setUserInfo] = useState(null);
  const [stickersUsers, setStickersUsers] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
    };
    fetchUserInfo();

    const fetchStickersUsers = async () => {
      const stickersUsers = await getStickersUsers();
      setStickersUsers(stickersUsers);
      console.log("sticker user", stickersUsers);
    };
    fetchStickersUsers();
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
      <p>Nom : {userInfo.username}</p>
      <p>Email : {userInfo.email}</p>
      {stickersUsers.map((stickerUser) => (
        <StickerCard
          key={stickerUser.sticker_id}
          stickerId={stickerUser.sticker_id}
        />
      ))}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Homepage;
