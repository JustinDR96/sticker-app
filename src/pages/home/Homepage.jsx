import React from "react";
import supabase from "../../utils/supabaseClient";

function Homepage({ session }) {
  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      <h1>Homepage</h1>
      <p>Welcome to the homepage</p>
      <p>Welcome, {session?.user.user_metadata.username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Homepage;
