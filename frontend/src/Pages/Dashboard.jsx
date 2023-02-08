import {  Route, Routes } from "react-router-dom";
import Header from "../Components/Dashboard/Header";










const Dashboard =(props)=>{ 






return (<div>

<Header/>
<Routes>
    <Route path="/payouts" element={<><div>Here I am</div></>}/>
</Routes>


</div>);
}

export default Dashboard;