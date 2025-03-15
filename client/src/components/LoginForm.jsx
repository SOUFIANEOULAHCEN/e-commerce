import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  const [inputsValues, SetInputsValues] = useState({
    email: "",
    password: "",
  });
  return (
    <form action="" className="w-4/5 h-auto">
      <h1 className="text-center text-2xl font-bold mb-3">Login</h1>

      <div className="w-full my-1">
        <label htmlFor="" className="text-lg font-bold">
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
            SetInputsValues({ ...inputsValues, email: e.target.value })
          }
        />
      </div>
      <div className="w-full my-1">
        <label htmlFor="" className="text-lg font-bold">
          password
        </label>
        <input
          className="w-full border-2 px-2 py-1 my-1 text-sm font-semibold"
          type="password"
          required
          minLength={5}
          name="firstname"
          id="firstname"
          placeholder="Enter your password"
          value={inputsValues.password}
          onChange={(e) =>
            SetInputsValues({ ...inputsValues, password: e.target.value })
          }
        />
      </div>
      <div className="w-full my-1">
        <Button
          className="bg-gray-950 w-full text-gray-100 hover:bg-gray-800 hover:text-gray-100"
        >
          Log in
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
