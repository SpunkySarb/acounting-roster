
import {BiTimeFive} from 'react-icons/bi';

import {motion} from 'framer-motion';
import { useMutation } from '@apollo/client';
import { UPDATE_PAYMENT_STATUS } from '../../../../../graphql/Mutations';



const NotPaid =(props)=>{ 


    const [updatePaymentStatus, {data, loading, error}] = useMutation(UPDATE_PAYMENT_STATUS);
   

 

    const markPaid = ()=>{

        props.changeStatus();
        updatePaymentStatus({variables:{paymentData:{id:props.id, status:true}}});
      

    }


return (<motion.div  whileHover={{scale:1.5, transition:0.7}} whileInView={{scale:1.3}} onClick={markPaid} className='w3-white w3-round-large w3-text-red w3-small w3-button' style={{display:'flex', justifyContent:'space-around',  alignItems:'center', width:70, padding:2}}>
<div style={{fontWeight:'bolder'}} >pending</div>
<BiTimeFive size={15} color='red' />


</motion.div>);
}

export default NotPaid;