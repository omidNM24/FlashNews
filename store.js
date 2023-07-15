import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trendingArticles: [],
};

export const mainState = createSlice({
  name: "mainState",
  initialState,
  reducers: {
    saveTrendingArticles: (state, action) => {
      state.trendingArticles.push(action.payload.trendingArticles);
    },
  },
});

export const { saveTrendingArticles } = mainState.actions;

export default mainState.reducer;
