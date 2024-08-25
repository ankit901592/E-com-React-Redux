import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SignupData: [
    {
      Name: "ankit",
      email: "ankitchakraborty24@gmail.com",
      password: "12345678",
    },
  ],
  currentUser: null, // This will store the current logged-in user's data
  LoggedIn: false, // Boolean to track the login status
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, action) => {
      // console.log(action.payload);
      
      const user = state.SignupData.find(
        (i) => i.email === action.payload.email && i.password === action.payload.password
      );
      
      // console.log(user);
      
      if (user) {

        state.currentUser = user;
        state.LoggedIn = true;
      }
    },
    signup: (state, action) => {
      console.log(action.payload);
      
      state.SignupData.push(action.payload);
    },
    logout: (state) => {
      state.currentUser = null;
      state.LoggedIn = false;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { login, signup, logout } = authSlice.actions;
export const authSelector = (state) => state.authReducer;
