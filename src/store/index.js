import { configureStore } from "@reduxjs/toolkit";
import findBooksSlice from "./findBooks-slice";
import notesSlice from "./notes-slice";
import readingSlice from "./reading-slice";

const store = configureStore({
  reducer: {
    reading: readingSlice.reducer,
    search: findBooksSlice.reducer,
    notes: notesSlice.reducer,
  },
});

export default store;
