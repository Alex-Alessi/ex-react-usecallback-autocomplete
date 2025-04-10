import { useState, useEffect, useCallback } from "react";
import "./App.css";

function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const fetchexecute = useCallback(
    debounce((query) => {
      console.log("🔄 Fetch chiamato per:", query);
      fetch(
        `https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setResults(data);
          } else {
            setResults([]);
          }
        })
        .catch((error) => console.error(error));
    }, 2000),
    []
  );

  useEffect(() => {
    if (query.length !== 0) {
      fetchexecute(query);
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
