
import { useEffect, useState } from "react";
import {GrEdit} from 'react-icons/gr';
import {MdDelete} from 'react-icons/md';
import {TbFidgetSpinner} from 'react-icons/tb';

import { useQuery } from "@apollo/client";

import { motion } from "framer-motion";

import { GET_DATA } from "../../../../graphql/Queries";
import ArtistBadge from "./Badges/ArtistBadge";
import PaymentStatus from "./PaymentStatus";
import { BiErrorAlt } from "react-icons/bi";

const List = (props) => {
  

  const [showData, setDataVisibility] = useState(false);

  const { loading, data, error, refetch } = useQuery(GET_DATA);

  useEffect(() => {
    refetch().then(()=>{

      setDataVisibility(true);

    }).catch(err=>{console.log(err.message)});
  }, []);
  
  

  return (<>
    {!showData && loading && (
        <div style={{width:'100%', height:'100%', display:"flex", justifyContent:'center', alignItems:"center"}}>
      <div className=" w3-text-white" >
       <div className="w3-spin"> <TbFidgetSpinner size={100}/></div><br/>
       <div className="w3-center">Loading...</div>

      </div></div>
    )}
     {!showData && !loading && error && (
        <div style={{width:'100%', height:'100%', display:"flex", justifyContent:'center', alignItems:"center"}}>
      <div className=" w3-text-white" >
       <div className=""> <BiErrorAlt color="red" size={100}/></div><br/>
       <div className="w3-center w3-text-red">Failed to connect</div>

      </div></div>
    )}
 {!loading && showData && <table className="w3-table w3-text-white w3-center">
    <tr
      className="w3-cyan"
      style={{ position: "sticky", top: 0, zIndex: 999 }}
    >
      <th className="w3-center">ARTIST</th>
      <th className="w3-center">STREAMS</th>
      <th className="w3-center">RATE</th>
      <th className="w3-center">MONTHLY AVERAGE</th>
      <th className="w3-center">ACTIONS</th>
      <th className="w3-center">PAYMENT STATUS</th>
    </tr> 

   
    {!loading && showData &&
      data.getData.map((i) => (
        <motion.tr 
          key={i.id}
          
          whileHover={{backgroundColor:'gray', color:'white',  }}
         
        >
          <motion.td whileInView={{ scaleX: 1 }} style={{scaleX:0}}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ArtistBadge artist={i.artist} />
              <span style={{ fontSize: 20, fontWeight: "200" }}>
                {" "}
                {(i.artist + "").slice(0, 15) +
                  ((i.artist + "").length > 15 ? "..." : "")}
              </span>
            </div>
          </motion.td>
          <motion.td whileInView={{scale:1, transition:'2s'}} style={{scale:0}}><div style={{display:'flex', justifyContent:'center',fontSize: 20, fontWeight: "200", }}>{i.streams}</div></motion.td>
          <td><div style={{display:'flex', justifyContent:'center',fontSize: 20, fontWeight: "200"}}>{i.rate}</div></td>
          <motion.td whileInView={{scaleY:1, transition:'2s'}} style={{scaleY:0}}><div style={{display:'flex', justifyContent:'center',fontSize: 20, fontWeight: "200", }}>{"$" + i.avgpayout}</div></motion.td>
          <td><div style={{display:'flex', justifyContent:'center', flexDirection:"row"}}>
            
            <motion.div className="w3-button w3-round-xlarge w3-margin-right w3-blue">
<GrEdit size={20}/>
            </motion.div>
            <motion.div className="w3-button w3-round-xlarge w3-red">
<MdDelete size={20}/>
            </motion.div>
            
            
            </div></td>
          <td><div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:10}}><PaymentStatus id={i.id} status={i.status}/></div></td>
        </motion.tr>

        
      ))}
  </table>}
  </>);
};

export default List;
