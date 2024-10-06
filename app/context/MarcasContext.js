import { ENV } from "../utils";
import { useState, useEffect, createContext } from "react";

export const MarcasContext = createContext();

export function MarcasProvider({ children }) {
    const [marcas, setMarcas] = useState(null);
    const [errorMarcas, setErrorMarcas] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const url = new URL(`${ENV.API_URL}/${ENV.ENDPOINT.marcas}`);
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
                setMarcas(data);
            } catch (error) {
                setErrorMarcas(error.message);
            }
        })();
    }, []);

    return (
        <MarcasContext.Provider value={{ marcas, errorMarcas }}>
            {children}
        </MarcasContext.Provider>
    );
}
