import { useState, useEffect } from "react";
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

  const fetchexecute = debounce((query) => {
    fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`
    )
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((error) => console.error(error));
  }, 300);

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

// Milestone 2: Implementare il Debounce per Ottimizzare la Ricerca
// Attualmente, ogni pressione di tasto esegue una richiesta API. Questo è inefficiente!
// Implementa una funzione di debounce per ritardare la chiamata API fino a quando l’utente
// smette di digitare per un breve periodo (es. 300ms)
// Dopo l’implementazione, verifica che la ricerca non venga eseguita immediatamente a ogni
// tasto premuto, ma solo dopo una breve pausa.

// Obiettivo: Ridurre il numero di richieste API e migliorare le prestazioni.
