// App.jsx
import { useState, useEffect } from "react";
import supabase from "./utils/supabaseClient";
import { SignUp, Login } from "./components";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };
    getSession();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <div>
      <h1>Welcome to Supabase Auth</h1>
      {!session ? (
        <>
          <SignUp />
          <Login />
        </>
      ) : (
        <div>
          <p>Welcome, {session.user.user_metadata.username}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
