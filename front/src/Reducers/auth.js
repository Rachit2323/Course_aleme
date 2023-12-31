import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// const API="https://ins01.onrender.com/";
// frontend  charming-belekoy-1d7e17
const API = "http://localhost:4000/";
const initialState = {
  loading: false,
  errorsignup: "",
  errorsignin: "",
  successsignin: false,
  successsignup: false,
  isAuth:false,
};

export const signupUser = createAsyncThunk("signupuser", async (body) => {
  try {

    const result = await fetch(`${API}auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await result.json();


    return data;
  } catch (error) {
    return { error: error.message };
  }
});

export const signinUser = createAsyncThunk("signinuser", async (body) => {
  try {
    const result = await fetch(`${API}auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await result.json();
    const { token } = data;

    localStorage.setItem("token", token);


    return data;
  } catch (error) {
    return { error: error.message }; 
  }
});

const authReducer = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.loading = false;

      if (action.payload.error) {
        // state.errorsignup = action.payload.error;
        state.successsignup = action.payload.success;
      } else {
        state.errorsignup = action.payload.message;
        state.successsignup = action.payload.success;
      }
    },
    [signupUser.pending]: (state) => {
      state.loading = true;
      state.successsignup = false;
    },
    [signupUser.rejected]: (state) => {
      state.loading = true;
      state.successsignup = false;
    },

    [signinUser.fulfilled]: (state, action) => {
      state.loading = false;

      if (action.payload.error) {
        state.errorsignin = action.payload.error;
        state.successsignin = action.payload.success;
      } else {
        state.errorsignin = action.payload.message;
        state.successsignin = action.payload.success;
        state.isAuth=true;
      }
    },
    [signinUser.pending]: (state) => {
      state.loading = true;
      state.successsignin = false;
    },
    [signinUser.rejected]: (state) => {
      state.loading = true;
      state.successsignin = false;
    },
  },
});

export default authReducer.reducer;