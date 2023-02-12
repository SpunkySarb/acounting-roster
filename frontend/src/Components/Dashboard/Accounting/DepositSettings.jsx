import useMediaQuery from "use-mediaquery";

const DepositSettings = (props) => {
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
      Here you will have artist's direct deposit details.
      <br />
      You just select the artist from dropdown
      <br /> and can edit the deposit details.
    </div>
  );
};

export default DepositSettings;
