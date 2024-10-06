"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Auth } from "../../api/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";
import { LoginSkeleton } from "../../Shared/skeletons";

export default function LoginForm() {
  const authCtrl = new Auth();
  const router = new useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const {login} = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realiza la solicitud a la API
    const response = await authCtrl.Login(formData);

    console.log(response.jwt);
    if (response.jwt) {
      login(response.jwt)
      toast.success("Inicio de sesión exitoso");
      // setTimeout(() => {
      //router.push("/");
      // }, 3000);
    } else if (response.error) {
      toast.error("Usuario o contraseña incorrectos");
    }
  };

  const isFormValid = formData.identifier !== "" && formData.password !== "";

  return (
    <div className="flex items-center justify-center">
      {isLoading ? (
        <LoginSkeleton />
      ) : (
        <div className="formulario bg-white p-8 rounded shadow-lg w-full md:w-1/2 lg:w-1/3 border border-gray-300">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="identifier"
                className="block text-base font-medium text-gray-700"
              >
                Nombre de Usuario o Email
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                autoComplete="current-password"
                value={formData.identifier}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-base font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className={`btn-login bg-pink-400 w-full hover:bg-pink-300 text-white py-2 px-4 rounded-md ${
                !isFormValid && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
