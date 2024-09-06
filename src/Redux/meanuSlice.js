import { createSlice } from "@reduxjs/toolkit";
import Shop from "../Pages/Shop/Shop";

const meanuSlice =createSlice({
    name:'meanuSlice',
    initialState:{
        Home:true,
        Shop:false,
        Featured:false,
        Recommended:false
    },
    reducers:{
        NavClick:(state,action)=>{
            for (var pop in state) {
                state[pop] =false
             }
             state[action.payload]= true
        },
        GoShop:(state)=>{
            console.log('iniaite go back to shop')
            for (var pop in state) {
                state[pop] =false
             }
             state['Shop']= true
        },
        GoRec:(state)=>{
            for (var pop in state) {
                state[pop] =false
             }
             state['Recommended']= true
        },
        GoFeatured:(state)=>{
            for (var pop in state) {
                state[pop] =false
             }
             state['Featured']= true
        },
        AllWhite:(state)=>{
            for (var pop in state) {
                state[pop] =false
            }
        }
    }
})

export const {NavClick,GoShop,GoRec,AllWhite,GoFeatured} = meanuSlice.actions
export default meanuSlice.reducer