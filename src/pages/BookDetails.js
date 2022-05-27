import Card from "../components/UI/Card";
import classes from "./BookDetails.module.css";
import { useParams } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readingActions } from "../store/reading-slice";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import BookNoteForm from "../components/BookNotes/BookNoteForm";
import { notesActions } from "../store/notes-slice";
import BookNoteList from "../components/BookNotes/BookNoteList";

const BookDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const selectedBook = useSelector((state) => state.reading.selectedBook);
  const showNoteForm = useSelector((state) => state.notes.showNoteForm);
  const notes = useSelector((state) => state.notes.notes);

  // React router 6 does not support "/" in parameter name
  // See: https://reactrouter.com/docs/en/v6/upgrading/v5#note-on-route-path-patterns
  const bookId = params["*"];

  // Fetching Reading List from Loacal Storage
  useEffect(() => {
    dispatch(readingActions.getMyReadingList());
  }, [dispatch]);

  // Fetching selected Book from Reading List
  useEffect(() => {
    dispatch(readingActions.getBookDetails(`/${bookId}`));
  }, [dispatch, bookId]);

  //  Fetching Notes from Local storage
  useEffect(() => {
    dispatch(notesActions.getNotes());
  }, [dispatch]);

  //  Marking Book as Completed
  const addToCompletedHandler = () => {
    dispatch(readingActions.markAsDone(`/${bookId}`));
    console.log("PROMENIO");
  };

  //  Toggle Note Handler
  const createNoteHandler = () => {
    dispatch(notesActions.toggleNoteForm());
  };

  //  Add New Book Note
  const addNoteHandler = (note) => {
    dispatch(
      notesActions.addNewNote({
        text: note,
        id: (Math.random() * 100).toString(),
      })
    );

    // Hiding Note Form on Submit
    dispatch(notesActions.toggleNoteForm());
  };

  let content;

  if (!selectedBook) {
    content = (
      <Fragment>
        <LoadingSpinner />
        <p>Loading Book Details...</p>
      </Fragment>
    );
  } else {
    // Setting Css Class for Mark as Done button
    let cssCompleted;

    if (!selectedBook.isCompleted) {
      cssCompleted = classes["not-completed"];
    } else {
      cssCompleted = classes.completed;
    }

    content = (
      <div className={classes.item}>
        <div className={classes["item-info"]}>
          <header>
            <h3>{selectedBook.title}</h3>
          </header>
          <p className={classes.author}>by {selectedBook.author}</p>
          <p className={classes.published}>
            First published in {selectedBook.published}
          </p>
          <p className={classes.subject}>{selectedBook.subject}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={createNoteHandler}>Create Note</button>
          <button className={cssCompleted} onClick={addToCompletedHandler}>
            {!selectedBook.isCompleted ? (
              <span>Mark as done</span>
            ) : (
              <span>Completed!</span>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <Card>{content}</Card>
      {showNoteForm && <BookNoteForm onAddBookNote={addNoteHandler} />}
      {notes && <BookNoteList notes={notes} />}
    </Fragment>
  );
};

export default BookDetails;
