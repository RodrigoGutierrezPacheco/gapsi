import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Products from "./pages/Products/Products";

function App() {
  return (
    <Router>
      <div className="bg-primary text-white p-3">
        <Header />
      </div>

      <div className="d-flex flex-column" style={{ height: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
