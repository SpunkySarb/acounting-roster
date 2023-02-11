import { BsPatchCheckFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useMutation } from "@apollo/client";
import { UPDATE_PAYMENT_STATUS } from "../../../../../graphql/Mutations";

const Paid = (props) => {
  const [updatePaymentStatus, { data, loading, error }] = useMutation(
    UPDATE_PAYMENT_STATUS
  );

  const markPending = () => {
    props.changeStatus();
    updatePaymentStatus({
      variables: { paymentData: { id: props.id, status: false } },
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.5, transition: 0.7 }}
      whileInView={{ scale: 1.3 }}
      onClick={markPending}
      className="w3-white w3-round-large w3-small w3-text-green w3-button"
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: 70,
        padding: 2,
      }}
    >
      <div style={{ fontWeight: "bolder" }}>paid</div>
      <BsPatchCheckFill size={15} color="green" />
    </motion.div>
  );
};

export default Paid;
