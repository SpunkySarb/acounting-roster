import { configureStore, createSlice } from "@reduxjs/toolkit";







const dataSlice = createSlice({
    name:'dashboardSlice',
    initialState:{department:'', loggedIn:false},

    reducers:{


        setDepartmentName: (state, action)=>{

state.department=action.payload;

        },

        setLoginStatus:(state, action)=>{

            state.loggedIn = action.payload;


        }






    }
});




export const {setDepartmentName,setLoginStatus} = dataSlice.actions;



const store  = configureStore({reducer:dataSlice.reducer});


export default store;