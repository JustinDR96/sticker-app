// src/components/Homepage.jsx
import React, { useEffect, useState } from "react";
import supabase from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api/getUserInfo";

const Homepage = () => {
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

  return (
    <div className="page_container">
      <img className="profile_picture" src={userInfo.profile_picture} alt="" />
      <p>Nom : {userInfo.username}</p>
      <p>Email : {userInfo.email}</p>
    </div>
  );
};

export default Homepage;
