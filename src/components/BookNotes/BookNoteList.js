import Card from "../UI/Card";
import BookNote from "./BookNote";
import classes from "./BookNoteList.module.css";

const BookNoteList = (props) => {
  let content;

  if (props.notes.length === 0) {
    content = (
      <p className={classes.empty}>
        This book has no notes. Try creating some! 😏
      </p>
    );
  } else {
    content = (
      <ul className={classes.notes}>
        {props.notes.map((note) => (
          <BookNote id={note.id} text={note.text} key={note.id} />
        ))}
      </ul>
    );
  }
  return <Card>{content}</Card>;
};

export default BookNoteList;
