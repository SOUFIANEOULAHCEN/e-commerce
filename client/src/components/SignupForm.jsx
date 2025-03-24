import React, { useEffect, useState } from "react";
import { Button } from "./ui/Button";
// import Button from "../ui/Button";

const SignupForm = () => {
  const [inputsValues, SetInputsValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    checkPassword: "",
  });

  const CheckerPassword = (password, checkPassword) => {
    if (password !== checkPassword) {
      return false;
    }
    return true;
  };
  useEffect(() => {}, []);
  return (
    <form action="" className="w-full h-auto">
      <h1 className="text-center text-6xl font-bold mb-3">Register</h1>
      <div className="w-full my-1">
        <label htmlFor="" className="text-sm font-bold">
          firstname
        </label>
        <input
          className="w-full border-2 px-2 py-1 my-1 text-sm font-semibold"
          type="firstname"
          required
          minLength={5}
          name="firstname"
          id="firstname"
          placeholder="Enter your firstname"
          value={inputsValues.first_name}
          onChange={(e) =>
            SetInputsValues({ ...prev, first_name: e.target.value })
          }
        />
      </div>
      <div className="w-full my-1">
        <label htmlFor="" className="text-sm font-bold">
          lastname
        </label>
        <input
          className="w-full border-2 px-2 py-1 my-1 text-sm font-semibold"
          type="lastname"
          required
          minLength={5}
          name="lastname"
          id="lastname"
          placeholder="Enter your lastname"
          value={inputsValues.last_name}
          onChange={(e) =>
            SetInputsValues({ ...prev, last_name: e.target.value })
          }
        />
      </div>
      <div className="w-full my-1">
        <label htmlFor="" className="text-sm font-bold">
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
          onChange={(e) => SetInputsValues({ ...prev, email: e.target.value })}
        />
      </div>
      <div className="w-full my-1">
        <label htmlFor="" className="text-sm font-bold">
          password
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
            SetInputsValues({ ...prev, password: e.target.value })
          }
        />
      </div>
      <div className="w-full my-1">
        <label htmlFor="" className="text-sm font-bold">
          Confirme password
        </label>
        <input
          className="w-full border-2 px-2 py-1 my-1 text-sm font-semibold"
          type="password"
          required
          minLength={5}
          name="confirmpassword"
          id="confirmpassword"
          placeholder="confirm your password"
          value={inputsValues.checkPassword}
          onChange={(e) =>
            SetInputsValues({ ...prev, checkPassword: e.target.value })
          }
        />
      </div>
      <div className="w-full my-1 ">
        <Button className="bg-gray-950 w-full text-gray-100 hover:bg-gray-800 hover:text-gray-100">
          Sign in
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
