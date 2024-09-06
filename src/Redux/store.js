import { configureStore } from "@reduxjs/toolkit";

import shoppingSliceReducer from './shoppingSlice'
import meanuSliceReducer from "./meanuSlice";
import filterSliceReducer from "./filterSlice";
import userSliceReducer from "./userSlice";

export const store = configureStore({
    reducer:{
        shoppingSlice:shoppingSliceReducer,
        meanuSlice:meanuSliceReducer,
        filterSlice:filterSliceReducer,
        userSlice:userSliceReducer
    }
})