function StatsCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "#111827",
        borderRadius: "15px",
        padding: "20px",
        textAlign: "center",
        flex: 1,
        border: `2px solid ${color}`,
      }}
    >
      <h3>{title}</h3>

      <h1
        style={{
          color,
          fontSize: "40px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default StatsCard;