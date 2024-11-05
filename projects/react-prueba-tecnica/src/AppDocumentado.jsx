import { useEffect, useState } from "react";
import "./App.css";
import { getRandomFact } from "./services/facts";
// import { getImageFact } from "./services/imgFact";

const CAT_PREFIX_IMAGE_URL = "https://cataas.com";
export function App() {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();

  //no puedes usar React Query,SWR,axios en las pruebas tecnica

  //consejo usar 1 efecto para 1 sola cosa osea ejemplo aqui recuperar el hecho de una api
  // recuperar el hecho al cargar la página
  useEffect(() => {
    getRandomFact().then((newFact) => setFact(newFact));
    // es lo mismo que esto
    // getRandomFact().then(setFact);
  }, []);

  //  recuperar la imagen cada vez que tenemos un hecho
  useEffect(() => {
    // si no tenemos un hecho no hace nada
    if (!fact) return;
    //  primero divide todo en arrays luego toma las primeras 3 palabras y las une
    // const firstThirdWord = fact.split(" ", 3).join(" ");
    // console.log(firstThirdWord);
    const firstWord = fact.split(" ")[0];
    // console.log(firstWord);

    fetch(
      `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { _id } = response;
        const url = `/cat/${_id}/says/${firstWord}?fontSize=50&fonColor=red`;
        setImageUrl(url);
      });
    // getImageFact(fact).then((newImageUrl) => setImageUrl(newImageUrl));
  }, [fact]);

  const handleClick = async () => {
    const newFact = await getRandomFact();
    setFact(newFact);
  };

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img
          src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`}
          alt={`Image extracted using the first three words for ${fact}`}
        />
      )}
    </main>
  );
}
