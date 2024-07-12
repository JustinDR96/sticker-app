/* eslint-disable react/prop-types */
import { useEffect } from "react";
import supabase from "../../utils/supabaseClient";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, session }) {
  useEffect(() => {
    const checkSession = async () => {
      const session = supabase.auth.getSession();

      if (!session) {
        window.location.href = "/register";
      }
    };

    checkSession();
  }, []);

  return session ? children : <Navigate to="/register" />;
}

export default PrivateRoute;
