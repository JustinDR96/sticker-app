import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Register, Homepage } from "./pages";
import { ProtectedRoute } from "./components";

function App() {
  return (
    <Router>
      <div className="navbar">
        <ul>
          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/home">Home</a>
          </li>
        </ul>
      </div>

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
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </Router>
  );
}

export default App;
