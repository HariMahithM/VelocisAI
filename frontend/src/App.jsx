import { BrowserRouter, Route, Routes } from "react-router-dom";
import DrawLines from "./pages/DrawLines";
import History from "./pages/History";
import Results from "./pages/Results";
import UploadPage from "./pages/UploadPage";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<UploadPage />}
        />

        <Route
          path="/draw"
          element={<DrawLines />}
        />

        <Route
          path="/results"
          element={<Results/>}
        />
        <Route path="/history" element={<History />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;