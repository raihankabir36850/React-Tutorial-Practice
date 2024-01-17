import { useState } from "react";
import "./index.css";

const data = {
  1: {
    name: "Learn React First",
    level: 1,
  },
  2: {
    name: "Get A Job",
    level: 2,
  },
  3: {
    name: "Then Income",
    level: 3,
  },
};

function App() {
  const [entry, setEntry] = useState(1);
  const buttonHandler = (state) => {
    if (state === "next") {
      setEntry((prev) => {
        if (prev < Object.keys(data).length) {
          prev = prev + 1;
        }
        return prev;
      });
    } else {
      setEntry((prev) => {
        if (prev > 1) {
          prev = prev - 1;
        }
        return prev;
      });
    }
  };
  return (
    <div className="App">
      <BulletPoint active={data[entry]} />
      <Skill step={data[entry]} />
      <ButtonContainer buttonHandler={buttonHandler} />
    </div>
  );
}

function BulletPoint({ active }) {
  const numbers = Object.keys(data);
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {numbers.map((number, index) => (
        <span
          style={{ width: "20px", height: "20px" }}
          className={`${active.level >= parseInt(number) ? "active" : ""}`}
          key={index}
        >
          {number}
        </span>
      ))}
    </div>
  );
}

const Skill = ({ step }) => {
  return (
    <p style={{ display: "flex", justifyContent: "center" }}>{step.name}</p>
  );
};

function ButtonContainer({ buttonHandler }) {
  return (
    <div
      className="btn-container"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <span onClick={() => buttonHandler("previous")}>Previous</span>
      <span onClick={() => buttonHandler("next")}>Next</span>
    </div>
  );
}

export default App;
