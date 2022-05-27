import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  notification: null,
};

const findBooksSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    getSearchResults(state, action) {
      const searchData = action.payload;

      // Transformation logic for maping fetched data to array of objects
      const searchResults = [];

      searchData.docs.forEach((item) => {
        searchResults.push({
          id: item.key,
          author: item.author_name,
          title: item.title,
          published: item.first_publish_year,
          cover: item.cover_i || [],
          subject: item.subject,
        });
      });

      state.searchResults = searchResults;
    },

    showPendingStatus(state, action) {
      state.notification = {
        status: "pending",
        title: "Finding books...",
        message: "Your books will be here soon!",
      };
    },

    removeNotification(state, action) {
      state.notification = null;
    },
  },
});

export const findBooksActions = findBooksSlice.actions;

export default findBooksSlice;
