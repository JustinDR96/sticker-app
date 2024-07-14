// src/components/Homepage.jsx
import React, { useEffect, useState } from "react";
import supabase from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api/getUserInfo";
import { getStickersUsers } from "../../api/getStickersUsers";
import { getStickerInfo } from "../../api/getStickersInfo";
import { StickersCard } from "../../components";

const Homepage = () => {
  const navigate = useNavigate(); // Utilisez useNavigate pour la redirection après déconnexion
  const [userInfo, setUserInfo] = useState(null);
  const [userStickers, setUserStickers] = useState([]);
  const [stickersInfo, setStickersInfo] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
    };
    fetchUserInfo();

    const fetchStickersInfo = async () => {
      const stickersInfo = await getStickersUsers();
      setUserStickers(stickersInfo);
    };
    fetchStickersInfo();

    const fetchStickers = async () => {
      const stickers = await getStickerInfo(
        userStickers.map((sticker) => sticker.sticker_id)
      );
      setStickersInfo(stickers);
    };
    fetchStickers();
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
      <h2>Vos stickers</h2>
      <ul>
        {stickersInfo.map((sticker) => (
          <StickersCard key={sticker.id} sticker={sticker} />
        ))}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Homepage;
