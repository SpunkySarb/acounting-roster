import { useState } from "react";
import NotPaid from "./Badges/NotPaid";
import Paid from "./Badges/Paid";
import React from "react";

const PaymentStatus = (props) => {
  const [paymentStatus, setPaymentStatus] = useState(props.status);

  const id = props.id;

  return (
    <div>
      {paymentStatus ? (
        <Paid
          id={id}
          changeStatus={() => {
            setPaymentStatus(false);
            props.updatePaymentStatus(false);
          }}
        />
      ) : (
        <NotPaid
          id={id}
          changeStatus={() => {
            setPaymentStatus(true);
            props.updatePaymentStatus(true);
          }}
        />
      )}
    </div>
  );
};

export default React.memo(PaymentStatus);
