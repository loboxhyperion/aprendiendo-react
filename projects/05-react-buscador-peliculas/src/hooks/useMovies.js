import { searchMovies } from "../services/movies";
import { useState, useRef, useMemo, useCallback } from "react";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    // evitar que se repita la busquedas dos veces seguidas
    if (search == previousSearch.current) return;
    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      // el finally es lo que hace despues de que se ejecuta el try o el catch
      setLoading(false);
    }
  }, []);
  //  hacemos una copia de movies y organizamos por titulo comparando por acentos
  // usamos useMemo para que haga solo el calculo de ordenar solo cuando
  // las dependencias sort movies cambien nada mas asi search lo otros estados cambien
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, loading, getMovies };
}
