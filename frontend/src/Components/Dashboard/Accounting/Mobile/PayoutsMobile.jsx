import { useEffect, useRef, useState } from "react";
import { BiErrorAlt } from "react-icons/bi";
import { TbFidgetSpinner } from "react-icons/tb";
import ArtistExists from "../../../Errors/ArtistExists";
import ReactDOM from "react-dom";
import ListItemMobile from "./ListItemMobile";
import React from 'react';

const PayoutsMobile = (props) => {
  const { loading, listData, error, showData, newList } = props;

  const searchRef = useRef();

  const artistRef = useRef();
  const rateRef = useRef();

  const [addNewArtistActive, setAddNewArtistActivity] = useState(false);

  const [artistBorder, setArtistBorder] = useState(0);
  const [rateBorder, setRateBorder] = useState(0);
  const [artistExistsError, setArtistExistError] = useState(false);
  const validateNewArtist = () => {
    const artist = artistRef.current.value;
    const rate = rateRef.current.value;

    if (artist.trim().length === 0) {
      setArtistBorder(2);
    } else if (Number.isNaN(parseFloat(rate))) {
      setRateBorder(2);
    } else {
      setArtistBorder(0);
      setRateBorder(0);
    }
  };

  const save = () => {
    const artist = artistRef.current.value;
    const rate = rateRef.current.value;

    if (artist.trim().length === 0) {
      setArtistBorder(2);
    } else if (Number.isNaN(parseFloat(rate))) {
      setRateBorder(2);
    } else {
      setArtistBorder(0);
      setRateBorder(0);
      props
        .addNewArtist(artistRef.current.value, rateRef.current.value)
        .then((success) => {
          console.log(success);
          if (success) {
            setAddNewArtistActivity(false);
            artistRef.current.value = "";
            rateRef.current.value = 0;
          } else {
            setArtistExistError(true);
          }
        })
        .catch((err) => {});
    }
  };

  const [data, updateData] = useState([]);
  const [newData, updateNewData] = useState([]);

  useEffect(() => {
    updateData(listData);
    updateNewData(newList);
  }, [listData, newList]);

  return (
    <>
      {artistExistsError &&
        ReactDOM.createPortal(
          <ArtistExists
            close={() => {
              setArtistExistError(false);
            }}
          />,
          document.getElementById("modal")
        )}
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
        {addNewArtistActive && (
          <div className="w3-show w3-modal">
            <div
              style={{ marginTop: 200 }}
              className="w3-modal-content w3-animate-bottom w3-round-large w3-blue w3-padding w3-center"
            >
              <input
                ref={artistRef}
                style={{
                  border: `${rateBorder}px solid red`,
                }}
                onChange={validateNewArtist}
                className="w3-input w3-margin-top"
                placeholder="Artist's Name..."
              />
              <input
                ref={rateRef}
                style={{
                  border: `${rateBorder}px solid red`,
                }}
                type="number"
                min={0}
                step={0.001}
                defaultValue={0.0}
                onChange={validateNewArtist}
                className="w3-input w3-margin-top w3-margin-bottom"
                placeholder="Artist's Rate..."
              />

              <div
                onClick={save}
                className="w3-button w3-black w3-round-large w3-margin"
              >
                save
              </div>
              <div
                onClick={() => {
                  setAddNewArtistActivity(false);
                  setArtistBorder(0);
                  setRateBorder(0);
                }}
                className="w3-button w3-black w3-round-large w3-margin"
              >
                cancel
              </div>
            </div>
          </div>
        )}
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
              newData.map((i) => <ListItemMobile editList={props.editList} key={i.id} data={i} />)}
            {!loading &&
              showData &&
              data.map((i) => <ListItemMobile  editList={props.editList} key={i.id} data={i} />)}
          </div>
        )}
        {!addNewArtistActive && (
          <div
            onClick={() => {
              setAddNewArtistActivity(true);
            }}
            style={{
              bottom: 10,
              right: 30,
              width: 60,
              height: 60,
              position: "fixed",
            }}
            className="w3-hover-cyan w3-circle w3-center w3-card-4 w3-xxlarge w3-display-bottomright w3-black"
          >
            +
          </div>
        )}{" "}
      </div>
    </>
  );
};

export default React.memo(PayoutsMobile);
