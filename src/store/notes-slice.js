import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  showNoteForm: false,
};

const NOTES_STATE_KEY = "notes-list";

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // Reducer function for loading Notes from local storage after reload of the page
    getNotes(state, action) {
      if (!localStorage.getItem(NOTES_STATE_KEY)) {
        state.notes = [];
      } else {
        const notesList = JSON.parse(localStorage.getItem(NOTES_STATE_KEY));
        state.notes = notesList;
      }
    },

    //  Reducer function for adding new note
    addNewNote(state, action) {
      const newNote = action.payload;
      state.notes.push({
        id: newNote.id,
        text: newNote.text,
      });

      //   //  Saving Notes to Local Storage to keep data on reloads
      localStorage.setItem(NOTES_STATE_KEY, JSON.stringify(state.notes));
    },

    // // Reducer function for removing note
    removeNote(state, action) {
      const id = action.payload;
      state.notes = state.notes.filter((note) => note.id !== id);

      //   //  Remove local storage memory if there are no more Notes in the notes list
      if (state.notes.length === 0) {
        localStorage.removeItem(NOTES_STATE_KEY);
      } else {
        localStorage.setItem(NOTES_STATE_KEY, JSON.stringify(state.notes));
      }
    },

    // Reducer function for toggling Notes Form
    toggleNoteForm(state, action) {
      state.showNoteForm = !state.showNoteForm;
    },
  },
});

export const notesActions = notesSlice.actions;

export default notesSlice;
