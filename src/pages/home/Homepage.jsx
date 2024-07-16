// src/components/Homepage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Homepage = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("/api/user-info");
        setUserInfo(response.data);
        console.log(response);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations utilisateur",
          error
        );
      }
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
