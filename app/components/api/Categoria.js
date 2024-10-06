import { ENV } from "../../utils";

export class CategoriaApi {
  async getBySlug(categoriaSlug) {
    try {
      // Filtro para obtener los productos por el slug de la categoría
      const filter = `filters[categoria][slug][$eq]=${categoriaSlug}&populate=*`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINT.Productos}?${filter}`;
      
      const response = await fetch(url);
      console.log(url);

      const result = await response.json();
      console.log(result);

      if (response.status !== 200) throw result;
      return result.data;
    } catch (error) {
      throw error;
    }
  }
}
