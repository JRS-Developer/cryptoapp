import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import Navbar from "./components/Navbar";
import Exchanges from "./components/Exchanges";
import Cryptocurrencies from "./components/Cryptocurrencies";
import Homepage from "./components/Homepage";
import CryptoDetails from "./components/CryptoDetails";
import News from "./components/News";
import "antd/dist/antd.css";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Routes>
                <Route path="/">
                  <Route index element={<Homepage />} />
                  <Route path="exchanges" element={<Exchanges />} />
                  <Route
                    path="cryptocurrencies"
                    element={<Cryptocurrencies />}
                  />
                  <Route path="crypto/:coinId" element={<CryptoDetails />} />
                  <Route path="news" element={<News />} />
                </Route>
              </Routes>
            </div>
          </Layout>
          <div className="footer">
            <Typography.Title
              level={5}
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              Cryptoverse <br />
              All rights reserved
            </Typography.Title>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/exchanges">Exchanges</Link>
              <Link to="/news">News</Link>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
