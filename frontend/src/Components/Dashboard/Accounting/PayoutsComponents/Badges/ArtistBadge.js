



import { faker } from "@faker-js/faker";
import React from 'react';


const ArtistBadge =(props)=>{ 






return (<div
    className={`w3-badge  w3-padding`}
    style={{
      color: "white",
      fontSize: 20,
      fontWeight: "200",
      backgroundColor: faker.internet.color(),
      width: 30,
      height: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight:10,padding:5
    }}
  >
    {props.artist.split(" ").map((i,index) => {if(index<2) return (i + "").charAt(0).toUpperCase()})}
  </div>);
}

export default React.memo(ArtistBadge);