import { useState } from "react";

export default function StateComponent() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const stepHandler = (indicator) => {
    if (indicator === "prev") {
      setStep((step) => step - 1);
    } else {
      setStep((step) => step + 1);
    }
  };

  const countHandler = (indicator) => {
    if (indicator === "prev") {
      setCount((count) => (count = count - step));
    } else {
      setCount((count) => (count = count + step));
    }
  };

  return (
    <>
      <Steps step={step} stepHandler={stepHandler} />
      <Counter count={count} countHandler={countHandler} />
    </>
  );
}

function Steps({ step, stepHandler }) {
  return (
    <div>
      <button onClick={() => stepHandler("prev")}>-</button>
      <span>Step: {step}</span>
      <button onClick={() => stepHandler("next")}>+</button>
    </div>
  );
}

function Counter({ count, countHandler }) {
  return (
    <>
      <div>
        <button onClick={() => countHandler("prev")}>-</button>
        <span>Count: {count}</span>
        <button onClick={() => countHandler("next")}>+</button>
      </div>
      <Content count={count} />
    </>
  );
}

function Content({ count }) {
  const time = new Date();
  time.setDate(time.getDate() + count);

  return (
    <div>
      {count === 0 ? (
        <span>Today is {time.toDateString()}</span>
      ) : count > 0 ? (
        <span>
          {count} days from today is {time.toDateString()}
        </span>
      ) : (
        <span>
          {-count} days ago was {time.toDateString()}
        </span>
      )}
    </div>
  );
}
