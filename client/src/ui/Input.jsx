import React from "react";

const Input = () => {
  return (
    <>
      <input
        className="w-full border-2 px-2 py-1 my-1 text-sm font-semibold"
        type="password"
        required
        minLength={5}
        name="firstname"
        id="firstname"
        placeholder="Enter your password"
      />
    </>
  );
};

export default Input;
