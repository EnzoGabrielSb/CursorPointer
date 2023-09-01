import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState({
    positionInX: 0,
    positionInY: 0,
  });
  const [color, setColor] = useState("red");

  useEffect(() => {
    console.log("cambio del valor active");

    const handleMoves = (event) => {
      const { clientX, clientY } = event;
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
          backgroundColor: color,
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

      <section
        onClick={() => setColor(color === "blue" ? "red" : "blue")}
        style={{ marginTop: "35px" }}
      >
        <button>Cambia de color {color ? "azul" : "rojo"}.</button>
      </section>
    </>
  );
}

export default App;
