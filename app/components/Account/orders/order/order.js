'use client';
import { useState } from "react";
import { Image } from "semantic-ui-react";
import { DateTime } from "luxon";
import { forEach, map } from "lodash";
import { BasicModal } from "../../../Shared/BasicModal/BasicModal";
import { calcDiscountedPrice } from "../../../../utils/functions/calcDiscountedPrice";
import styles from "./order.module.scss";

export function Order(props) {
  const { order } = props;
  const [showModal, setShowModal] = useState(false);
  const createdAt = new Date(order.attributes.createdAt).toISOString();
  const products = order.attributes.products;
  const address = order.attributes.adressShipping;

  const openCloseModal = () => setShowModal((prevState) => !prevState);

  const getTotalProducts = () => {
    let total = 0;

    forEach(products, (product) => {
      total += product.quantity;
    });

    return total;
  };

  return (
    <>
      <div className={styles.order} onClick={openCloseModal}>
        <div>
          <span>
            {DateTime.fromISO(createdAt, { locale: "es" }).toFormat(
              "dd/MM/yyyy"
            )}
          </span>
          <p>{getTotalProducts()} productos</p>
        </div>

        <p>{order.attributes.totalPayment.toFixed(2)}MXN</p>
      </div>

      <BasicModal
        show={showModal}
        onClose={openCloseModal}
        title="Información del pedido"
      >
        {map(products, (product) => (
          <div className={styles.product}>
            <Image src={product.attributes.cover.data.attributes.url} />

            <div>
              <div className={styles.info}>
                <div>
                  <p>{product.attributes.title}</p>
                </div>
              </div>
              <div className={styles.quantity}>
                <span>x{product.quantity}</span>
                <span>
                  {calcDiscountedPrice(
                    product.attributes.price,
                    product.attributes.discount
                  )}
                  MXN
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className={styles.address}>
          <div>
            <p className={styles.title}>{address.attributes.title}</p>
            <p className={styles.addressInfo}>
              {address.attributes.name}, {address.attributes.address},{" "}
              {address.attributes.state}, {address.attributes.city},{" "}
              {address.attributes.postal_code}
            </p>
          </div>
        </div>

        <div className={styles.total}>
          <p>TOTAL: {order.attributes.totalPayment.toFixed(2)}MXN</p>
        </div>
      </BasicModal>
    </>
  );
}