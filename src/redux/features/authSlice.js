import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, signUp } from "../api";

export const login = createAsyncThunk("auth/signin", async ({ inputs, navigate, toast }, { rejectWithValue }) => {
  try {
    const response = await signIn(inputs);
    toast.success("Login Successfully");
    navigate("/");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const register = createAsyncThunk("auth/signup", async ({ inputs, navigate, toast }, { rejectWithValue }) => {
  try {
    const response = await signUp(inputs);
    toast.success("Register Successfully");
    navigate("/");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  reducers: {
    setUserLogin: (state, action) => {
      state.user = action.payload;
    },
    setUserLogout: (state) => {
      state.user = null;
      localStorage.clear();
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("user-profile", JSON.stringify({ ...action.payload }));
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("user-profile", JSON.stringify({ ...action.payload }));
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setUserLogin, setUserLogout } = authSlice.actions;
export default authSlice.reducer;
