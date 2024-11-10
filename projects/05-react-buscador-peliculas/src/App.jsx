import "./App.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { Movies } from "./components/Movies.jsx";
import { useMovies } from "./hooks/useMovies.js";
import debounce from "just-debounce-it";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true); //para validar si el usuario a usa por primera vez el input o no

  useEffect(() => {
    //  para saber si es la primera vez de algo
    if (isFirstInput.current) {
      isFirstInput.current = search == "";
      return;
    }
    if (search == "") {
      setError("No se puede buscar una película vacía");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una película con un número");
      return;
    }

    if (search.length < 3) {
      setError("La búsqueda debe tener al menos 3 caracteres");
      return;
    }
    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);

  const { search, updateSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ search, sort });
  const debounceGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 500),
    []
  );

  const handleSubmit = (event) => {
    // evitar que se ejecute el submit
    event.preventDefault();
    getMovies({ search });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    // const newQuery = event.target.value;
    // // evitar espacio vacio
    // if (newQuery.startWith(" ")) return;
    // cada que vez que cambia el input
    // se actualiza el estado del valor
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debounceGetMovies(newSearch);
    // validaciones
    // todas las validaciones serian recomendables hacerlas mejor aqui
    // pero por el curso se hacen en el useEffect
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
            onChange={handleChange}
            value={search}
            name="query"
            type="text"
            placeholder="Wolverine, John Wick, It..."
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
