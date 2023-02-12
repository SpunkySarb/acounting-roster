import List from "./PayoutsComponents/List";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "@apollo/client";
import { GET_DATA } from "../../../graphql/Queries";
import { useEffect, useRef, useState } from "react";
import { ADD_ARTIST } from "../../../graphql/Mutations";
import ArtistExists from "../../Errors/ArtistExists";
import ReactDOM from "react-dom";
import useMediaQuery from "use-mediaquery";
import PayoutsMobile from "./Mobile/PayoutsMobile";
const Payouts = () => {
  const { loading, data, error, refetch } = useQuery(GET_DATA);
  const [showData, setDataVisibility] = useState(false);
  const [listData, updateList] = useState([]);
  const [newList, updateNewList] = useState([]);

  const [artistBorder, setArtistBorder] = useState(0);
  const [rateBorder, setRateBorder] = useState(0);
  const [addArtist] = useMutation(ADD_ARTIST);

  const [artistExistsError, setArtistExistError] = useState(false);

  const [filteredList, updateFilteredList] = useState([]);
  const [filteredNewList, updateFilteredNewList] = useState([]);

  const isPc = useMediaQuery("(min-width:800px)");
  const isTablet = !useMediaQuery("(min-width:1000px)");

  const artistRef = useRef();
  const rateRef = useRef();

  const validateNewArtist = () => {
    const artist = artistRef.current.value;
    const rate = rateRef.current.value;

    if (artist.trim() === "") {
      setArtistBorder(2);
    } else if (Number.isNaN(parseFloat(rate))) {
      setRateBorder(2);
    } else {
      setArtistBorder(0);
      setRateBorder(0);
    }
  };

  const addNewArtist = async (artist, rate) => {
    
    let status = false;

    if (artist.trim() === "") {
      setArtistBorder(3);
    } else if (Number.isNaN(parseFloat(rate))) {
      setRateBorder(3);
    } else {
      setArtistBorder(0);
      setRateBorder(0);

    await addArtist({
        variables: { artistInfo: { artist: artist, rate: parseFloat(rate) } },
      })
        .then((artist) => {
          updateNewList((prev) => [artist.data.addArtist, ...prev]);
          updateFilteredNewList((prev) => [artist.data.addArtist, ...prev]);
          status= true;
          if(!!artistRef.current && !!rateRef.current){
            artistRef.current.value = "";
            rateRef.current.value = 0.0;
  
          }
          
         
        })
        .catch((err) => {
          
          setArtistExistError(true);
          status= false;
        });
    }
 
    return status;
 
  };

  const searchList = (text) => {
    updateFilteredList(
      listData.filter((i) => {
        return (i.artist + "")
          .trim()
          .toLowerCase()
          .includes((text + "").toLowerCase().trim());
      })
    );

    updateFilteredNewList(
      newList.filter((i) => {
        return (i.artist + "")
          .trim()
          .toLowerCase()
          .includes((text + "").toLowerCase().trim());
      })
    );
  };



  






  useEffect(() => {
    if (!loading) {
      updateList(data.getData);
      updateFilteredList(data.getData);
      
    }

    refetch()
      .then(() => {
        setDataVisibility(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [loading]);

  if (!isPc) {
    return (
      <PayoutsMobile loading={loading}
      listData={filteredList}
      error={error}
      showData={showData}
      newList={newList}
      searchList={searchList}
      addNewArtist={addNewArtist} />
    );
  }

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
            <motion.input
              whileHover={{ scale: 1.02 }}
              style={{ maxWidth: "250px" }}
              onChange={(e) => {
                searchList(e.target.value);
              }}
              className="w3-input w3-padding w3-border w3-card-4 w3-border-xxlarge w3-round-xlarge"
              placeholder="Search Artist"
            />
            <div style={{ display: "flex", flexDirection: "row", marginLeft:10 }}>
              <motion.input
                ref={artistRef}
                onChange={validateNewArtist}
                whileHover={{ scale: 1.02 }}
                style={{
                  maxWidth: "200px",
                  border: `${artistBorder}px solid red`,
                }}
                className="w3-input w3-padding  w3-card-4  w3-round-xlarge w3-margin-right"
                placeholder="Artist's Name.."
              />
              <motion.input
                ref={rateRef}
                type="number"
                step={0.005}
                min={0}
                
                onChange={validateNewArtist}
                whileHover={{ scale: 1.02 }}
                style={{
                  maxWidth: "200px",
                  border: `${rateBorder}px solid red`,
                }}
                className="w3-input w3-padding w3-margin-right  w3-card-4  w3-round-xlarge"
                placeholder="Artist's Rate.."
              />

              <motion.div
                onClick={()=>{addNewArtist(artistRef.current.value, rateRef.current.value);}}
                whileHover={{ scale: 1.1 }}
                style={{ fontFamily: "Carter One" }}
                className="w3-button w3-cyan w3-round-xlarge w3-card-4"
              >
                {isTablet ? 'Add': 'Add New Artist'}
              </motion.div>
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
            <List
              loading={loading}
              listData={filteredList}
              error={error}
              showData={showData}
              newList={filteredNewList}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Payouts;
