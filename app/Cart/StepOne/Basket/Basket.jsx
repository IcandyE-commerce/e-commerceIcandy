'use client'
import React from 'react';
import { Icon, Image, Dropdown } from "semantic-ui-react";
import { map } from "lodash";
import { useCart } from "../../../hooks/useCart";
import styles from "./Basket.module.scss";

export function Basket(props) {
  const { games } = props;
  const { changeQuantityItem, deleteItem } = useCart();
    console.log(games);
  const options = Array.from({ length: 50 }, (_, index) => {
    const number = index + 1;
    return { key: number, text: String(number), value: number };
  });

  // Función auxiliar para calcular el precio con descuento
  const calcDiscountedPrice = (price, discount) => {
    if (discount === undefined || discount === null) return price;
    return price - (price * discount) / 100;
  };

  return (
    <div className={styles.basket}>
      <h2 className={styles.title}>Carrito</h2>

      <div className={styles.block}>
        {map(games, (game) => (
          <div key={game.id} className={styles.product}>
            <Image className={styles.image} src={game.attributes?.cover?.data?.attributes?.url || '/placeholder-image.jpg'} />
            <div className={styles.details}>
              <div className={styles.info}>
                <div>
                  <p className={styles.productTitle}>{game.attributes?.title || 'Título no disponible'}</p>
                </div>

                <Icon
                  name="trash alternate"
                  link
                  onClick={() => deleteItem(game.id)}
                  className={styles.deleteIcon}
                />
              </div>

              <div className={styles.quantity}>
                <Dropdown
                  className={styles.number}
                  options={options}
                  selection
                  value={game.quantity || 1}
                  compact
                  onChange={(_, data) =>
                    changeQuantityItem(game.id, data.value)
                  }
                />
                <span className={styles.price}>
                  {calcDiscountedPrice(
                    game.attributes?.price || 0,
                    game.attributes?.discount
                  ).toFixed(2)}
                  $
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
