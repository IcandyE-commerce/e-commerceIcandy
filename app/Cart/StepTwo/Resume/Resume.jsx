'use client';
import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from 'next/navigation';
import { forEach, map } from "lodash";
import { Cart } from "../../../components/api/Cart";
import { useCart } from "../../../hooks/useCart";
import { useAuth } from "../../../hooks/useAuth";
import { calcDiscountedPrice } from "../../../utils/functions/calcDiscountedPrice";
import styles from "./Resume.module.scss";

const cartCtrl = new Cart();

export function Resume(props) {
  const { games, addressSelected } = props;
  const [total, setTotal] = useState(null);
  const [shippingCost, setShippingCost] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { deleteAllItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    let totalTemp = 0;

    forEach(games, (game) => {
      const price = calcDiscountedPrice(
        game.attributes.price,
        game.attributes.discount
      );
      totalTemp += price * game.quantity;
    });

    setTotal(totalTemp.toFixed(2));
  }, [games]);

  // Función para calcular el costo de envío estimado
  const calculateShippingCost = () => {
    if (!addressSelected) return;

    let totalWeight = 0; // Peso total en kilogramos
    const weightPerProduct = 5; // Peso por producto en kilogramos (50 gramos)


    forEach(games, (game) => {
      console.log(game.quantity);

      totalWeight = game.quantity * weightPerProduct; // Sumamos el peso total de los productos

    });

    let shippingCost = 0;

    // Tarifa de envío basada en rangos de peso
    if (totalWeight <= 1) {
      shippingCost = 120; // Precio estimado para paquetes de hasta 1 kg
    } else if (totalWeight <= 5) {
      shippingCost = 150; // Precio estimado para paquetes de 1 a 5 kg
    } else if (totalWeight <= 10) {
      shippingCost = 200; // Precio estimado para paquetes de 5 a 10 kg
    } else {
      shippingCost = 300; // Precio estimado para paquetes mayores a 10 kg
    }

    setShippingCost(shippingCost); // Establecemos el costo de envío calculado
  };

  useEffect(() => {
    if (addressSelected) {
      calculateShippingCost(); // Calcula el costo de envío cuando se selecciona una dirección
    }
  }, [addressSelected, games]);

  const onPay = async () => {
    setLoading(true);

    if (!stripe || !elements) {
      console.error('Stripe no se ha cargado correctamente');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error('Error al crear el token:', error.message);
      setLoading(false);
      return;
    }

    console.log('Token generado correctamente:', token);

    try {
      
      const response = await cartCtrl.paymentCart(token, games, user.id, addressSelected);
      console.log(response);
      
      if (response.status === 200) {
        deleteAllItems();
        goToStepEnd();
      } else {
        console.error('Error al realizar el pedido');
      }
    } catch (error) {
      console.error('Error durante el pago:', error);
    } finally {
      setLoading(false);

      router.push('/Cart/Productos?step=3');
    }
  };

  const goToStepEnd = () => {
    router.replace({ query: { ...router.query, step: 3 } });
  };

  if (!total) return null;

  const finalTotal = (parseFloat(total) + (shippingCost ? parseFloat(shippingCost) : 0)).toFixed(2);

  return (
    <div className={styles.resume}>
      <h2>Resumen</h2>

      <div className={styles.block}>
        <div className={styles.products}>
          {map(games, (game) => (
            <div key={game.id} className={styles.product}>
              <div>
                <p>{game.attributes.title}</p>
              </div>
              <span>
                {game.quantity > 0 && `${game.quantity}x`}
                {calcDiscountedPrice(
                  game.attributes.price,
                  game.attributes.discount
                )}
                $
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.blockTotal}>
        <div>
          <span>Envío</span>
          <span>{shippingCost ? `${shippingCost} MXN` : 'Calculando...'}</span>
        </div>
        <div>
          <span>Total</span>
          <span>{finalTotal} MXN</span>
        </div>

        <Button
          primary
          fluid
          disabled={!addressSelected || loading}
          onClick={onPay}
          loading={loading}
        >
          Pagar
        </Button>
      </div>
    </div>
  );
}
