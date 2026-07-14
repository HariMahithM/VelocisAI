import { useState } from "react";

function Canvas({
  image,
  line1,
  line2,
  setLine1,
  setLine2,
}) {
  const [tempPoint, setTempPoint] = useState(null);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();

    const point = {
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    };

    if (line1.length < 2) {
      setLine1([...line1, point]);
      return;
    }

    if (line2.length < 2) {
      setLine2([...line2, point]);
      return;
    }
  };

  const moveMouse = (e) => {
    const rect = e.target.getBoundingClientRect();

    setTempPoint({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      style={{
        position: "relative",
        width: "900px",
      }}
    >
      <img
        src={image}
        alt=""
        onClick={handleClick}
        onMouseMove={moveMouse}
        style={{
          width: "900px",
          cursor: "crosshair",
          borderRadius: "10px",
          display: "block",
        }}
      />

      <svg
        width="900"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      >
        {/* Line A */}
        {line1.length === 2 && (
          <line
            x1={line1[0].x}
            y1={line1[0].y}
            x2={line1[1].x}
            y2={line1[1].y}
            stroke="yellow"
            strokeWidth="4"
          />
        )}

        {/* Line B */}
        {line2.length === 2 && (
          <line
            x1={line2[0].x}
            y1={line2[0].y}
            x2={line2[1].x}
            y2={line2[1].y}
            stroke="red"
            strokeWidth="4"
          />
        )}

        {/* Temporary preview */}
        {line1.length === 1 && tempPoint && (
          <line
            x1={line1[0].x}
            y1={line1[0].y}
            x2={tempPoint.x}
            y2={tempPoint.y}
            stroke="yellow"
            strokeDasharray="6"
            strokeWidth="3"
          />
        )}

        {line2.length === 1 && tempPoint && (
          <line
            x1={line2[0].x}
            y1={line2[0].y}
            x2={tempPoint.x}
            y2={tempPoint.y}
            stroke="red"
            strokeDasharray="6"
            strokeWidth="3"
          />
        )}

        {/* Points */}
        {[...line1, ...line2].map((p, index) => (
          <circle
            key={index}
            cx={p.x}
            cy={p.y}
            r="6"
            fill="lime"
          />
        ))}
      </svg>
    </div>
  );
}

export default Canvas;