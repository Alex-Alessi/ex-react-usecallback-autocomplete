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

  return (
    <div className="container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cerca un prodotto..."
        className="searchbar"
      ></input>
      {query.length > 0 && (
        <div className="dropdown">
          {results.map((result) => (
            <p key={result.id}>{result.name}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
