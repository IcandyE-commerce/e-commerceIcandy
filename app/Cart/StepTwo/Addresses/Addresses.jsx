import { useState, useEffect } from "react";
import { map } from "lodash";
import classNames from "classnames";
import { Address } from "../../../components/api/Address";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./Address.module.scss";

const addressCtrl = new Address();

export function Addresses(props) {
  const { addressSelected, setAddressSelected } = props;
  const [addresses, setAddresses] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await addressCtrl.getAll(user.id);
        setAddresses(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className={styles.addresses}>
      <h2>Dirección</h2>

      {map(addresses, (address) => {
        // Si hay una dirección seleccionada, mostrar solo esa dirección
        if (addressSelected && address.id !== addressSelected.id) {
          return null;
        }

        return (
          <div
            key={address.id}
            onClick={() => setAddressSelected(address)}
            className={classNames(styles.address, {
              [styles.active]: address.id === addressSelected?.id,
            })}
          >
            <p>
            {address.attributes.title}
            </p>
            <p>
              {address.attributes.address}, {address.attributes.postal_code},{" "}
              {address.attributes.state}, {address.attributes.city}
            </p>
          </div>
        );
      })}
    </div>
  );
}
