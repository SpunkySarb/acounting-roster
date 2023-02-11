import List from "./PayoutsComponents/List";
import {motion} from 'framer-motion';
const Payouts = () => {
 

  return (
    <div
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <div
        className="w3-border w3-round-xxlarge"
        style={{ width: "90%", borderWidth: "3px", height: "80%" }}
      >
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 20,
            justifyContent: "space-around",
            position: "relative",
            top: -70,
          }}
        >
          <motion.input whileInView={{scale:1}} whileHover={{scale:1.02}}
            style={{ maxWidth: '300px', scale:0 }}
            className="w3-input w3-padding w3-border w3-card-4 w3-border-xxlarge w3-round-xlarge"
            placeholder="Search Artist"
          />
          <div>



          </div>
        </div>

        <div
          className="w3-round-xxlarge w3-card-4"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            overflow: "auto",
            scrollBehavior: "smooth",
            position: "relative",
            top: -80,
          }}
        >
            <List/>
        </div>
      </div>
    </div>
  );
};

export default Payouts;
