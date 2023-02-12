import { useState } from "react";
import useMediaQuery from "use-mediaquery";
import LoginDepartment from "./LoginDepartment";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { setDepartmentName } from "../../utils/Store";
import { motion } from "framer-motion";
const DepartmentCard = (props) => {
  const isPc = useMediaQuery("(min-width:800px)");

  const [loginDepartmentVisiblity, setLoginDepartmentVisibility] =
    useState(false);

  const departmentDispatcher = useDispatch();

  const toggleLoginDepartmentVisibility = () => {
    departmentDispatcher(setDepartmentName(props.department));

    setLoginDepartmentVisibility((prev) => !prev);
  };

  return (
    <>
      {loginDepartmentVisiblity &&
        ReactDOM.createPortal(
          <LoginDepartment
            login={props.login}
            close={toggleLoginDepartmentVisibility}
            department={props.department}
          />,
          document.getElementById("modal")
        )}
      <motion.div
        whileHover={{ translateY: -10, scale: 1.05 }}
        id="loginCard"
        onClick={toggleLoginDepartmentVisibility}
        className="w3-container w3-padding w3-round-xlarge w3-card-4"
        style={{
          margin: 10,
          width: isPc ? "30vh" : "20vh",
          height: isPc ? "30vh" : "20vh",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {props.children}
          <div style={{ fontFamily: "Carter One" }}>{props.department}</div>
        </div>
      </motion.div>
    </>
  );
};

export default DepartmentCard;
