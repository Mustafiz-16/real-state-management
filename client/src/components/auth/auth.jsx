import { useState } from "react";
import AuthToggle from "../auth/authtoogle";
import AuthForm from "../auth/authform";
import "./auth.css";

function Auth() {
  const [mode, setMode] = useState("login");

  return (
    <div>
      <main className="auth-page">
        <div className="auth-container">
          <h1 className="auth-title">
            {mode === "login" ? "Login" : "Sign Up"}
          </h1>

          <AuthToggle mode={mode} setMode={setMode} />
          <AuthForm mode={mode} />
        </div>
      </main>
    </div>
  );
}

export default Auth;