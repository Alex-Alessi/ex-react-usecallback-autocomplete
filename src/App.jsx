import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const fetchRequest = (query) => {
    fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`
    )
      .then((res) => res.json())
      .then((data) => d);
  };
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <div className="results-container">
        <h1>Suggerimenti</h1>
      </div>
    </div>
  );
}

export default App;
