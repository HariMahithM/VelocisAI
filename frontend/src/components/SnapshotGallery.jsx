import SnapshotCard from "./SnapshotCard";

function SnapshotGallery({ snapshots }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
        gap: "20px",
      }}
    >
      {snapshots.map((item, index) => (
        <SnapshotCard
          key={index}
          snapshot={item}
        />
      ))}
    </div>
  );
}

export default SnapshotGallery;