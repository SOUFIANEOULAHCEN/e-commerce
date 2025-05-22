import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_ENDPOINTS } from "@/config/api";
import { useToast } from "@/contexts/ToastContext";
import { InputEnhanced } from "./ui/input-enhanced";
import { ButtonAnimated } from "./ui/button-animated";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const SignupForm = () => {
  const navigate = useNavigate();
  const [inputsValues, setInputsValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    checkPassword: "",
  });

  const { error: showErrorToast, success: showSuccessToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputsValues.password !== inputsValues.checkPassword) {
      showErrorToast("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      await axios.post(API_ENDPOINTS.AUTH.REGISTER, {
        first_name: inputsValues.first_name,
        last_name: inputsValues.last_name,
        email: inputsValues.email,
        password: inputsValues.password,
      });
      showSuccessToast("Inscription réussie ! Redirection vers la page de connexion...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erreur lors de l'inscription";
      showErrorToast(errorMessage);
      console.error("Registration error:", error);
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Inscription</h1>
            <p className="text-gray-500 mt-2">Créez votre compte</p>
          </motion.div>
  
          <div className="space-y-5">
            <motion.div variants={itemVariants} className="w-full">
              <InputEnhanced
                type="text"
                required
                minLength={2}
                name="firstname"
                id="firstname"
                label="Prénom"
                icon={<User className="h-4 w-4" />}
                placeholder="Entrez votre prénom"
                value={inputsValues.first_name}
                onChange={(e) =>
                  setInputsValues({ ...inputsValues, first_name: e.target.value })
                }
                className="transition-all duration-300 focus-within:ring-2 focus-within:ring-gray-900/50"
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="w-full">
              <InputEnhanced
                type="text"
                required
                minLength={2}
                name="lastname"
                id="lastname"
                label="Nom"
                icon={<User className="h-4 w-4" />}
                placeholder="Entrez votre nom"
                value={inputsValues.last_name}
                onChange={(e) =>
                  setInputsValues({ ...inputsValues, last_name: e.target.value })
                }
                className="transition-all duration-300 focus-within:ring-2 focus-within:ring-gray-900/50"
              />
            </motion.div>
            
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
                minLength={5}
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
            
            <motion.div variants={itemVariants} className="w-full">
              <InputEnhanced
                type="password"
                required
                minLength={5}
                name="checkPassword"
                id="checkPassword"
                label="Confirmer le mot de passe"
                icon={<Lock className="h-4 w-4" />}
                placeholder="Confirmez votre mot de passe"
                value={inputsValues.checkPassword}
                onChange={(e) =>
                  setInputsValues({ ...inputsValues, checkPassword: e.target.value })
                }
                className="transition-all duration-300 focus-within:ring-2 focus-within:ring-gray-900/50"
              />
            </motion.div>
            
            <motion.div variants={itemVariants} className="w-full pt-4">
              <ButtonAnimated
                className="w-full group relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                type="submit"
                variant="gradient"
                animation="ripple"
              >
                <span className="flex items-center justify-center gap-2">
                  S'inscrire
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </ButtonAnimated>
            </motion.div>
            
            <motion.div variants={itemVariants} className="text-center mt-6">
              <p className="text-gray-500">
                Déjà un compte ?{" "}
                <Link to="/login" className="text-gray-900 hover:text-gray-700 font-medium transition-colors duration-200">
                  Se connecter
                </Link>
              </p>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignupForm;