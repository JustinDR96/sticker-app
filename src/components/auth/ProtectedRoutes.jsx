import { useEffect } from "react";
import supabase from "../../utils/supabaseClient";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes({ session }) {
  useEffect(() => {
    const checkSession = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession();

      // Redirect if there is no session or an error occurs
      if (!sessionData || error) {
        window.location.href = "/register";
      }
    };

    if (!session) {
      checkSession();
    }
  }, [session]);

  // If session is valid, render the child routes
  return session ? <Outlet /> : <Navigate to="/register" />;
}

export default ProtectedRoutes;
