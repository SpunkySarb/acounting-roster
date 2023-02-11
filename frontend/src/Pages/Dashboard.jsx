import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepositSettings from "../Components/Dashboard/Accounting/DepositSettings";
import PaymentMethods from "../Components/Dashboard/Accounting/PaymentMethods";
import Payouts from "../Components/Dashboard/Accounting/Payouts";
import Header from "../Components/Dashboard/Header";

const Dashboard = (props) => {
  const { actions } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (
      window.location.pathname === "/dashboard/Accounting/" ||
      window.location.pathname === "/dashboard/Accounting"
    )
      navigate("/dashboard/Accounting/payouts");
  }, [window.location.pathname]);

  return (
    <div>
      <Header />
      {actions === "payouts" && <Payouts />}
      {actions === "paymentMethods" && <PaymentMethods />}
      {actions === "depositSettings" && <DepositSettings />}
      

      <div
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Carter One",
        fontSize: 30,
        padding: 30,
      }}
    >
    Please Open Accounting Pannel<br/>
    Because This project is for<br/><br/> <a href="https://github.com/rebeldotcom/roster-challenge-api-and-ui">Accounting Challange.</a>
    </div>
    </div>
  );
};

export default Dashboard;
