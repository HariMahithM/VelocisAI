function SnapshotCard({ snapshot }) {

  return (

    <div className="snapshot-card">

      <img
        src={`http://localhost:5000/${snapshot.image}`}
        alt=""
      />

      <h3>Vehicle #{snapshot.vehicle_id}</h3>

      <p>Speed : {snapshot.speed} km/h</p>

      <p>Time : {snapshot.timestamp} sec</p>

    </div>

  );

}

export default SnapshotCard;