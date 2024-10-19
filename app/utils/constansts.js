import { Productos } from "../components/api";

export const ENV = {
  SERVER_HOST:'https://icandye-commercestrapi-production.up.railway.app/',
  API_URL: 'https://icandye-commercestrapi-production.up.railway.app/api',
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
