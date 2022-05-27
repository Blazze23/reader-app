import { useDispatch } from "react-redux";
import { readingActions } from "../../store/reading-slice";
import Card from "../UI/Card";
import classes from "./BookItem.module.css";

const BookItem = (props) => {
  const dispatch = useDispatch();
  const { title, id, author, published, subject } = props;

  //  Adding Book to My Reading List
  const addToLMyistHandler = () => {
    dispatch(
      readingActions.addToReadingList({ title, id, author, published, subject })
    );
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes["item-info"]}>
          <header>
            <h3>{title}</h3>
          </header>
          <p className={classes.author}>by {author}</p>
          <p className={classes.published}>First published in {published}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={addToLMyistHandler}>Add to reading list</button>
        </div>
      </Card>
    </li>
  );
};

export default BookItem;
