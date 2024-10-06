import { useState, useEffect, createContext } from "react";
import { Cart } from "../components/api/Cart";


export const CartContext = createContext();
const cartCtrl = new Cart();

export function CartProvider(props) {
  
  const { children } = props;
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(cartCtrl.count());
  
  useEffect(() => {
     const response = cartCtrl.getAll();
     setCart(response);

   }, []);

  const addCart = (productId) => {
    cartCtrl.addCart(productId);
     refreshTotalCart();
  };

  const changeQuantityItem = (productId, quantity) => {
    cartCtrl.changeQuantity(productId, quantity);
    refreshTotalCart();
  };

  const deleteItem = (productId) => {
    cartCtrl.delete(productId);
    refreshTotalCart();
  };

  const deleteAllItems = () => {
    cartCtrl.deleteAll();
    refreshTotalCart();
  };

   const refreshTotalCart = () => {
     setTotal(cartCtrl.count());
     setCart(cartCtrl.getAll());
   };

  const data = {
    cart,
    addCart,
     total,
    deleteItem,
    deleteAllItems,
     changeQuantityItem,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}