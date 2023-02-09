import { useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import DepositSettings from "../Components/Dashboard/Accounting/DepositSettings";
import PaymentMethods from "../Components/Dashboard/Accounting/PaymentMethods";
import Payouts from "../Components/Dashboard/Accounting/Payouts";
import Header from "../Components/Dashboard/Header";










const Dashboard =(props)=>{ 


const {actions}  = useParams();

const navigate = useNavigate();


useEffect(()=>{

   

    if(window.location.pathname==='/dashboard/Accounting/' || window.location.pathname==='/dashboard/Accounting') navigate('/dashboard/Accounting/payouts');
   


},[window.location.pathname]);



return (<div>

<Header/>
{actions==='payouts' && <Payouts/>}
{actions==='paymentMethods' && <PaymentMethods/>}
{actions==='depositSettings' && <DepositSettings/>}
</div>);
}

export default Dashboard;