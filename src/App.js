import React, { useState } from "react";
import { evaluate } from "mathjs";

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

      if (input === "0/0") {
        setResult("NaN");
      } else {
        const output = evaluate(input);
        setResult(output.toString());
      }
    } catch {
      setResult("Error");
    }
  };

  const buttons = [
    "7", "8", "9", "+",
    "4", "5", "6", "-",
    "1", "2", "3", "*",
    "C", "0", "=", "/"
  ];

  // Style objects
  const styles = {
    calculator: {
      textAlign: "center",
      marginTop: "30px",
      fontFamily: "Arial, sans-serif",
    },
    input: {
      width: "200px",
      height: "40px",
      fontSize: "20px",
      textAlign: "right",
      marginBottom: "20px",
    },
    buttonGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 60px)",
      gap: "10px",
      justifyContent: "center",
      margin: "0 auto",
    },
    button: {
      height: "50px",
      fontSize: "20px",
      cursor: "pointer",
    },
    result: {
      marginTop: "20px",
      fontSize: "24px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.calculator}>
      <h1>React Calculator</h1>
      <input type="text" value={input} readOnly style={styles.input} />
      <div style={styles.buttonGrid}>
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            style={styles.button}
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
      <div style={styles.result}>{result}</div>
    </div>
  );
}

export default Calculator;
