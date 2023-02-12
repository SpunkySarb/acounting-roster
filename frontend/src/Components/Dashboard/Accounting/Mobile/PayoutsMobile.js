import { useEffect, useRef, useState } from "react";
import { BiErrorAlt } from "react-icons/bi";
import { TbFidgetSpinner } from "react-icons/tb";

import ListItemMobile from "./ListItemMobile";

const PayoutsMobile = (props) => {
  const { loading, listData, error, showData, newList } = props;

  const searchRef = useRef();

  const [data, updateData] = useState([]);
  const [newData, updateNewData] = useState([]);

  useEffect(() => {
    updateData(listData);
    updateNewData(newList);
  }, [listData, newList]);

  return (
    <div
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
        overflow: "hidden",
      }}
    >
      <div className="w3-container">
        <input
          ref={searchRef}
          onChange={() => {
            props.searchList(searchRef.current.value);
          }}
          className="w3-input w3-round-xlarge"
          placeholder="Search Artist..."
        />
      </div>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "80%",
            overflowY: "auto",
            paddingRight: "10%",
            paddingLeft: "10%",
          }}
        >
          {!loading &&
            showData &&
            newData.map((i) => <ListItemMobile data={i} />)}
          {!loading && showData && data.map((i) => <ListItemMobile data={i} />)}
        </div>
      )}
    </div>
  );
};

export default PayoutsMobile;
