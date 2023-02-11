import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";

const ArtistExists = (props) => {


const scale = useMotionValue(0);

useEffect(()=>{

    animate(scale,1);
});


  return (
    <motion.div
      
      className="   w3-text-black "
      style={{ scale:scale, position:"absolute", opacity: 1, zIndex: 999, display:"flex", justifyContent:"center", alignItems:"center", width:window.innerWidth, height:window.innerHeight }}
    >
      <div
        className="w3-xxlarge w3-cyan w3-center  w3-card-4 w3-round-xxlarge"
        style={{ padding: 40, fontFamily: "Carter One" }}
      >
        Artist already exists...!<br/>
        <motion.div onClick={()=>{
            animate(scale,0)
            setTimeout(() => {
                props.close();
            }, 200);

            }} whileHover={{scale:1.2}} className="w3-button w3-large w3-red w3-round-large">
            close
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArtistExists;
