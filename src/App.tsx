import { Routes, Route } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="App">
        <div className="navbar">
          <Navbar />
        </div>
      </div>
    </>
  );
};

export default App;
