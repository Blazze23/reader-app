import { useRef } from "react";
import Card from "../UI/Card";
import classes from "./BookNoteForm.module.css";

const BookNoteForm = (props) => {
  const noteInputRef = useRef();

  // Collecting Note input text and passing it to parent componet
  const submitNoteHandler = (event) => {
    event.preventDefault();
    const enteredNote = noteInputRef.current.value;
    props.onAddBookNote(enteredNote);
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitNoteHandler}>
        <div className={classes.control}>
          <textarea
            id="searchBar"
            placeholder="Search..."
            type="text"
            ref={noteInputRef}
            rows={6}
          />
        </div>
        <div className={classes.actions}>
          <button>Add Note</button>
        </div>
      </form>
    </Card>
  );
};

export default BookNoteForm;
