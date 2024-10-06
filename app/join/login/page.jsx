import styles from "./login.module.css";
import LoginForm from "../../components/Auth/LoginForm/LoginForm";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <h2 className="flex items-center justify-center text-2xl lg:text-4xl font-bold text-transform: uppercase mb-6">
        Iniciar Sesion
      </h2>
      <LoginForm />
      <div className=" text-center mt-3">
        <Link href="/">Volver a la Tienda</Link>
      </div>
    </div>
  );
}
