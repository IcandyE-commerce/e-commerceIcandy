'use client'
import React from 'react';
import { Container } from "semantic-ui-react";
import { Separator } from "../../components/Shared/Separator/Separator";
import HeaderCart from "../../HeaderCart/page.jsx";

export default function CartLayout({ children }) {
  return (
    <>
      <HeaderCart />
      <Separator height={150} />
      <Container>{children}</Container>
      <Separator height={70} />
    </>
  );
}