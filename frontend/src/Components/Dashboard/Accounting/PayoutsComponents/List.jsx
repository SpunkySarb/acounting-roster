import { TbFidgetSpinner } from "react-icons/tb";

 

import { BiErrorAlt } from "react-icons/bi";
import ListItem from "./ListItem";
import React, { useEffect, useState } from 'react';
const List = (props) => {
 

  

  

  const {loading, listData, error, showData, newList } = props;


  const [data, updateData] = useState([]);
const [newData, updateNewData] = useState([]);

  

useEffect(()=>{

  updateData(listData);
  updateNewData(newList);


},[listData, newList]);


 

  return (
    <>
      {!showData && loading && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className=" w3-text-white">
            <div className="w3-spin">
              {" "}
              <TbFidgetSpinner size={100} />
            </div>
            <br />
            <div className="w3-center">Loading...</div>
          </div>
        </div>
      )}
      {!showData && !loading && error && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className=" w3-text-white">
            <div className="">
              {" "}
              <BiErrorAlt color="red" size={100} />
            </div>
            <br />
            <div className="w3-center w3-text-red">Failed to connect</div>
          </div>
        </div>
      )}
      {!loading && showData && (
        <table className="w3-table w3-text-white w3-center">
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
          {!loading &&
            showData &&
           newData.map((i) => (
              <ListItem data={i}/>
            ))}
          {!loading &&
            showData &&
            data.map((i) => (
              <ListItem data={i}/>
            ))}
        </table>
      )}
    </>
  );
};

export default React.memo(List);
