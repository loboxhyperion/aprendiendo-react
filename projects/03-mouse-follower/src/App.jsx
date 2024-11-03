import { useEffect, useState } from "react";

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  //buena practica inicializar el estado con el tipo de dato que vas usar
  //  o null si algo que no tienes claro
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    console.log("efecto", { enabled });
    const handleMove = (event) => {
      // position del puntero
      const { clientX, clientY } = event;
      console.log("handMove", { clientX, clientY });
      setPosition({ x: clientX, y: clientY });
    };
    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    }
    // cleanup
    // cuando el componente se desmonta
    //  cuando cambian las dependencias, antes de ejecutar el efectp de nuevo
    return () => {
      //limpiamos la suscripcion para que no quede activa cuando se vuelva ejecturar
      //en este caso que no quede activo el evento pointermove
      window.removeEventListener("pointermove", handleMove);
      console.log("cleanup");
    }; // para limpiar el useEffect y no quede nada vigente
  }, [enabled]);
  return (
    <>
      <div
        style={{
          position: "absolute",
          backgroundColor: "#09f",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Desactivar" : "Activar"} seguir puntero
      </button>
    </>
  );
};
function App() {
  return (
    <main>
      <FollowMouse />
    </main>
  );
}

export default App;
