import { ENV } from "../utils";
import { useState, useEffect, createContext } from "react";

export const CategoriasContext = createContext();

export function CategoriasProvider({ children }) {
    const [categorias, setCategorias] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const url = new URL(`${ENV.API_URL}/${ENV.ENDPOINT.categorias}`);
                const params = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const response = await fetch(url, params);
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(`Error ${response.status}: ${error.message}`);
                }
                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                setError(error.message);
            }
        })();
    }, []);

    return (
        <CategoriasContext.Provider value={{ categorias, error }}>
            {children}
        </CategoriasContext.Provider>
    );
}
