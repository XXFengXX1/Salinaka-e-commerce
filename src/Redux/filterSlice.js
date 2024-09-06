import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name:'filterSlice',
    initialState:[false],
    reducers:{
        setFilter:(state)=>{
            state[0] = !state[0]
        }
    }
})

export const {setFilter} = filterSlice.actions
export default filterSlice.reducer  
