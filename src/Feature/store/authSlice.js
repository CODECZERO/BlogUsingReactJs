import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null
}

const AuthSlices=createSlice({
    name:"Auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=ture;
            state.userPayload=action.payload.userPayload;
        },
        logout:(state)=>{
            state.status=false;
            state.userPayload=null;
        }
    }
})


export const {login,logout}=AuthSlices.actions;
export default AuthSlices.reducer;