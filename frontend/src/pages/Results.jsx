import { useLocation } from "react-router-dom";
import SnapshotCard from "../components/SnapshotCard";

function Results() {
  const { state } = useLocation();

  if (!state) {
    return <h2>No Results Found</h2>;
  }

  const { outputVideo, snapshots } = state;

  return (
    <div className="results-page">

      <h1>Detection Results</h1>

      <video width="900" controls>
  <source
    src={`http://localhost:5000/${outputVideo}`}
    type="video/mp4"
  />
  Your browser does not support the video tag.
</video>

      <h2>
        Overspeed Vehicles ({snapshots.length})
      </h2>

      <div className="snapshot-grid">
        {snapshots.map((item, index) => (
          <SnapshotCard
            key={index}
            snapshot={item}
          />
        ))}
      </div>

      <button>
        Download PDF Report
      </button>

    </div>
  );
}

export default Results;