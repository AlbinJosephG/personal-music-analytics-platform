import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Compatibility from "./pages/Compatibility";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/compatibility" element={<Compatibility />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;