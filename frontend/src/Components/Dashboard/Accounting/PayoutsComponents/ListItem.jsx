import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import ArtistBadge from "./Badges/ArtistBadge";
import PaymentStatus from "./PaymentStatus";
import React from "react";
import DeleteWarning from "../../../Warnings/DeleteWarning";
import ReactDOM from "react-dom";
import { useMutation } from "@apollo/client";
import { DELETE_ARTIST, EDIT_ARTIST } from "../../../../graphql/Mutations";

const ListItem = (props) => {
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
        <motion.tr
          style={{ scaleY: scaleHeight }}
          key={i.id}
          whileHover={{ backgroundColor: "gray", color: "white" }}
        >
          <motion.td whileInView={{ scaleX: 1 }} style={{ scaleX: 0 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ArtistBadge artist={artistName} />
              {edittingActive && (
                <>
                  {" "}
                  <input
                    onChange={(e) => {
                      updateArtistName(e.target.value);
                    }}
                    className="w3-input w3-round-xlarge w3-center"
                    style={{
                      maxWidth: "200px",
                      border: `${nameExistsErrorBorder}px solid red`,
                    }}
                    defaultValue={artistName}
                  />
                  <br />
                  {nameExistsErrorBorder === 2 && (
                    <span
                      className="  w3-center w3-small"
                      style={{ color: "white" }}
                    >
                      already exists...
                    </span>
                  )}
                </>
              )}
              {!edittingActive && (
                <span style={{ fontSize: 20, fontWeight: "200" }}>
                  {" "}
                  {(artistName + "").slice(0, 15) +
                    ((artistName + "").length > 15 ? "..." : "")}
                </span>
              )}
            </div>
          </motion.td>
          <motion.td
            whileInView={{ scale: 1, transition: "2s" }}
            style={{ scale: 0 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: "200",
              }}
            >
              {i.streams}
            </div>
          </motion.td>
          <td>
            {edittingActive && (
              <input
                onChange={(e) => {
                  updateCurrentRate(e.target.value);

                  if (!Number.isNaN(parseFloat(e.target.value))) {
                    updateCurrentAvg(
                      getMonthlyAverage(parseFloat(e.target.value))
                    );
                  }
                }}
                className="w3-input w3-round-xlarge w3-center"
                min={0}
                type="number"
                step={0.001}
                style={{ maxWidth: "200px" }}
                defaultValue={currentRate}
              />
            )}
            {!edittingActive && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: "200",
                }}
              >
                {currentRate}
              </div>
            )}
          </td>
          <motion.td
            whileInView={{ scaleY: 1, transition: "2s" }}
            style={{ scaleY: 0 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: "200",
              }}
            >
              {"$" + currentAvg}
            </div>
          </motion.td>
          <td>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              {!edittingActive && (
                <motion.div
                  onClick={() => {
                    setEditingStatus(true);
                  }}
                  className="w3-button w3-round-xlarge w3-margin-right w3-blue"
                >
                  <GrEdit size={20} />
                </motion.div>
              )}
              {edittingActive && (
                <>
                  <motion.div
                    onClick={saveEdited}
                    className="w3-button w3-text-black w3-round-xlarge w3-margin-right w3-blue"
                  >
                    save
                  </motion.div>{" "}
                  <motion.div
                    onClick={() => {
                      setEditingStatus(false);
                      updateArtistName(i.artist);
                      updateCurrentAvg(getMonthlyAverage(parseFloat(i.rate)));
                      updateCurrentRate(i.rate);
                      setNameErrorBorder(0);
                    }}
                    className="w3-button  w3-round-xlarge w3-margin-right w3-black"
                  >
                    cancel
                  </motion.div>
                </>
              )}
              {!edittingActive && (
                <motion.div
                  className="w3-button w3-round-xlarge w3-red"
                  onClick={deletion}
                >
                  <MdDelete size={20} />
                </motion.div>
              )}
            </div>
          </td>
          <td>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <PaymentStatus id={i.id} status={i.status} />
            </div>
          </td>
        </motion.tr>
      )}
    </>
  );
};

export default React.memo(ListItem);
