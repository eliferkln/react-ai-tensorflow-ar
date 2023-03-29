import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";
import styles from "./tensorflow.module.css";
const URL = "/models";

function Tensorflow({ setModelName, modelName }) {
  const [model, setModel] = useState(null);
  const [modelType, setModelType] = useState([]);
  const [maxPredictions, setMaxPredictions] = useState(0);
  // const [modelName, setModelName] = useState("");

  async function init() {
    const modelURL = URL + "/model.json";
    const metadataURL = URL + "/metadata.json";
    const tmModel = await tmImage.load(modelURL, metadataURL);
    setModel(tmModel);
    setMaxPredictions(tmModel.getTotalClasses());
  }

  let classPrediction = "";

  async function predict(webcamRef, labelContainer) {
    if (model && webcamRef && webcamRef.current && labelContainer) {
      const prediction = await model.predict(webcamRef.current.video);
      setModelType(prediction);

      for (let i = 0; i < maxPredictions; i++) {
        classPrediction =
          prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
      }
    }
  }

  // console.log("logggg", modelType[1]?.probability.toFixed(2));

  useEffect(() => {
    if (modelType[0]?.probability.toFixed(2) >= 0.9) {
      setModelName(modelType[0]?.className);
    } else if (modelType[1]?.probability.toFixed(2) >= 0.9) {
      setModelName(modelType[1]?.className);
    } else if (modelType[2]?.probability.toFixed(2) >= 0.9) {
      setModelName(modelType[2]?.className);
    } else if (modelType[3]?.probability.toFixed(2) >= 0.9) {
      setModelName(modelType[3]?.className);
    } else if (modelType[4]?.probability.toFixed(2) >= 0.9) {
      setModelName(modelType[4]?.className);
    }

    init();
  }, [modelType, modelName]);

  const webcamRef = React.useRef(null);

  const loop = async () => {
    await predict(webcamRef, document.getElementById("label-container"));
    window.requestAnimationFrame(loop);
  };

  return (
    <div>
      <div className={styles["tensorflow"]}>
        <h2>Show the object you want to search </h2>
        <button type="button" onClick={loop}>
          Start
        </button>
        <div className={styles["cam"]}>
          <Webcam
            audio={false}
            ref={webcamRef}
            width={650}
            height={480}
            style={{ borderRadius: "120px" }}
            screenshotFormat="image/jpeg"
          />
        </div>
        <div id="label-container" className={styles["class"]}>
          {Array.from(Array(maxPredictions).keys()).map((index) => (
            <div key={index}></div>
          ))}
          {/* {modelType?.map((index) => (
            <div key={index.className + ": " + index.probability}>
              {index.className + ": " + index.probability.toFixed(2)}
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Tensorflow;
