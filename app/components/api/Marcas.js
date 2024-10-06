import { ENV } from "../../utils";

export class MarcaaApi {
  async getBySlug(marcaSlug) {
    try {
      const filter = `filters[marca][slug][$eq]=${marcaSlug}&populate=*`;
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
