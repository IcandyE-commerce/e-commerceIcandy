'use client'
import { useState, useEffect } from "react";
import { map } from "lodash";
import {Address as AddressCtrl} from "../../../api/Address"
import {useAuth} from "../../../../hooks/useAuth";
import {Address} from "../../Address/ListAddresses/Address/Address"

const addressCtrl = new AddressCtrl();

export function ListAddresses(props) {
  const { reload, onReload} = props;
  
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
  }, [reload]);

  if (!addresses) return null;

  return (
    <div >
      {map(addresses, (address) => (
        <Address
          key={address.id}
          addressId={address.id}
          address={address.attributes}
          onReload={onReload}
        />
      ))}
    </div>
  );
}