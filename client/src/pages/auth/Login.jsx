import React from "react";
import LoginForm from "../../components/LoginForm";
// import { Button } from "components/ui/button";
import { Button } from "../../components/ui/button";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen w-[70%] mx-auto">
      <h1 className="text-gray-950 text-6xl font-bold">Log In</h1>
      <div className="w-11/12 flex gap-6">
        <LoginForm></LoginForm>
        <div className="h-auto text-center">
          <h1 className="text-center text-2xl font-bold mb-10">New Customer</h1>
          <p className="text-left my-2 font-medium px-5 mb-16">
            Sign up for early Sale access plus tailored new arrivals, trends and
            promotions. To opt out, click unsubscribe in our emails.
          </p>
          <div className="w-full">
            <Button
              variant="outline"
              className=" duration-300 transition-colors w-full mt-1  hover:bg-gray-800 hover:text-gray-100"
              onClick={() => navigate("/register")}
            >
              Regitser
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
