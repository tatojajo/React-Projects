import { useState } from "react";
import "./App.css";
import Temperature from "./temp-components/Temperatire";
import Snow from "./img/snowflake.png";
import Summer from "./img/vacations.png";

function App() {
  const [countTemp, setCountTemp] = useState(0);

  const incrementTemperature = () => setCountTemp((prev) => prev + 1);

  const decrementTemperature = () => setCountTemp((prev) => prev - 1);

  const resetTemperatureValue = () => setCountTemp(0);

  const winterModeActive = () => setCountTemp(27);

  const summerModeActive = () => setCountTemp(15);

  // Fahrenheit && Celcius
  return (
    <div className="App">
      <div className="card">
        <div className="temperature-mode">
          <button
            className="winter-mode"
            onClick={winterModeActive}
            style={{ backgroundColor: "blue" }}
          >
            Winter
            <img src={Snow} alt="SnowFlake" style={{ width: "16px" }} />
          </button>
          <button
            className="summer-mode"
            onClick={summerModeActive}
            style={{ backgroundColor: "#422b03" }}
          >
            Summer
            <img src={Summer} alt="Summer" style={{ width: "16px" }} />
          </button>
        </div>

        <Temperature initialValue={countTemp} />

        <div className="control-container">
          <button className="controller plus" onClick={incrementTemperature}>
            +
          </button>
          <button className="reset" onClick={resetTemperatureValue}>
            Reset
          </button>
          <button className="controller minus" onClick={decrementTemperature}>
            -
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
