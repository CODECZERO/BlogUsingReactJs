import { createSlice } from "@reduxjs/toolkit";

const initialState={
    staus:false,
    PostData:null
}

const PostSlice=createSlice({
    name:"Post",
    initialState,
    reducers:{
        addPost:(state,action)=>{
            state.staus=true;
            state.PostData=action.payload.PostData;
        },
        removePost:(state)=>{
            state.staus=false;
            state.PostData=null;
        }
    }
})

export const {addPost,removePost}=PostSlice.actions; 
export default PostSlice.reducer;