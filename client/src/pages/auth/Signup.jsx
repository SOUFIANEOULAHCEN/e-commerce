import React from "react";
import SignupForm from "../../components/SignupForm";
// import { Button } from "components/ui/button";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen w-[70%] mx-auto">
      <div className="w-11/12 flex flex-col gap-6">
        <SignupForm />
        <div className="h-auto text-center w-full">
          <p className="text-left my-2 font-medium px-5 mb-10">
            Sign up for early Sale access plus tailored new arrivals, trends and
            promotions. To opt out, click unsubscribe in our emails.
          </p>
          <Button
            variant="outline"
            className="w-full duration-500 transition-all hover:bg-gray-800 hover:text-gray-100"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
