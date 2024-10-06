import { ENV } from "../../utils";

export class Productos {
  async getFavorites() {
    try {
      // Construye la URL utilizando URL y URLSearchParams para una mayor claridad
      const url = new URL(`${ENV.API_URL}/${ENV.ENDPOINT.Productos}`);
      const params = new URLSearchParams({
        "filters[Popular][$eq][0]": true,
        populate: "cover",
      });
      url.search = params.toString();

      // Realiza la solicitud
      const response = await fetch(url.toString());

      // Verifica si la respuesta es exitosa
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Error ${response.status}: ${error.message}`);
      }

      // Convierte la respuesta a JSON
      const result = await response.json();

      return result;
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
      throw error;
    }
  }

  async getBySlug(slug) {
    try {
      const filter = `filters[slug][$eq]=${slug}`;
      const populate =
        "populate[0]=wallpaper&populate[1]=cover&populate[2]=screenshots"; // Actualizar para incluir el wallpaper
      const url = `${ENV.API_URL}/${ENV.ENDPOINT.Productos}?${filter}&${populate}`;
      const response = await fetch(url);
      const result = await response.json();
      console.log(url);
      if (response.status !== 200) throw result;
      return result.data[0];
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const populate = `populate[0]=cover&populate[1]=product`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINT.Productos}/${id}?${populate}`;
      const response = await fetch(url);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }
}
