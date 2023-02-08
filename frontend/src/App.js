import { useEffect, useState } from "react";
import "./App.css";
import AccountingDashboard from "./Pages/AccountingDashboard";
import Login from "./Pages/Login";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const [loggedIn, setLoggedInStatus] = useState(false);

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

  return <div style={{ width: windowWidth, height: windowHeight }}>


 {!loggedIn && <Login login={()=>{setLoggedInStatus(true)}}/> }

{loggedIn && <AccountingDashboard />}



  </div>;
}

export default App;
