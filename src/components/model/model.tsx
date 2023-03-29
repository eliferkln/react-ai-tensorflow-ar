import React, { useEffect, useState } from "react";
import "@google/model-viewer/lib/model-viewer";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerJSX &
        React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

interface ModelViewerJSX {
  src: string;
  poster?: string;
  iosSrc?: string;
  seamlessPoster?: boolean;
  autoplay?: boolean;
  environmentImage?: string;
  exposure?: string;
  interactionPromptThreshold?: string;
  shadowIntensity?: string;
  ar?: boolean;
  arModes?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
  cameraOrbit?: string;
  alt?: string;
  sx?: any;
}

const Model = () => {
  const [data, setdata] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data.json");
      const json = await res.json();
      console.log("jsondata", json?.modelsglasses[0].glbFile);
      setdata(json?.modelsglasses);
    };
    fetchData();
  }, []);
  console.log("dataaa", data);
  return (
    <>
      {data?.map((item: any) => (
        <model-viewer
          id="first"
          src={item?.glbFile}
          // ios-src={iosSrc}
          seamless-poster
          environment-image="neutral"
          exposure="1.0"
          interaction-prompt-threshold="0"
          shadow-intensity="1"
          ar
          autoplay
          ar-modes="webxr scene-viewer quick-look"
          auto-rotate
          camera-controls
          camera-orbit="0deg 90deg 0deg 8.37364m"
          alt="3D model"
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "transparent",
            margin: "25px",
            width: "20em",
            height: "20em",
          }}
        >
          <div className="poster" slot="poster">
            <img className="pre-prompt" src="/glb/prompt.svg" />
          </div>
        </model-viewer>
      ))}
    </>
  );
};

export default Model;
