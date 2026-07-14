import { useState } from "react";
import { useLocation } from "react-router-dom";

import Canvas from "../components/Canvas";
import SettingsPanel from "../components/SettingsPanel";

function DrawLines() {
  const location = useLocation();

  const frameUrl = location.state?.frame || "";
  const videoName = location.state?.video || "";

  const [line1, setLine1] = useState([]);
  const [line2, setLine2] = useState([]);

  const [distance, setDistance] = useState(8);
  const [speedLimit, setSpeedLimit] = useState(50);

  const resetLines = () => {
    setLine1([]);
    setLine2([]);
  };

  if (!frameUrl) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
          color: "white",
        }}
      >
        <h2>No Frame Found</h2>

        <p>Please upload a video first.</p>
      </div>
    );
  }

  return (
    <div className="draw-page">
      <div className="canvas-section">
        <h2 style={{ marginBottom: "20px" }}>
          Draw Detection Lines
        </h2>

        <p style={{ marginBottom: "15px", color: "#94A3B8" }}>
          Video :
          <strong> {videoName}</strong>
        </p>

        <Canvas
          image={frameUrl}
          line1={line1}
          line2={line2}
          setLine1={setLine1}
          setLine2={setLine2}
        />
      </div>

      <SettingsPanel
        distance={distance}
        setDistance={setDistance}
        speedLimit={speedLimit}
        setSpeedLimit={setSpeedLimit}
        line1={line1}
        line2={line2}
        resetLines={resetLines}
        video={videoName}
      />
    </div>
  );
}

export default DrawLines;