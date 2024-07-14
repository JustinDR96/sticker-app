import React, { useState } from "react";
import { SignUp, Login } from "../../components";

function Register() {
  const [activeComponent, setActiveComponent] = useState("SignUp");

  const toggleComponent = () => {
    setActiveComponent((prevComponent) =>
      prevComponent === "SignUp" ? "Login" : "SignUp"
    );
  };

  return (
    <div className="page_container">
      <div className="Register-container">
        <div className="form-box">
          {activeComponent === "SignUp" ? <SignUp /> : <Login />}
          <div className="form-section">
            <p>
              <a onClick={toggleComponent}>
                {activeComponent === "SignUp" ? "Login" : "Sign Up"}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
