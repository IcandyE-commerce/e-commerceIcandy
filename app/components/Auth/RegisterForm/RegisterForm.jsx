"use client";
import { useState } from "react";
import "./RegisterForm.css";
import Message from "../../Message";
import { Auth } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const authCtrl = new Auth();

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    username: "",
    email: "",
    password: "",
    lastname: "sd",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "username") {
      const username = e.target.value;
      if (username.length < 3) {
        setErrorMessage(
          "El nombre de usuario debe tener al menos 3 caracteres."
        );
      } else {
        setErrorMessage("");
      }
    }

    if (e.target.name === "password") {
      const password = e.target.value;
      let strength = 0;
      if (password.length >= 6) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/\d/.test(password)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.firstname.trim() === "" ||
      formData.username.trim() === "" ||
      formData.email.trim() === "" ||
      formData.password.trim() === "" ||
      passwordStrength !== 3
    ) {
      setMessage(
        "Por favor completa todos los campos y asegúrate de que la contraseña cumpla con los requisitos."
      );
      setShowMessage(true);
      return;
    }
    setLoading(true);
    const response = await authCtrl.register(formData);
    if (response.jwt) {
      toast.success("Usuario Registrado con exito");
      setTimeout(() => {
        router.push("/join/login");
      }, 3000);
    } else if (response.error) {
      toast.error(response.error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-full md:w-1/2 lg:w-1/3 border border-gray-300">
        <h2 className="text-lg lg:text-2xl font-bold mb-8">
          Informacion Personal
        </h2>
        <form onSubmit={handleSubmit}>
          {showMessage &&
            (formData.firstname.trim() === "" ||
              formData.username.trim() === "" ||
              formData.email.trim() === "" ||
              formData.password.trim() === "") && (
              <Message tipo="error">{message}</Message>
            )}

          <div className="space-y-6">
            <div>
              <label
                htmlFor="firstname"
                className="block text-base font-medium text-gray-700"
              >
                Nombre y Apellidos *
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                className="mt-3 block w-full border border-gray-200 rounded-md shadow-sm sm:text-lg"
                value={formData.firstname}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-base font-medium text-gray-700"
              >
                Nombre de Usuario *
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className={`mt-3 block w-full border ${
                  errorMessage ? "border-red-500" : "border-gray-200"
                } rounded-md shadow-sm sm:text-lg`}
                value={formData.username}
                onChange={handleChange}
                autoComplete="current-password"
              />
              {/* Muestra el mensaje de error si existe */}
              {errorMessage && (
                <p className="text-red-500 mt-2">{errorMessage}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-gray-700"
              >
                Correo *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-3 block w-full border border-gray-200 rounded-md shadow-sm sm:text-lg"
                value={formData.email}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-base font-medium text-gray-700"
              >
                Contraseña *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="mt-3 block w-full border border-gray-200 rounded-md shadow-sm sm:text-lg"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <div
                className={`h-2 mt-2 rounded ${
                  passwordStrength === 0
                    ? "bg-red-500"
                    : passwordStrength === 1
                    ? "bg-yellow-500"
                    : passwordStrength === 2
                    ? "bg-orange-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${(passwordStrength / 3) * 100}%` }}
              ></div>
              <div className="text-sm text-gray-500 mt-1">
                {passwordStrength === 0 &&
                  "La contraseña debe tener al menos 6 caracteres, una mayúscula y un número."}
                {passwordStrength === 1 &&
                  "La contraseña debe tener al menos una mayúscula y un número."}
                {passwordStrength === 2 &&
                  (formData.password.length < 6
                    ? "La contraseña debe tener al menos 6 caracteres."
                    : "La contraseña debe tener al menos una mayúscula.")}
              </div>
            </div>
            <button
              type="submit"
              className={`w-full ${
                loading ? "bg-gray-400" : "bg-pink-400 hover:bg-pink-300"
              } text-white py-2 px-4 rounded-md hover:bg-${
                loading ? "gray" : "pink"
              }-500`}
              disabled={loading}
            >
              {loading ? "Cargando..." : "Registrarse"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
