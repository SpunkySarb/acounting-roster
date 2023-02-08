import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { Suspense, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { NavLink } from "react-router-dom";

import useMediaQuery from "use-mediaquery";

import Object from "../3DComponents/Object";

const LoginDepartment = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);



  


  const [status, setStatus] = useState("w3-show");
  const isPc = useMediaQuery("(min-width:700px)");
  const backButtonHandler = () => {
    gsap.to(document.getElementById("loginDepartment").style, {
      opacity: 0,
      duration: 0.5,
      ease: "ease.in",
    });

    setTimeout(() => {
      setStatus("");
      props.close();
    }, 500);
  };

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
    <div
      id="loginDepartment"
      className={`w3-modal ${status}`}
      style={{ opacity: 1 }}
    >
      <div
        onClick={backButtonHandler}
        style={{
          width: 60,
          height: 60,
          marginLeft: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
        }}
        className="w3-button w3-text-black w3-transparent w3-hover-cyan w3-circle"
      >
        <BiArrowBack size={40} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: windowWidth,
          height: windowHeight,
        }}
      >
        <div
          style={{
            fontFamily: "Carter One",
            textAlign: "center",
            marginLeft: isPc ? 200 : 0,
            fontSize: 40,
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            padding: 100,
          }}
        >
          <span>{props.department} team</span>

          <input
            style={{ width: isPc ? "500px" : "300px" }}
            className="w3-input  w3-large w3-center w3-margin-top"
            placeholder="Employee ID"
          />
          <input
            type="password"
            className="w3-input w3-large w3-center  w3-margin-top"
            placeholder="Password"
          />
          <NavLink to={'/dashboard/payouts'}
            
            style={{ width: "300px", alignSelf: "center" }}
            className="w3-button  w3-large w3-black w3-round-large w3-margin-top"
          >
            login
          </NavLink>
        </div>

        {isPc && (
          <Suspense fallback={<></>}>
            {" "}
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 10, 50]} />
              <OrbitControls enableZoom={false} />

              <Object />

              <ambientLight args={["white", 0.2]} />
              <pointLight args={["white", 1]} position={[0, 5, 10]} />
            </Canvas>
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default LoginDepartment;
