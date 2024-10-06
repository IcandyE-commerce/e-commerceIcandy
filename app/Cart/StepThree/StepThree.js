import { Button, Icon } from "semantic-ui-react";
import Link from "next/link";
import styles from "./StepThree.module.scss";

export function StepThree() {
  return (
    <div className={styles.stepThree}>
      {/* Contenedor del icono */}
      <div className={styles.iconContainer}>
        <Icon name="check circle" className={styles.icon} />
      </div>

      <h2>¡Compra exitosa!</h2>

      <p className={styles.message}>
        ¡Muchas gracias por tu compra! Valoramos tu confianza en nosotros. 
        Nuestro equipo está trabajando arduamente para entregarte tu pedido lo más pronto posible.
        Si tienes alguna pregunta o inquietud, no dudes en contactarnos.
      </p>

      <Link href="/MiCuenta/Cuenta">
      <button
        className={`${styles.button} bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl`}
      >
        Ver pedido
      </button>
      </Link>

    </div>
  );
}
