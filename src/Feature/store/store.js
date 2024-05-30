import {configureStore} from "@reduxjs/toolkit";
import AuthSlices from "./authSlice"
import PostSlice from "./postSlice";

const store=configureStore({
    reducer:{
        Auth:AuthSlices,
        Post:PostSlice,
        
    }
})

export default store;