import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import useMediaQuery from "use-mediaquery";
import { setLoginStatus } from "../../utils/Store";
import HeaderPhone from "./HeaderPhone";

const Header = (props) => {
  const isPc = useMediaQuery("(min-width:700px)");

  const { department } = useParams();

  const logoutDispatcher = useDispatch();

  const logout = () => {
    logoutDispatcher(setLoginStatus(false));
  };

  const classActive =
    "w3-bar-item  w3-button w3-margin-left w3-round-xlarge w3-cyan";
  const classNotActive =
    "w3-bar-item w3-margin-left  w3-button w3-round-xlarge w3-hover-cyan";

  return (
    <>
      {!isPc && <HeaderPhone />}

      {isPc && (
        <div
          style={{
            fontFamily: "Carter One",
            backgroundColor: "rgba(0, 0, 0, 0.33)",
            color: "cyan",
            alignItems: "center",
            display: "flex",
          }}
          className="w3-container w3-card-4 w3-padding"
        >
          <div
            className=" w3-xlarge  w3-round-large"
            style={{ width: "300px" }}
          >
            {department}
          </div>
          <div style={{ marginLeft: 200 }} className="w3-bar w3-container">
            {department === "Accounting" && (
              <>
                {" "}
                <NavLink
                  to={"/dashboard/Accounting/payouts"}
                  className={({ isActive }) => {
                    return isActive ? classActive : classNotActive;
                  }}
                >
                  payouts
                </NavLink>
                <NavLink
                  to={"/dashboard/Accounting/paymentMethods"}
                  className={({ isActive }) => {
                    return isActive ? classActive : classNotActive;
                  }}
                >
                  payment methods
                </NavLink>
                <NavLink
                  to={"/dashboard/Accounting/depositSettings"}
                  className={({ isActive }) => {
                    return isActive ? classActive : classNotActive;
                  }}
                >
                  deposit settings
                </NavLink>
              </>
            )}
            <NavLink
              to={"/"}
              onClick={logout}
              className={({ isActive }) => {
                return isActive
                  ? classActive + " w3-right"
                  : classNotActive + " w3-right";
              }}
            >
              logout
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
