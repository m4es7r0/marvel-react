import { createSlice } from "@reduxjs/toolkit";
import marvel from "../api/marvel.api";

const comicsSlice = createSlice({
  name: "comics",
  initialState: {
    comicsList: [],
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        marvel.endpoints.getComics.matchFulfilled,
        (state, action) => {
          state.comicsList = [...state.comicsList, ...action.payload];
        }
      )
      .addDefaultCase(() => {});
  },
});

export default comicsSlice.reducer;
