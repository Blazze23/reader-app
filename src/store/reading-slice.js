import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  searchItems: [],
  notification: null,
  selectedBook: null,
};

const LIST_STATE_KEY = "reading-list";

const readingSlice = createSlice({
  name: "reading",
  initialState,
  reducers: {
    // Reducer function for loading Reading List from local storage after reload of the page
    getMyReadingList(state, action) {
      if (!localStorage.getItem(LIST_STATE_KEY)) {
        state.items = [];
      } else {
        const readingList = JSON.parse(localStorage.getItem(LIST_STATE_KEY));
        state.items = readingList;
      }
    },

    //   Reducer function for adding item to Reading List
    addToReadingList(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      //   1) Item already exists in the Reading list
      if (existingItem) {
        state.notification = {
          status: "error",
          title: "Error",
          message: "This item is already added to your list!",
        };
        return;
      }

      //   2) Item does NOT exist in the reading list
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          author: newItem.author,
          subject: newItem.subject,
          published: newItem.published,
          isCompleted: false,
        });

        state.notification = {
          status: "success",
          title: "Success",
          message: "Item successfully added to your list!",
        };

        // Save Reading List localy to keep the data on reloads
        localStorage.setItem(LIST_STATE_KEY, JSON.stringify(state.items));
      }
    },

    // Reducer function for removing items from the Reading list
    removeFromReadingList(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);

      //  Remove local storage memory if there are no more items in the Reading list
      if (state.items.length === 0) {
        localStorage.removeItem(LIST_STATE_KEY);
      } else {
        localStorage.setItem(LIST_STATE_KEY, JSON.stringify(state.items));
      }
    },

    // Reducer function for marking items as completed
    markAsDone(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      existingItem.isCompleted = !existingItem.isCompleted;
      state.selectedBook.isCompleted = !state.selectedBook.isCompleted;

      //  Saving marked items state to local storage
      localStorage.removeItem(LIST_STATE_KEY);
      localStorage.setItem(LIST_STATE_KEY, JSON.stringify(state.items));
    },

    // Reducer function for reseting notifications
    clearNotification(state) {
      state.notification = null;
    },

    // Reducer function for getting book details
    getBookDetails(state, action) {
      const id = action.payload;
      const bookItem = state.items.find((item) => item.id === id);
      state.selectedBook = bookItem;
    },

    // Reducer function for searching Reading List
    searchReadingList(state, action) {
      const title = action.payload;
      state.searchItems = state.items.filter((item) =>
        item.title.trim().toLowerCase().includes(title.trim().toLowerCase())
      );
    },
  },
});

export const readingActions = readingSlice.actions;

export default readingSlice;
