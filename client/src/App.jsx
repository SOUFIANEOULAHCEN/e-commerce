import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
// import Login from "./pages/auth/Login";
// import SignUp from "./pages/auth/Signup"
import Dashboard from "./pages/Dashbord/Dashboard";
import { ToastProvider } from "./contexts/ToastContext";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

function App() {
  return (
    <ToastProvider position="top-right">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
