import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>  
          <Route path="/" element={<HomePage />} />
          <Route path="/kost/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
