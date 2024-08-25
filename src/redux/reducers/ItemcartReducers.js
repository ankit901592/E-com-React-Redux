import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  total:0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleAdd: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.qty += 1;  // Increment the quantity if the item exists
      } else {
        state.cart.push({ ...action.payload, qty: 1 }); // Add new item with a quantity of 1
      }
},
    delete: (state, action) => {
      console.log(action.payload);
     state.cart = state.cart.filter(item=>item.id!==action.payload);
    },
    calculateTotal:(state,action)=>{
      state.total = state.cart.reduce((acc, item) => acc + item.price * item.qty, 0)
      
    }
  
}
});

export const cartReducer = cartSlice.reducer;
export const { handleAdd, delete: deleteItem,calculateTotal } = cartSlice.actions;
export const cartSelector = (state) =>{  
   return state.cartReducer};
