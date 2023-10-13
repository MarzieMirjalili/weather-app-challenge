import { useState } from "react";
import { Weather } from "./Weather";
import type { FC } from "react";
import "./app.css";

export const App: FC = () => {
  const [cityInputValue, setCityInputValue] = useState("");
  const [city, setCity] = useState("");
  return (
    <>
      <input
        role="search"
        type="text"
        value={cityInputValue}
        onChange={(event) => setCityInputValue(event.target.value)}
      />
      <button onClick={() => setCity(cityInputValue)}>Show Weather</button>
      <Weather city={city} />
    </>
  );
};
