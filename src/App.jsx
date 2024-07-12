import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import supabase from "./utils/supabaseClient";
import { ProtectedRoutes } from "./components";
import { Register, Homepage } from "./pages";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
      } else {
        setSession(data.session);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener?.unsubscribe?.();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes session={session} />}>
          <Route path="/" element={<Homepage session={session} />} />
          <Route path="/home" element={<Homepage session={session} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
