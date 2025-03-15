import { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/register" element={<SignUp></SignUp>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
