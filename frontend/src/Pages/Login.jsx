import LoginCard from "../Components/LoginCard";

import {AiFillAccountBook, AiOutlineStock} from 'react-icons/ai';

import {RiAdminLine} from 'react-icons/ri';
import {GiHumanPyramid} from 'react-icons/gi';

import useMediaQuery from "use-mediaquery";



const Login =(props)=>{ 

    const isPc = useMediaQuery("(min-width:700px)");

    const styles= isPc?  {display:"flex", justifyContent:"center"}: {} ;




return (<div id="loginContainer">

<div style={{fontFamily:'Carter One', marginTop:150, fontSize:20, color:'cyan'}} className="w3-center">Choose Your Department</div>

<div className="w3-display-middle" style={{display:"flex", flexDirection:'row' }}>

<div style={styles}>
<LoginCard login={props.login} department="Accounting"> <AiFillAccountBook size={150}/>  </LoginCard>
<LoginCard login={props.login} department="Marketing"><AiOutlineStock size={150}/></LoginCard>
</div>

<div style={styles}>
<LoginCard login={props.login} department="Admin"><RiAdminLine size={150} /></LoginCard>
<LoginCard  login={props.login} department="Human Resources"> <GiHumanPyramid size={150} /></LoginCard>
</div>
</div></div>);
}

export default Login;