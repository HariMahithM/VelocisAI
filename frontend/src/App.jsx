import { BrowserRouter, Route, Routes } from "react-router-dom";

import DrawLines from "./pages/DrawLines";
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

      </Routes>

    </BrowserRouter>
  );
}

export default App;