"use client"
import { AuthProvider} from "../app/context/AuthContext";
import {CartProvider} from "../app/context/CartContext";

import "semantic-ui-css/semantic.min.css";
import "./css/global.css";
import { CategoriasProvider } from "./context/CategoriasContext";
import { MarcasProvider } from "./context/MarcasContext";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
      <CategoriasProvider>
      <MarcasProvider>
        <AuthProvider>
          <CartProvider>
          {children}
          </CartProvider>
          </AuthProvider>
        </MarcasProvider>
        </CategoriasProvider>
      </body>
    </html>
  );
}
