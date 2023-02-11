import useMediaQuery from "use-mediaquery";

const PaymentMethods = (props) => {
  const isPc = useMediaQuery("(min-width:700px)");

  if (!isPc) {
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
          fontSize: 20,
          padding: 30,
        }}
      >
        This is a commercial web application, meant to be used by few employees
        and is not made for mobile view. <br />
        <br />
        Please Switch to wider view.
      </div>
    );
  }

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
        fontSize: 30,
        padding: 30,
      }}
    >
      Here you will have Company's Primary and Alternative Payment Methods.
    </div>
  );
};

export default PaymentMethods;
