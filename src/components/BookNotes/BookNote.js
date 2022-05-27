import { useDispatch } from "react-redux";
import { notesActions } from "../../store/notes-slice";
import classes from "./BookNote.module.css";

const BookNote = (props) => {
  const dispatch = useDispatch();

  //  Remove note
  const removeNoteHandler = () => {
    dispatch(notesActions.removeNote(props.id));
  };

  return (
    <li>
      <div className={classes.note}>
        <p>{props.text}</p>
      </div>
      <div className={classes.actions}>
        <button onClick={removeNoteHandler}>Delete Note</button>
      </div>
    </li>
  );
};

export default BookNote;
