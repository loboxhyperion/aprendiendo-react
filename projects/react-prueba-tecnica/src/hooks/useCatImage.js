import { useEffect, useState } from "react";

const CAT_PREFIX_IMAGE_URL = "https://cataas.com";

export function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState();

  //  recuperar la imagen cada vez que tenemos un hecho
  useEffect(() => {
    // si no tenemos un hecho no hace nada
    if (!fact) return;
    const firstWord = fact.split(" ")[0];
    fetch(
      `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { _id } = response;
        const url = `/cat/${_id}/says/${firstWord}?fontSize=50&fonColor=red`;
        setImageUrl(url);
      });
    // getImageFact({fact}).then((newImageUrl) => setImageUrl(newImageUrl));
  }, [fact]);

  return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` };
}
