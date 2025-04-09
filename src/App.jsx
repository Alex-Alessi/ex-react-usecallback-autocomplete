import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length !== 0) {
      fetch(
        `https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`
      )
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch((error) => console.error(error));
    } else {
      setResults([]);
    }
  }, [query]);

  console.log(results);

  const Card = ({ image, name, description }) => {
    return (
      <div className="card">
        <img src={image}></img>
        <p>
          <b>Name:</b> {name}
        </p>
        <b>Description:</b> {description}
      </div>
    );
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      {query.length > 0 && (
        <div className="tendina">
          <h1>Suggerimenti</h1>
          <div className="results-style">
            {results.map((result) => (
              <Card key={result.id} {...result} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
