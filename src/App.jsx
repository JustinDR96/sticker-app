import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Register, Homepage, CollectionUser } from "./pages";
import { ProtectedRoute, NavBar } from "./components";
import supabase from "./utils/supabaseClient";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/collection"
          element={
            <ProtectedRoute>
              <CollectionUser />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </Router>
  );
}

export default App;
