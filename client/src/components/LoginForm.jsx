import React, { useState } from "react";
import axios from "axios";
// import { Button } from "components/ui/button";
import { Button } from "./ui/button";
import { redirect, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [inputsValues, setInputsValues] = useState({
    email: "",
    password: "",
  });
  const [Showerror, setShowError] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email: inputsValues.email,
        password: inputsValues.password,
      });

      // Handle successful login (e.g., store token, redirect, etc.)
      console.log("Login successful:", response.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed"); // Display error message
      console.error("Login error:", err);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-4/5 h-auto">
      <h1 className="text-center text-2xl font-bold mb-3">Login</h1>

      {Showerror && (
        <p className="text-red-600 text-center w-full bg-red-300 px-6 py-2 rounded-md">
          {error}
        </p>
      )}

      <div className="w-full my-1">
        <label htmlFor="email" className="text-lg font-bold">
          Email
        </label>
        <input
          className="w-full border-2 px-2 py-1 my-1 text-sm font-semibold"
          type="email"
          required
          minLength={5}
          name="email"
          id="email"
          placeholder="Enter your email"
          value={inputsValues.email}
          onChange={(e) =>
            setInputsValues({ ...inputsValues, email: e.target.value })
          }
        />
      </div>
      <div className="w-full my-1">
        <label htmlFor="password" className="text-lg font-bold">
          Password
        </label>
        <input
          className="w-full border-2 px-2 py-1 my-1 text-sm font-semibold"
          type="password"
          required
          minLength={2}
          name="password"
          id="password"
          placeholder="Enter your password"
          value={inputsValues.password}
          onChange={(e) =>
            setInputsValues({ ...inputsValues, password: e.target.value })
          }
        />
      </div>
      <div className="w-full my-1">
        <Button
          className="bg-gray-950 w-full text-gray-100 hover:bg-gray-800 hover:text-gray-100"
          type="submit" // Ensure the button submits the form
        >
          Log in
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
