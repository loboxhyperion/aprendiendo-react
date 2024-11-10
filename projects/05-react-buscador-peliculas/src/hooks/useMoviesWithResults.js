import responseMovies from "../mocks/with-results.json";
// import noResults from "../mocks/no-results.json";

export function useMovies() {
  const movies = responseMovies.Search;
  // mapiamos los datos de la movies
  //  esto no debería ir en el componente
  // porque si cambiamos la app seria mas complejo cambiarlo luego

  //?. es encadenamiento opcional que
  //solo se apluca la funcion que se quiera ejecutar
  //si lo que hay en movies es diferente de null o undefined
  const mappedMovies = movies?.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster,
  }));

  return { movies: mappedMovies };
}
