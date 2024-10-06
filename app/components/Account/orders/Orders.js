'use client'
import { useState, useEffect } from "react";
import { map } from "lodash";
import { Order as OrderCtrl } from "../../api/Order.js";
import { useAuth } from "../../../hooks/useAuth.js";
import  {NoResult}  from "../../Shared/NoResult/NoResult.js";
import { Order } from "./order/order.js";

const orderCtrl = new OrderCtrl();

export function Orders() {
  const [orders, setOrders] = useState(null);
  const { user } = useAuth();
  console.log();
  
  useEffect(() => {
    (async () => {
      try {
        console.log("usuariosssss",user.id);
        
        const response = await orderCtrl.getAll(user.id);
        console.log("respuesta",response);
        
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!orders) return <NoResult text="No tienes ningun producto comprado" />;

  return (
    <div>
      {map(orders, (order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
}