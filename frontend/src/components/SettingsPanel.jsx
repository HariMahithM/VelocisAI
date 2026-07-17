import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function SettingsPanel({
  video,
  distance,
  setDistance,
  speedLimit,
  setSpeedLimit,
  line1,
  line2,
  resetLines,
}) {
  
  // ✅ Hook goes here
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const startProcessing = async () => {

    if (line1.length !== 2 || line2.length !== 2) {
      alert("Please draw both reference lines.");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/api/process", {
        video,
        line1,
        line2,
        distance,
        speed_limit: speedLimit,
      });

      setLoading(false);

      navigate("/results", {
        state: {
          outputVideo: response.data.output_video,
          snapshots: response.data.snapshots,
        },
      });

    } catch (err) {
      setLoading(false);
      console.log(err);

      if (err.response) {
        console.log("Response Status:", err.response.status);
        console.log("Response Data:", err.response.data);
      } else if (err.request) {
        console.log("Request was sent but no response received.");
      } else {
        console.log("Error:", err.message);
      }

      alert("Processing failed");
    }
  };

  return (
    <div className="settings-panel">

      <h2>Detection Settings</h2>

      <label>Distance Between Lines (meters)</label>

      <input
        type="number"
        value={distance}
        min="1"
        onChange={(e) => setDistance(Number(e.target.value))}
      />

      <label>Overspeed Limit (km/h)</label>

      <input
        type="number"
        value={speedLimit}
        min="1"
        onChange={(e) => setSpeedLimit(Number(e.target.value))}
      />

      <div className="status">
        <p>Line A : {line1.length}/2 Points</p>
        <p>Line B : {line2.length}/2 Points</p>
      </div>

      <button
        className="reset-btn"
        onClick={resetLines}
      >
        Reset Lines
      </button>

      <button
  className="process-btn"
  onClick={startProcessing}
  disabled={loading}
>
  {loading ? "Processing..." : "Start Detection"}
</button>

    {loading && (
  <div className="loading-overlay">
    <div className="loader"></div>

    <h2>Analyzing Video...</h2>

    <p>Please wait while YOLO detects vehicles.</p>
  </div>
)}
    </div>
  );
}

export default SettingsPanel;