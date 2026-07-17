import { useLocation } from "react-router-dom";

import DownloadButtons from "../components/DownloadButtons";
import SnapshotGallery from "../components/SnapshotGallery";
import StatsCard from "../components/StatsCard";

function Results() {

  const { state } = useLocation();

  if (!state)
    return <h2>No Results</h2>;

  const {
    outputVideo,
    snapshots,
  } = state;

  const highestSpeed =
    snapshots.length
      ? Math.max(...snapshots.map(s => s.speed))
      : 0;

  return (

    <div
      style={{
        padding: "40px",
      }}
    >

      <h1>Vehicle Speed Detection Results</h1>

      <video
        controls
        width="100%"
      >
        <source
          src={`http://localhost:5000/${outputVideo}`}
          type="video/mp4"
        />
      </video>

      <div
        style={{
          display: "flex",
          gap: "20px",
          margin: "30px 0",
        }}
      >

        <StatsCard
          title="Overspeed Vehicles"
          value={snapshots.length}
          color="#ef4444"
        />

        <StatsCard
          title="Highest Speed"
          value={`${highestSpeed} km/h`}
          color="#3b82f6"
        />

      </div>

      <SnapshotGallery
        snapshots={snapshots}
      />

      <DownloadButtons
        video={outputVideo}
      />

    </div>

  );
}

export default Results;