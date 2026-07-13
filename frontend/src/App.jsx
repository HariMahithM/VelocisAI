import { useEffect, useState } from "react";
import api from "./services/api";

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/")
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch(() => {
        setMessage("Backend Offline");
      });
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px"
      }}
    >
      <h1>VelocisAI</h1>

      <h2>{message}</h2>
    </div>
  );
}

export default App;