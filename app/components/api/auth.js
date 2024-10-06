import { ENV } from "../../utils/constansts";

export class Auth {

  async register(data) {
      const url = `${ENV.API_URL}/${ENV.ENDPOINT.AUTH.REGISTER}`;
      const params = {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
  }

  async Login(data) {
      const url = `${ENV.API_URL}/${ENV.ENDPOINT.AUTH.LOGIN}`;
      const params = {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
   
  }
}
