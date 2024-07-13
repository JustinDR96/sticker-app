// src/components/auth/RequireAuth.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const RequireAuth = ({ children }) => {
  const { session } = useAuth();

  const navigate = useNavigate();

  if (session === null) {
    return null; // Vous pouvez aussi afficher un loader ici
  }
  return session ? children : navigate("/register");
};

export default RequireAuth;
