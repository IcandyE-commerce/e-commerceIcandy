import * as Yup from "Yup"

export function initialValues(firstname, lastname){
    return{
        firstname,
        lastname,
    }
  }


  export function validateSchema() {
    return new Yup.ObjectSchema({
        firstname: Yup.string().required(true),
        lastname: Yup.string().required(true),

    });
  }