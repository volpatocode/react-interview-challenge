import { useState } from "react";
import "./App.css";

type circleType = { clientX: number; clientY: number }[];

function App() {
  const [circles, setCircles] = useState<circleType>([] as circleType);
  const [poppedCircles, setPoppedCircles] = useState<circleType>(
    [] as circleType
  );

  function addCircle(clientX: number, clientY: number) {
    let newCircle = { clientX, clientY };
    setCircles([...circles, newCircle]);
  }

  function handleUndo() {
    let popped = circles?.pop()
    setPoppedCircles([...poppedCircles, popped]);
  }

  function handleRedo() {
    let popped = poppedCircles?.pop()
    setCircles([...circles, popped])
  }

  return (
    <>
      <button disabled={circles.length < 1} onClick={handleUndo} className="btn">Undo</button>
      <button disabled={poppedCircles.length < 1} onClick={handleRedo} className="btn">Redo</button>
      <div
        onClick={(e) => {
          addCircle(e.clientX, e.clientY);
        }}
        className="container"
      >
        {circles?.map((circle, index) => (
          <div
            key={index}
            className="circle"
            style={{
              top: `calc(${circle?.clientY + "px"} - 4px )`,
              left: `calc(${circle?.clientX + "px"} - 4px )`,
            }}
          />
        ))}
      </div>
    </>
  );
}

export default App;
