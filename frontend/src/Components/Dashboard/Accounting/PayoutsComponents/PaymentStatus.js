import { useState } from "react";
import NotPaid from "./Badges/NotPaid";
import Paid from "./Badges/Paid";







const PaymentStatus =(props)=>{ 



    const [paymentStatus, setPaymentStatus] = useState(props.status);

    const id = props.id;

return (<div>

{paymentStatus ? (
            <Paid
              id={id}
              
              changeStatus={() => {
                setPaymentStatus(false);
              }}
            />
          ) : (
            <NotPaid
              id={id}
              
              changeStatus={() => {
                setPaymentStatus(true);
              }}
            />
          )}


</div>);
}

export default PaymentStatus;