import React from "react";
import "../App.css";

export default function Temperature(props) {
  return (
    <div
      className="temperature"
      style={{
        backgroundColor:
          (props.initialValue < 0 && "blue") ||
          (props.initialValue > 0 && props.initialValue <= 15 && "green") ||
          (props.initialValue > 15 && props.initialValue < 30 && "yellow") ||
          (props.initialValue >= 30 && "red"),
        color: props.initialValue > 15 && props.initialValue < 30 && "black",
        transition: "background-color 0.5s ease",
      }}
    >
      <span>{props.initialValue}°C</span>
    </div>
  );
}
