import DepartmentCard from "../Components/Login/DepartmentCard";

import { AiFillAccountBook, AiOutlineStock } from "react-icons/ai";

import { RiAdminLine } from "react-icons/ri";
import { GiHumanPyramid } from "react-icons/gi";

import useMediaQuery from "use-mediaquery";

const Login = (props) => {
  const isPc = useMediaQuery("(min-width:700px)");

  const styles = isPc ? { display: "flex", justifyContent: "center" } : {};

  return (
    <div id="loginContainer">
      <div
        style={{
          fontFamily: "Carter One",
          marginTop: 150,
          fontSize: 20,
          color: "cyan",
        }}
        className="w3-center"
      >
        Choose Your Department
      </div>

      <div
        className="w3-display-middle"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div style={styles}>
          <DepartmentCard department="Accounting">
            {" "}
            <AiFillAccountBook size={150} />{" "}
          </DepartmentCard>
          <DepartmentCard department="Marketing">
            <AiOutlineStock size={150} />
          </DepartmentCard>
        </div>

        <div style={styles}>
          <DepartmentCard department="Admin">
            <RiAdminLine size={150} />
          </DepartmentCard>
          <DepartmentCard department="Human Resources">
            {" "}
            <GiHumanPyramid size={150} />
          </DepartmentCard>
        </div>
      </div>
    </div>
  );
};

export default Login;
