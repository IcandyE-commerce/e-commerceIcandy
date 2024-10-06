import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import {Address as AddressApi } from "../../../../api/Address"
import { BasicModal } from "../../../../Shared/BasicModal/BasicModal";
import { Confirm } from "../../../../Shared/Confirm/Confirm";

import { AddressForm } from "../../AddressForm/AddressForm";
import styles from "./Address.module.scss";

const addressCtrl = new AddressApi ();

export function Address(props) {
  const { addressId, address, onReload } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const openCloseEdit = () => setShowEdit((prevState) => !prevState);
  const openCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
      await addressCtrl.delete(addressId);
      onReload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.address}>
        <div>
          <p className={styles.title}>{address.title}: </p>
          <p className={styles.addressInfo}>
            {address.name}, {address.address}, {address.state}, {address.city},{" "}
            {address.postal_code}
          </p>
        </div>

        <div className={styles.actions}>
          <Button color='green' icon onClick={openCloseEdit}>
            <Icon name="pencil"  style={{ color: 'white' }} />
          </Button>
          <Button color='red' icon onClick={openCloseConfirm}>
          <Icon name="delete" style={{ color: 'white' }} />
          </Button>
        </div>
      </div>

      <Confirm
        open={showConfirm}
        onCancel={openCloseConfirm}
        onConfirm={onDelete}
        content="¿Estas seguro de que quieres eliminar la dirección?"
      />

      <BasicModal
        show={showEdit}
        onClose={openCloseEdit}
        title="Editar dirección"
      >
        <AddressForm
          onClose={openCloseEdit}
          onReload={onReload}
          addressId={addressId}
          address={address}
        />
      </BasicModal>
    </>
  );
}