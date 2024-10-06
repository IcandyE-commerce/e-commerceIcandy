import Link from "next/link";
import styles from "./register.module.css";
import { RegisterForm } from "../../components/Auth/RegisterForm/RegisterForm";

const signin = () => {
  return (
    <>
      <div >
        <h2 className="flex items-center justify-center text-2xl lg:text-4xl font-bold text-transform: uppercase mb-6">Crea una cuenta</h2>
        <RegisterForm/>
        <div className={styles.actions}>
          <Link href="/">Volver a la Tienda</Link>
        </div>

      </div>
    </>
  );
};

export default signin;
