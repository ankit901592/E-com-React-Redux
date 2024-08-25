import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from '../redux/reducers/productreducers'; 
import { cartReducer } from '../redux/reducers/ItemcartReducers'
import { authReducer } from "./reducers/Auth.Reducers";

export const store = configureStore({
    reducer: {
        product:productReducer,  
       cartReducer,
       authReducer  
    }
});
