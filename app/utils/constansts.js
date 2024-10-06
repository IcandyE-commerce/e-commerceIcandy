import { Productos } from "../components/api";

export const ENV = {
  SERVER_HOST:'http://localhost:1337',
  API_URL: 'http://localhost:1337/api',
  ENDPOINT: {
      AUTH: {
          REGISTER: "auth/local/register",
          LOGIN: "auth/local",

      },
      USERS_ME: "users/me",
      USERS: "users",
      Productos:"productos",
      ADDRESS:"adresses",
      categorias:"categorias",
      marcas:"marcas",
      PAYMENT_ORDER:"payment-order",
      ORDER: "orders"

  },
  TOKEN:"token",
  CART:"cart",
  STRIPE_TOKEN:
    "pk_test_51P6kxa2NqddGkUxvn9x4JYX9uiAubxP5FjyZdB11UPkw7YIjJz5GWJBj3foDvqyKATdwoGMaiD5xhEZdrlLbcHuz00miVbSiOm"
};
