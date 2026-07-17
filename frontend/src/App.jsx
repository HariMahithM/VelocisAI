import { BrowserRouter, Route, Routes } from "react-router-dom";
import DrawLines from "./pages/DrawLines";
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

      </Routes>

    </BrowserRouter>
  );
}

export default App;