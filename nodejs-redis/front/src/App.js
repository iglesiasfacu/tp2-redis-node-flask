import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/global.css";
import Home from "./pages/Home/Home";
import Create from "./pages/Create/Create";
import List from "./pages/List/List";
import Delete from "./pages/Delete/Delete";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/list" element={<List />} />
          <Route path="/delete" element={<Delete />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
