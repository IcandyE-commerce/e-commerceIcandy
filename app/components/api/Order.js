import { ENV } from "../../utils";
import { AuthFetch } from "../../utils";

export class Order {
  async getAll(userId) {
    try {
      const filters = `filters[user][id][$eq]=${userId}`;
      const sort = "sort[0]=createdAt:desc";
      const urlParams = `${filters}&${sort}`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINT.ORDER}?${urlParams}`;
      console.log(url)

      const response = await AuthFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}