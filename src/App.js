import { useState } from "react";
import Container from "./components/container/Container";
import Tensorflow from "./components/tensorflowsigner/Tensorflow";

function App() {
  const [modelName, setModelName] = useState("");

  return (
    <>
      <Tensorflow setModelName={setModelName} modelName={modelName} />
      <Container modelName={modelName} />
    </>
  );
}

export default App;
