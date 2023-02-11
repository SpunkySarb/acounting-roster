





const ListDataField =(props)=>{ 






return (<div  style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: 10,
  }}>

<div style={{color:'white', fontSize:25, fontWeight:'200', textAlign:'center'}}>{props.value}</div>
<div style={{color:'white', fontSize:10, fontWeight:'bolder', textAlign:'center'}}>{props.title}</div>





</div>);
}

export default ListDataField;