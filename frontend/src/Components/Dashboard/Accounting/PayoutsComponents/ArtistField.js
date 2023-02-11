import ArtistBadge from "./Badges/ArtistBadge";








const ArtistField =(props)=>{ 


const artist = props.artist;



return (<div style={{display:"flex", flexDirection:'row', justifyContent:'center', alignItems:'center', flexWrap:'wrap' }}>
<ArtistBadge artist={artist} />
<div
  style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
   
  }}
>
  <div
    className="w3-text-white"
    style={{ fontSize: 20, fontWeight: "200" }}
  >
    {(artist + "").slice(0, 15) +
      ((artist + "").length > 15 ? "..." : "")}
  </div>

</div>
</div>);
}

export default ArtistField;