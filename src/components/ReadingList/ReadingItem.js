import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { readingActions } from "../../store/reading-slice";
import Card from "../UI/Card";
import classes from "./ReadingItem.module.css";

const ReadingItem = (props) => {
  const dispatch = useDispatch();
  const { title, id, author, published, isCompleted } = props;

  const removeFromMyListHandler = () => {
    dispatch(readingActions.removeFromReadingList(id));
  };

  const addToCompletedHandler = () => {
    dispatch(readingActions.markAsDone(id));
  };

  let cssCompleted;

  if (!isCompleted) {
    cssCompleted = classes["not-completed"];
  } else {
    cssCompleted = classes.completed;
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes["item-info"]}>
          <header>
            <Link to={`/bookdetails${id}`}>{title}</Link>
          </header>
          <p className={classes.author}>by {author}</p>
          <p className={classes.published}>First published in {published}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={removeFromMyListHandler}>
            Remove from my reading list
          </button>
          <button className={cssCompleted} onClick={addToCompletedHandler}>
            {!isCompleted ? <span>Mark as done</span> : <span>Completed!</span>}
          </button>
        </div>
      </Card>
    </li>
  );
};

export default ReadingItem;
