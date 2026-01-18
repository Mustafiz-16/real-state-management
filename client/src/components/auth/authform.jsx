import { useState } from "react";
import RoleSelect from "./roleselect";
import InputField from "./inputfield";
import TermsNote from "./termnotes";
import { loginUser, signupUser } from "../../Api/auth.api"; // path
import { useNavigate } from "react-router-dom";


function AuthForm({ mode }) {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!formData.role || !formData.email || !formData.password) {
  //     alert("Please fill all required fields.");
  //     return;
  //   }

  //   if (mode === "signup" && formData.password !== formData.confirmPassword) {
  //     alert("Passwords don't match");
  //     return;
  //   }

  //   alert(`${mode === "login" ? "Login" : "Signup"} successful!`);
  // };
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (mode === "login") {
        res = await loginUser({ email: formData.email, password: formData.password });
      } else {
        res = await signupUser({
          role: formData.role,
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }

      const { token, user } = res.data;

      // Save token & user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect according to role
      if (user.role === "buyer") navigate("/dashboard/buyer");
      else if (user.role === "owner") navigate("/dashboard/owner");
      else if (user.role === "admin") navigate("/dashboard/admin");
      else navigate("/"); // fallback

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };


  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <RoleSelect value={formData.role} onChange={handleChange} />

      {mode === "signup" && (
        <InputField
          label="Full Name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
      )}

      <InputField
        label="Email"
        type="email"
        name="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
      />

      {mode === "signup" && (
        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      )}

      {mode === "login" && (
        <div className="forgot-box">
          <a href="#">Forgot password?</a>
        </div>
      )}

      <button type="submit" className="submit-btn">
        {mode === "login" ? "Login" : "Create Account"}
      </button>

      {mode === "signup" && <TermsNote />}
    </form>
  );
}

export default AuthForm;
