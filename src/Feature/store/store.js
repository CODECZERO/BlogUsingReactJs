import {configureStore} from "@reduxjs/toolkit";
import AuthSlices from "./authSlice"

const store=configureStore({
    reducer:{
        Auth:AuthSlices,
        
    }
})

export default store;