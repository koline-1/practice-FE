import Board from "./components/Board";
import { Route, Routes } from "react-router-dom"
import Write from "./components/Write";
import "./style.css";

function App() {
  return (
    <div className="container">
      <div className="content">
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
