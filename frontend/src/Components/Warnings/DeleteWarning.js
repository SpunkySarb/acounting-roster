import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

const DeleteWarning = (props) => {
  const { id, artist } = props;

  const scale = useMotionValue(0);

  useEffect(() => {
    animate(scale, 1);
  });

  return (
    <motion.div
      className=" w3-text-black "
      style={{
        scale: scale,
        position: "absolute",
        opacity: 1,
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: window.innerWidth,
        height: window.innerHeight,
      }}
    >
      <div
        className="w3-xxlarge w3-cyan w3-center  w3-card-4 w3-round-xxlarge"
        style={{ padding: 40, fontFamily: "Carter One" }}
      >
        Are you sure you want to <br /> delete "{artist}" from records ?<br />
        <motion.div
          onClick={() => {
            animate(scale, 0);
            setTimeout(() => {
              props.delete(id);
              props.close();
            }, 200);
          }}
          whileHover={{ scale: 1.2 }}
          className="w3-button w3-large w3-red w3-margin-right w3-round-large"
        >
          confirm
        </motion.div>
        <motion.div
          onClick={() => {
            animate(scale, 0);
            setTimeout(() => {
              props.close();
            }, 200);
          }}
          whileHover={{ scale: 1.2 }}
          className="w3-button w3-large w3-black w3-round-large"
        >
          cancel
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DeleteWarning;
