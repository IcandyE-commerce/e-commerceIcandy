'use client'

import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { forEach } from "lodash";
import styles from "./Resume.module.scss";

// Función para calcular el precio con descuento
const calcDiscountedPrice = (price, discount) => {
  if (!discount) return price;
  const discountedPrice = price - (price * discount) / 100;
  return Number(discountedPrice.toFixed(2));
};

export function Resume(props) {
  const { games } = props;
  const router = useRouter();
  const [totals, setTotals] = useState(null);

  useEffect(() => {
    let totals = {
      original: 0,
      discount: 0,
      price: 0,
    };

    forEach(games, (game) => {
      const price = calcDiscountedPrice(
        game.attributes.price,
        game.attributes.discount
      );

      totals = {
        original: totals.original + game.attributes.price * game.quantity,
        discount:
          totals.discount + (game.attributes.price - price) * game.quantity,
        price: totals.price + price * game.quantity,
      };
    });

    setTotals(totals);
  }, [games]);

  const goToStepTwo = () => {
    router.push(`/Cart/Productos?step=2`);
  };

  if (!totals) return null;

  return (
    <div className={styles.resume}>
      <h2>Resumen</h2>

      <div className={styles.block}>
        <div className={styles.prices}>
          <div>
            <span>Precio oficial</span>
            <span>{totals.original.toFixed(2)}$</span>
          </div>
          <div>
            <span>Descuento</span>
            <span>{totals.discount.toFixed(2)}$</span>
          </div>
          <div>
            <span>Subtotal</span>
            <span>{totals.price.toFixed(2)} MXN</span>
          </div>
        </div>

        <Button primary fluid onClick={goToStepTwo}>
          Proceder con el pago
        </Button>

        <Link href="/">Continuar comprando</Link>
      </div>
    </div>
  );
}