function AuthToggle({ mode, setMode }) {
  return (
    <div className="auth-toggle">
      <button
        className={mode === "login" ? "active" : ""}
        onClick={() => setMode("login")}
      >
        Login
      </button>

      <button
        className={mode === "signup" ? "active" : ""}
        onClick={() => setMode("signup")}
      >
        Sign Up
      </button>
    </div>
  );
}

export default AuthToggle;
