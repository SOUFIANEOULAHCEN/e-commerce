import React, { useEffect, useState } from "react";
// import { Button } from "./ui/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const [inputsValues, setInputsValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    checkPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputsValues.password !== inputsValues.checkPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:4000/auth/register", {
        first_name: inputsValues.first_name,
        last_name: inputsValues.last_name,
        email: inputsValues.email,
        password: inputsValues.password,
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-auto">
      <h1 className="text-center text-6xl font-bold mb-3">Register</h1>
      <div className="w-full my-1">
        <label htmlFor="firstname" className="text-sm font-bold">
          First Name
        </label>
        <input
          className="w-full border-2 px-2 py-1 my-1 text-sm font-semibold text-gray-700"
          type="text"
          required
          minLength={2}
          name="firstname"
          id="firstname"
          placeholder="Enter your firstname"
          value={inputsValues.first_name}
          onChange={(e) =>
            setInputsValues({ ...inputsValues, first_name: e.target.value })
          }
        />
      </div>
      <div className="w-full my-1">
        <label htmlFor="lastname" className="text-sm font-bold">
          Last Name
        </label>
        <input
          className="w-full border-2 px-2 py-1 my-1 text-sm font-semibold"
          type="text"
          required
          minLength={2}
          name="lastname"
          id="lastname"
          placeholder="Enter your lastname"
          value={inputsValues.last_name}
          onChange={(e) =>
            setInputsValues({ ...inputsValues, last_name: e.target.value })
          }
        />
      </div>
      <div className="w-full my-1">
        <label htmlFor="email" className="text-sm font-bold">
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
        <label htmlFor="password" className="text-sm font-bold">
          Password
        </label>
        <input
          className="w-full border-2 px-2 py-1 my-1 text-sm font-semibold"
          type="password"
          required
          minLength={5}
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
        <label htmlFor="confirmpassword" className="text-sm font-bold">
          Confirm Password
        </label>
        <input
          className="w-full border-2 px-2 py-1 my-1 text-sm font-semibold"
          type="password"
          required
          minLength={5}
          name="confirmpassword"
          id="confirmpassword"
          placeholder="Confirm your password"
          value={inputsValues.checkPassword}
          onChange={(e) =>
            setInputsValues({ ...inputsValues, checkPassword: e.target.value })
          }
        />
      </div>
      <div className="w-full my-1 ">
        <button type='submit' className="bg-gray-950 w-full text-gray-100 hover:bg-gray-800 hover:text-gray-100">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignupForm;