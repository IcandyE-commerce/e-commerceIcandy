import * as Yup from "yup";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import { useAuth } from "../../../hooks/useAuth";
import {User} from "../../api/User"

export function initialValues(firstname, lastname) {
  return { firstname, lastname };
}

const userCtrl = new User();

export function validateSchema() {
  return new Yup.ObjectSchema({
    firstname: Yup.string().required(true),
    lastname: Yup.string().required(true),
  });
}

export default function ChangeNameForm() {
  const { user } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(user.firstname, user.lastname),
    validateSchema: validateSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
         await userCtrl.updateMe(user.id, formValue);

        console.log(formValue);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <label>Nombre</label>
        <div className="algo">
          <Form.Input
            name="firstname"
            placeholder="Nombre"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            error={formik.errors.firstname}
          />
          <label>Apellido</label>
          <Form.Input
            name="lastname"
            placeholder="Apellido"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={formik.errors.lastname}
          />
          <Button
            type="submit"
            loading={formik.isSubmitting}
            fluid
            color="pink"
            style={{ marginTop: "1rem" }}
          >
            Guardar Cambios
          </Button>
        </div>
      </Form>
    </div>
  );
}
