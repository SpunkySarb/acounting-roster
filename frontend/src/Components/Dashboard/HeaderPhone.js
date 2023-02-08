import { useSelector } from "react-redux";







const HeaderPhone =()=>{ 


    const department = useSelector(state=>state.department);



return (<>
<div style={{fontFamily:'Carter One', backgroundColor:'rgba(0, 0, 0, 0.33)', color:'cyan', fontSize:20}} className="w3-container w3-card-4 w3-padding w3-center">{department} Dashboard</div>



</>);
}

export default HeaderPhone;