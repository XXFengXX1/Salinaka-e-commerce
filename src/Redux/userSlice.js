import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'userSlice',
    initialState:{
        username:'',
        email:'',
        isSignIn:false

    },
    reducers:{
        setSignInState:(state,action)=>{
            return {username:action.payload?.name,email:action.payload?.email,isSignIn:!state.isSignIn}
        }

    }
})

export const {setSignInState} = userSlice.actions
export default userSlice.reducer