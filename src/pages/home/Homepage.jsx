// src/components/Homepage.jsx
import React from "react";
import { useAuth } from "../../hooks/useAuth";

const Homepage = () => {
  const { session } = useAuth();

  return (
    <div>
      <h1>Homepage</h1>
      {session ? <p>Welcome, {session.user.email}</p> : <p>Please sign in.</p>}
    </div>
  );
};

export default Homepage;
