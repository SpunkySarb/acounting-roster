import useMediaQuery from "use-mediaquery";

const PaymentMethods = (props) => {
  const isPc = useMediaQuery("(min-width:700px)");

  

  return (
    <div
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        fontFamily: "Carter One",
        fontSize: isPc?30:15,
        padding: 30,
      }}
    >
      Here you will have Company's Primary and Alternative Payment Methods.
    </div>
  );
};

export default PaymentMethods;
