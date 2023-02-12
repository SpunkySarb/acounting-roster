import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";


import React from "react";

import ReactDOM from "react-dom";
import { useMutation } from "@apollo/client";
import { DELETE_ARTIST, EDIT_ARTIST } from "../../../../graphql/Mutations";

import PaymentStatus from "../PayoutsComponents/PaymentStatus";
import DeleteWarning from "../../../Warnings/DeleteWarning";

const ListItemMobile = (props) => {
  const [deleteArtist] = useMutation(DELETE_ARTIST);
  const [editArtist] = useMutation(EDIT_ARTIST);

  const [nameExistsErrorBorder, setNameErrorBorder] = useState(0);

  const [edittingActive, setEditingStatus] = useState(false);

  const i = props.data;

  const monthDiff = () => {
    const spotifyLaunchDate = new Date();
    spotifyLaunchDate.setMonth(3);
    spotifyLaunchDate.setFullYear(2006);

    const todayDate = new Date();

    var months;
    months = (todayDate.getFullYear() - spotifyLaunchDate.getFullYear()) * 12;
    months -= spotifyLaunchDate.getMonth();
    months += todayDate.getMonth();
    return months <= 0 ? 0 : months;
  };

  const getMonthlyAverage = (rate) => {
    return Math.round((i.streams * rate) / monthDiff());
  };

  const [artistName, updateArtistName] = useState(i.artist);
  const [currentRate, updateCurrentRate] = useState(i.rate);

  const [currentAvg, updateCurrentAvg] = useState(i.avgpayout);

  const [isDeleted, setDeletedStatus] = useState(false);

  const [deletionActive, setDeletionStatus] = useState(false);

  const scaleHeight = useMotionValue(1);

  const deleteItem = (id) => {
    animate(scaleHeight, 0, { duration: 0.7 });

    deleteArtist({ variables: { artistId: { id: id } } });

    setTimeout(() => {
      setDeletedStatus(true);
    }, 700);
  };

  const deletion = () => {
    setDeletionStatus(true);
  };

  const saveEdited = () => {
    editArtist({
      variables: {
        artistData: {
          id: i.id,
          artist: artistName,
          rate: parseFloat(currentRate),
        },
      },
    })
      .then((data) => {
        if (data.data.editArtist.errorValue) {
          setNameErrorBorder(2);
        } else {
          setEditingStatus(false);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    updateArtistName(i.artist);
    updateCurrentAvg(i.avgpayout);
    updateCurrentRate(i.rate);
  }, [i]);

  return (
    <>
      {" "}
      {nameExistsErrorBorder === 2 && (
        <span className="  w3-center w3-small" style={{ color: "white" }}>
          {artistName} already exists...
        </span>
      )}{" "}
      {deletionActive &&
        ReactDOM.createPortal(
          <DeleteWarning
            close={() => {
              setDeletionStatus(false);
            }}
            delete={deleteItem}
            id={i.id}
            artist={i.artist}
          />,
          document.getElementById("modal")
        )}
      {!isDeleted && (
        <motion.table
          whileInView={{ scale: 1 }}
          className="w3-table w3-striped w3-cyan w3-margin-top w3-padding w3-round-large w3-card-4"
          style={{ scale: 0, fontFamily: "Arial", scaleX: scaleHeight }}
        >
          <tr className="w3-border-bottom w3-black w3-round-large">
            <td>Artist</td>
            <td style={{ textAlign: "right" }}>
              {edittingActive && (
                <input
                  onChange={(e) => {
                    updateArtistName(e.target.value);
                  }}
                  style={{
                    textAlign: "right",
                    border: `${nameExistsErrorBorder}px solid red`,
                  }}
                  defaultValue={artistName}
                />
              )}
              {!edittingActive && `${artistName}`}
            </td>
          </tr>
          <tr className="w3-border-bottom">
            <td>Streams</td>
            <td style={{ textAlign: "right" }}>{i.streams}</td>
          </tr>
          <tr className="w3-border-bottom">
            <td>Rate</td>
            <td style={{ textAlign: "right" }}>
              {edittingActive && (
                <input
                  min={0}
                  onChange={(e) => {
                    updateCurrentRate(e.target.value);

                    if (!Number.isNaN(parseFloat(e.target.value))) {
                      updateCurrentAvg(
                        getMonthlyAverage(parseFloat(e.target.value))
                      );
                    }
                  }}
                  type="number"
                  step={0.001}
                  style={{ textAlign: "right" }}
                  defaultValue={currentRate}
                />
              )}
              {!edittingActive && `${currentRate}`}
            </td>
          </tr>
          <tr className="w3-border-bottom">
            <td>Monthly Average</td>
            <td style={{ textAlign: "right" }}>{"$" + currentAvg}</td>
          </tr>

          <tr className="w3-border-bottom">
            <td>Status</td>
            <td style={{ textAlign: "right", paddingLeft: 50 }}>
              <PaymentStatus id={i.id} />
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "center" }}>
              {!edittingActive && (
                <div
                  onClick={() => {
                    setEditingStatus(true);
                  }}
                  className="w3-button w3-black w3-small w3-round-large "
                >
                  edit
                </div>
              )}

              {edittingActive && (
                <div
                  onClick={saveEdited}
                  className="w3-button w3-green w3-small w3-round-large "
                >
                  save
                </div>
              )}
            </td>
            <td style={{ textAlign: "center" }}>
              {" "}
              {!edittingActive && (
                <div
                  onClick={deletion}
                  className="w3-button w3-black w3-small w3-round-large "
                >
                  delete
                </div>
              )}
              {edittingActive && (
                <div
                  onClick={() => {
                    setEditingStatus(false);
                    updateArtistName(i.artist);
                    updateCurrentAvg(getMonthlyAverage(parseFloat(i.rate)));
                    updateCurrentRate(i.rate);
                    setNameErrorBorder(0);
                  }}
                  className="w3-button w3-black w3-small w3-round-large "
                >
                  cancel
                </div>
              )}
            </td>
          </tr>
        </motion.table>
      )}
    </>
  );
};

export default React.memo(ListItemMobile);
