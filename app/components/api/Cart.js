// import {size} from "loadsh"
import {ENV} from "../../utils/constansts"
import {AuthFetch, } from "../../utils/AuthFetch"
import {forEach} from "lodash"

export class Cart {
    async addCart(productId) {
        const products = this.getAll();
        const objIndex = products.findIndex((product) => product.id === productId)
        if (objIndex < 0) { products.push({ id: productId, quantity: 1 }) //EL PRODUCTO NO EXISTE EN EL CARRITO
        } else{ //EL PRODUCTO YA EXISTE EN EL CARRITO INCREMENTAR CANTIDAD
            const product = products[objIndex]
            products[objIndex].quantity = product.quantity + 1;
    }
       
        localStorage.setItem(ENV.CART, JSON.stringify(products));
    }
    getAll(){
        const response = localStorage.getItem(ENV.CART);

        if (!response) {
            return [];

        }else{
            return JSON.parse(response)
        }
    }

    count(){
        const response = this.getAll();
        let count = 0; 
        forEach(response, (item) => {
            count += item.quantity;
        });
        return count;
    }

    changeQuantity(productId, quantity) {
        const prodcuts = this.getAll();
        const objIndex = prodcuts.findIndex((product) => product.id === productId);
        prodcuts[objIndex].quantity = quantity;
    
        localStorage.setItem(ENV.CART, JSON.stringify(prodcuts));
      }

      delete(productId) {
        const prodcuts = this.getAll();
        const updateGames = prodcuts.filter((product) => product.id !== productId);
    
        localStorage.setItem(ENV.CART, JSON.stringify(updateGames));
      }
    
      deleteAll() {
        localStorage.removeItem(ENV.CART);
      }

      async paymentCart(token, products, idUser, address) {
        try {
          console.log('token',token);
          const url = `${ENV.API_URL}/${ENV.ENDPOINT.PAYMENT_ORDER}`;
          const params = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
              products,
              idUser,
              addressShipping: address,
            }),
          };
    
          const response = await AuthFetch(url, params);
          console.log(response);
          return response;
        } catch (error) {
          throw error;
        }
      }
}

