import React, { useState } from "react";
import { evaluate } from "mathjs";
import "./Calculator.css";

function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const handleEqual = () => {
    try {
      if (input.trim() === "") {
        setResult("Error");
        return;
      }

      const output = evaluate(input);

      // Custom 0/0 check
      if (input === "0/0") {
        setResult("NaN");
      } else {
        setResult(output.toString());
      }
    } catch (err) {
      setResult("Error");
    }
  };

  const buttons = [
    "7", "8", "9", "+",
    "4", "5", "6", "-",
    "1", "2", "3", "*",
    "C", "0", "=", "/"
  ];

  return (
    <div className="calculator">
      <h1>React Calculator</h1>
      <input type="text" value={input} readOnly />
      <div className="button-grid">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={() =>
              btn === "=" ? handleEqual() :
              btn === "C" ? handleClear() :
              handleClick(btn)
            }
          >
            {btn}
          </button>
        ))}
      </div>
      <div className="result">{result}</div>
    </div>
  );
}

export default Calculator;
