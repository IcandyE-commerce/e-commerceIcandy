"use client";

import { useAuth } from "../../hooks/useAuth";
import Info from "../../components/Account/Info/Info";
import { Tab } from "semantic-ui-react";
import "../../css/Panel.css";
import ChangeNameForm from "../../components/Account/Settings/ChangeNameForm";
import { Separator } from "../../components/Shared/Separator/Separator";
import { AddAddress } from "../../components/Account/Address/AddAddress/AddAddress";
import  {Orders}   from "../../components/Account/orders/Orders";

import {ListAddresses} from "../../components/Account/Address/ListAddresses/ListAddresses"
import { useState } from "react";

const Page = () => {
  const { user } = useAuth();
  const [reload, setReload] = useState(false);
  
  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: { icon: "truck", content: "Mis Pedidos" },
      render: () => (
        <Tab.Pane attached={false}>
            <Orders />
         </Tab.Pane>
      ),
    },
    {
      menuItem: { icon: "heart", content: "Lista de deseos" },
      render: () => (
        <Tab.Pane attached={false}>
          <p>Mi Lista de deseos...</p>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { icon: "location arrow", content: "Direcciones" },
      render: () => (
        <Tab.Pane attached={false}>
          <AddAddress onReload = {onReload}/>
          <ListAddresses reload = {reload} onReload ={onReload}/>
          <Separator height={80} />
        </Tab.Pane>
      ),
      location,
    },
    {
      menuItem: { icon: "settings", content: "Ajustes" },
      render: () => (
        <Tab.Pane attached={false}>
          <Separator height={10} />

          <ChangeNameForm />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <Info />
      <div className="overflow-x-auto">
        <Tab
          menu={{
            secondary: true,
            pointing: true,
            className: "flex flex-wrap",
          }}
          panes={panes}
        />
      </div>
    </div>
  );
};

export default Page;
