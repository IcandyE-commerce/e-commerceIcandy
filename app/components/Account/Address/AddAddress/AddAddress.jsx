import { useState } from "react";
import { Button } from "semantic-ui-react";
import styles from "../../../../css/AddAddress.module.css";
import { BasicModal } from "../../../Shared/BasicModal/BasicModal";
import {AddressForm} from "../AddressForm/AddressForm"

export function AddAddress(props) {
  const { onReload } = props;
  const [show, setShow] = useState(false);

  const onOpenClose = () => setShow((prevState) => !prevState);

  return (
    <>
      <Button color='pink'  onClick={onOpenClose}>
        Crear
      </Button>

      <BasicModal show={show} onClose={onOpenClose} title="Nueva dirección">
        <AddressForm onClose={onOpenClose} onReload={onReload} />
      </BasicModal>
    </>
  );
}