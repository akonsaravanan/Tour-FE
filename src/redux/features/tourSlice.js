import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTour,
  getTours,
  getSingleTour,
  getToursByUser,
  updateTour,
  deleteTour,
  getToursBySearch,
  getToursByTag,
  getRelatedToursByTag,
  getLikeTours,
} from "../api";

export const createNewTour = createAsyncThunk("tour/createNewTour", async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
  try {
    const response = await createTour(updatedTourData);
    toast.success("Tour Created Successfully");
    navigate("/");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const getAllTours = createAsyncThunk("tour/getAllTours", async (page, { rejectWithValue }) => {
  try {
    const response = await getTours(page);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const getSingleTourData = createAsyncThunk("tour/getSingleTourData", async (tourId, { rejectWithValue }) => {
  try {
    const response = await getSingleTour(tourId);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const updateUserTour = createAsyncThunk("tour/updateTour", async ({ id, updatedTourData, toast, navigate }, { rejectWithValue }) => {
  try {
    const response = await updateTour(updatedTourData, id);
    toast.success("Tour updated Successfully");
    navigate("/");
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const deleteUserTour = createAsyncThunk("tour/deleteTour", async ({ tourId, toast, navigate }, { rejectWithValue }) => {
  try {
    const response = await deleteTour(tourId);
    toast.success("Tour deleted Successfully");
    // window.location.reload();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getUserTours = createAsyncThunk("tour/getUserTours", async (userId, { rejectWithValue }) => {
  try {
    const response = await getToursByUser(userId);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const getAllToursBySearch = createAsyncThunk("tour/getToursBySearch", async (tourTitle, { rejectWithValue }) => {
  try {
    const response = await getToursBySearch(tourTitle);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const getAllToursByTag = createAsyncThunk("tour/getToursByTag", async (tag, { rejectWithValue }) => {
  try {
    const response = await getToursByTag(tag);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const getAllRelatedToursByTag = createAsyncThunk("tour/getAllRelatedToursByTag", async (tags, { rejectWithValue }) => {
  try {
    const response = await getRelatedToursByTag(tags);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const getUserLikes = createAsyncThunk("tour/getUserLikes", async (_id, { rejectWithValue }) => {
  try {
    const response = await getLikeTours(_id);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
const tourSlice = createSlice({
  name: "tour",
  initialState: {
    singletour: {},
    tours: [],
    userTours: [],
    tagTours: [],
    relatedTours: [],
    currentPage: 1,
    numOfPages: null,
    error: "",
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [createNewTour.pending]: (state) => {
      state.loading = true;
    },
    [createNewTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload;
    },
    [createNewTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getAllTours.pending]: (state) => {
      state.loading = true;
    },
    [getAllTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload;
      state.numOfPages = action.payload.noOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getAllTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getSingleTourData.pending]: (state) => {
      state.loading = true;
    },
    [getSingleTourData.fulfilled]: (state, action) => {
      state.loading = false;
      state.singletour = action.payload;
    },
    [getSingleTourData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getUserTours.pending]: (state) => {
      state.loading = true;
    },
    [getUserTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.userTours = action.payload;
    },
    [getUserTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateUserTour.pending]: (state) => {
      state.loading = true;
    },
    [updateUserTour.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action);

      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTours = state.userTours.map((item) => (item._id === id ? action.payload : item));
        state.tours = state.tours.map((item) => (item._id === id ? action.payload : item));
      }
    },
    [updateUserTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteUserTour.pending]: (state) => {
      state.loading = true;
    },
    [deleteUserTour.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { tourId },
      } = action.meta;
      console.log(action);
      if (tourId) {
        state.userTours = state.userTours.filter((item) => item._id !== tourId);
        state.tours = state.tours.filter((item) => item._id !== tourId);
      }
    },
    [deleteUserTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getAllToursBySearch.pending]: (state) => {
      state.loading = true;
    },
    [getAllToursBySearch.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload;
    },
    [getAllToursBySearch.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getAllToursByTag.pending]: (state) => {
      state.loading = true;
    },
    [getAllToursByTag.fulfilled]: (state, action) => {
      state.loading = false;
      state.tagTours = action.payload;
    },
    [getAllToursByTag.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getAllRelatedToursByTag.pending]: (state) => {
      state.loading = true;
    },
    [getAllRelatedToursByTag.fulfilled]: (state, action) => {
      state.loading = false;
      state.relatedTours = action.payload;
    },
    [getAllRelatedToursByTag.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getUserLikes.pending]: (state, action) => {
      state.loading = false;
    },
    [getUserLikes.fulfilled]: (state, action) => {
      state.loading = false;

      console.log(action.payload?.data._id);
      console.log(action.meta?.arg);
      // state.tours = state.tours?.data?.map( ( item ) => ( item._id == action.meta?.arg ? action.payload.data : item ) );
      state.tours = state.tours?.data?.map((item) => {
        if (item._id === action.payload?.data._id) {
          return action.payload;
        } else {
          return item;
        }
      });
    },
    [getUserLikes.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = tourSlice.actions;
export default tourSlice.reducer;
