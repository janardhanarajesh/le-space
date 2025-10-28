import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Upload from "./Upload";
import Download from "./download";
import './App.css';
import Login from "./login";
const Home = () => <h2>Welcome to My App 🚀</h2>;

const App = () => {
  return (
    <Router>
      {/* Navigation Menu */}
      <center>
      <nav id="nav">
        <div id="nav1">
        <div className="nav2"><Link to="/upload">Upload</Link></div> {" "}
        <div className="nav2"><Link to="/files">View Files</Link></div>{" "}
        <div className="nav2"><Link to="/">login</Link></div>
        </div>
      </nav>
</center>
      {/* Page Routes */}
      <Routes>
        <Route path="/upload" element={<Upload />} />
        <Route path="/files" element={< Download/>} />
        <Route path="/" element={<Login/>}/>
      </Routes>
    </Router>
  );
};

export default App;
