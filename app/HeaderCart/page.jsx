'use client';
import { useEffect, useState } from "react";
import { Icon, Image } from "semantic-ui-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; // Use useSearchParams to get query parameters
import { map } from "lodash";
import classNames from "classnames";
import styles from "./HeaderCart.module.scss";

export default function HeaderCart() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const step = searchParams.get('step') || 1;
    setCurrentStep(Number(step));
  }, [searchParams]);

  console.log(currentStep);

  const steps = [
    { number: 1, title: "Carrito" },
    { number: 2, title: "Pago" },
    { number: 3, title: "Confirmación" },
  ];

  return (
    <div className={styles.headerCart}>
      { <div className={styles.left}>
        {/* <Link href="/">
          <Image src="/images/logo.png" alt="Gaming" />
        </Link> */}
      </div> }

      <div className={styles.center}>
        {map(steps, (step) => (
          <div
            key={step.number}
            className={classNames({
              [styles.active]: step.number === currentStep,
              [styles.success]: step.number < currentStep,
            })}
          >
            <span className={styles.number}>
              <Icon name="check" />
              {step.number}
            </span>
            <span>{step.title}</span>``
            <span className={styles.space} />
          </div>
        ))}
      </div>

      <div className={styles.right}>
        <Icon name="lock" />
        <div>
          <span>Pago seguro</span>
          <span>256-bit SSL Secure</span>
        </div>
      </div>
    </div>
  );
}
