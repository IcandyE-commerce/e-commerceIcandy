'use client'
import React from 'react';
import { Basket } from "./Basket/Basket";
import { Resume } from "./Resume/Resume";
import styles from "./StepOne.module.scss";

export default function StepOne({ games }) {
  return (
    <div className={styles.stepOne}>
      {games ? (
        <>
          <Basket games={games} />
          <Resume games={games} />
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}