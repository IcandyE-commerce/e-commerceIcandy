'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import { Productos } from "../../components/api/Productos";
import { useCart } from "../../hooks/useCart";
import StepOne from "../StepOne/StepOne";
import {StepTwo} from "../StepTwo/StepTwo";
import {StepThree} from "../StepThree/StepThree";

import CartLayout from '../../layout/CartLayout/CartLayout';

const gameCtrl = new Productos();

export default function Page() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [games, setGames] = useState(null);
  const { cart } = useCart();

  useEffect(() => {
    const step = searchParams.get('step') || '1';
    setCurrentStep(Number(step));
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      try {
        const data = [];
        for await (const item of cart) {
          const response = await gameCtrl.getProductById(item.id);
          data.push({ ...response.data, quantity: item.quantity });
        }
        setGames(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [cart]);


  return (
    <CartLayout>
      {currentStep === 1 && <StepOne games={games} />}
      {currentStep === 2 && <StepTwo games = {games} />}
      {currentStep === 3 && <StepThree/>}
    </CartLayout>
  );
}