import "./App.css";
import { Otro } from "./Components/Otro";
// import { getImageFact } from "./services/imgFact";
import { useCatFact } from "./hooks/useCatFact";
import { useCatImage } from "./hooks/useCatImage";

export function App() {
  // Custom Hooks
  const { fact, refreshFact } = useCatFact();
  const { imageUrl } = useCatImage({ fact });

  //  recuperar la imagen cada vez que tenemos un hecho
  // useEffect(() => {
  //   getImageFact({ fact }).then((newImageUrl) => setImageUrl(newImageUrl));
  // }, [fact]);

  const handleClick = async () => {
    refreshFact();
  };

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Image extracted using the first three words for ${fact}`}
        />
      )}
      <Otro />
    </main>
  );
}
