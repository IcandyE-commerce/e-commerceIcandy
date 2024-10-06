// api/Address.js
import { AuthFetch } from "../../utils";
import { ENV } from "../../utils/constansts";

export class Address {
  async create(data, userId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINT.ADDRESS}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            ...data,
            user: userId,
          },
        }),
      };
      const response = await AuthFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAll(userID) {
    try {
      const filters = `filters[user][id][$eq]=${userID}`;
      const url = `${ENV.API_URL}/${ENV.ENDPOINT.ADDRESS}?${filters}`;
      const response = await AuthFetch(url);
      const result = await response.json();
      console.log(result);
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }
  async update(data, addressId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINT.ADDRESS}/${addressId}`;
      const params = {
        method: "PUT",
        headers:{
          "Content-Type":"application/json",
        },
        body : JSON.stringify({data}),
      };
      const response = await AuthFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async delete(addressId) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINT.ADDRESS}/${addressId}`;
      const params = {
        method: "DELETE",
      };
      const response = await AuthFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }
}





