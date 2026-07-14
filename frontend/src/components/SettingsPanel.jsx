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
}){
  const startProcessing = async () => {
    if (line1.length !== 2 || line2.length !== 2) {
      alert("Please draw both reference lines.");
      return;
    }

    try {
      const response = await api.post("/api/process", {
  video,
  line1,
  line2,
  distance,
  speed_limit: speedLimit,
});

      alert(response.data.message);
    } catch (err) {
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
      >
        Start Detection
      </button>
    </div>
  );
}

export default SettingsPanel;