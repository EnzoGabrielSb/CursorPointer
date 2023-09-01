import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState({
    positionInX: 0,
    positionInY: 0,
  });

  useEffect(() => {
    console.log("cambio del valor active");

    const handleMoves = (event) => {
      const { clientX, clientY } = event;
      console.log("Movimiento del mouse", { clientX, clientY });
      setPosition({
        positionInX: clientX,
        positionInY: clientY,
      });
    };

    if (active) {
      window.addEventListener("pointermove", handleMoves);
    }

    //Necesito limpiar el useEffect manualmente siempre!
    //Cuando el componente de DESMONTA
    //Cuando cambia las dependencias, antes de ejecutar el efecto de nuevo.
    return () => {
      window.removeEventListener("pointermove", handleMoves);
      setPosition({
        positionInX: 0,
        positionInY: 0,
      });
    };
  }, [active]);

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
          transform: `translate(${position.positionInX}px, ${position.positionInY}px)`,
        }}
      ></div>

      <h1>Mouse Pointer</h1>
      <button onClick={() => setActive(!active)}>
        {active ? "Desactivar" : "Activar"} seguir puntero.
      </button>
    </>
  );
}

export default App;
