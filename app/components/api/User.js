import { AuthFetch } from "../../utils";
import { ENV } from "../../utils/constansts";

export class User {
  async getMe() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINT.USERS_ME}`;

      const response = await AuthFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateMe(userID, data){
    try{
      const url = `${ENV.API_URL}/${ENV.ENDPOINT.USERS}/${userID}`
      const params ={
        method:"PUT",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      };
      const response = await AuthFetch(url,params);
      const result = await response.json();
      if (response.status !== 200) throw result;

    }catch(error){
     throw error; 
    }
  }
}
