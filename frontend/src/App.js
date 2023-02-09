import { useEffect, useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const windowResizeEvent = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", windowResizeEvent);

    return () => {
      window.removeEventListener("resize", windowResizeEvent);
    };
  }, []);

  return (
    <BrowserRouter>
      {" "}
      <div style={{ width: windowWidth, height: windowHeight }}>
        <Routes>
          <Route path="/" element={<Login />} />
          {["/dashboard/:department/:actions", "/dashboard/:department/"].map(
            (path, index) => {
              return <Route key={index} path={path} element={<Dashboard />} />;
            }
          )}

          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
