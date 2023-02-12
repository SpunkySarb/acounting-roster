import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_PAYMENT_STATUS } from "../../../../graphql/Queries";
import NotPaid from "./Badges/NotPaid";
import Paid from "./Badges/Paid";
import React from "react";

import { FaSpinner } from "react-icons/fa";
import useMediaQuery from "use-mediaquery";

const PaymentStatus = (props) => {
  const { loading, error, data, refetch } = useQuery(GET_PAYMENT_STATUS, {
    variables: { paymentId: { id: props.id } },
  });
  const isPc = useMediaQuery("(min-width:800px)");
  const [paymentStatus, setPaymentStatus] = useState(props.status);

  const id = props.id;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    refetch()
      .then((data) => {
        try {
          setPaymentStatus(data.getPaymentStatus.value);
          setIsLoaded(true);
        } catch (err) {}
      })
      .catch(console.error());

      try{
        if(data!==undefined){
          setPaymentStatus(data.getPaymentStatus.value);
        }
      }catch(err){

      }

    
  }, [loading]);

  if (loading && !isLoaded) {
    return (<>{isPc?
      <div className="w3-spin">
        <FaSpinner color="white" />
      </div>:<div>loading..</div>}</>
    );
  }

  return (
    <div>
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
    </div>
  );
};

export default React.memo(PaymentStatus);
