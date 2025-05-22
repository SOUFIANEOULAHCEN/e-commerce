import React, { useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/contexts/ToastContext";
import { InputEnhanced } from "./ui/input-enhanced";
import { ButtonAnimated } from "./ui/button-animated";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const LoginForm = () => {
  const navigate = useNavigate();
  const [inputsValues, setInputsValues] = useState({
    email: "",
    password: "",
  });
  const { error: showErrorToast, success: showSuccessToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, {
        email: inputsValues.email,
        password: inputsValues.password,
      });

      // Handle successful login
      showSuccessToast("Connexion réussie ! Redirection...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Échec de la connexion";
      showErrorToast(errorMessage);
      console.error("Login error:", err);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="w-full max-w-md mx-auto"
      >
        <form onSubmit={handleSubmit} className="relative overflow-hidden w-full p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-900 to-gray-700"></div>
          
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Connexion</h1>
            <p className="text-gray-500 mt-2">Accédez à votre compte</p>
          </motion.div>
  
          <div className="space-y-5">
            <motion.div variants={itemVariants} className="w-full">
              <InputEnhanced
                type="email"
                required
                minLength={5}
                name="email"
                id="email"
                label="Email"
                icon={<Mail className="h-4 w-4" />}
                placeholder="Entrez votre email"
                value={inputsValues.email}
                onChange={(e) =>
                  setInputsValues({ ...inputsValues, email: e.target.value })
                }
                className="transition-all duration-300 focus-within:ring-2 focus-within:ring-gray-900/50"
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="w-full">
              <InputEnhanced
                type="password"
                required
                minLength={2}
                name="password"
                id="password"
                label="Mot de passe"
                icon={<Lock className="h-4 w-4" />}
                placeholder="Entrez votre mot de passe"
                value={inputsValues.password}
                onChange={(e) =>
                  setInputsValues({ ...inputsValues, password: e.target.value })
                }
                className="transition-all duration-300 focus-within:ring-2 focus-within:ring-gray-900/50"
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-gray-900 hover:text-gray-700 transition-colors duration-200">
                Mot de passe oublié ?
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants} className="w-full pt-4">
              <ButtonAnimated
                className="w-full group relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                type="submit"
                variant="gradient"
                animation="ripple"
              >
                <span className="flex items-center justify-center gap-2">
                  Se connecter
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </ButtonAnimated>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center mt-6">
              <p className="text-gray-500">
                Pas encore de compte ?{" "}
                <Link to="/signup" className="text-gray-900 hover:text-gray-700 font-medium transition-colors duration-200">
                  S'inscrire
                </Link>
              </p>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginForm;