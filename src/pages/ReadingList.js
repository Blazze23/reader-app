import { useSelector, useDispatch } from "react-redux";
import ReadingItem from "../components/ReadingList/ReadingItem";
import classes from "./ReadingList.module.css";
import Card from "../components/UI/Card";
import { useEffect } from "react";
import { readingActions } from "../store/reading-slice";
import SearchReadingList from "../components/ReadingList/SearchReadingList";

const ReadingList = (props) => {
  const dispatch = useDispatch();
  const readigListItems = useSelector((state) => state.reading.items);
  const searchItems = useSelector((state) => state.reading.searchItems);

  // Fetching Reading List from Local Storage
  useEffect(() => {
    dispatch(readingActions.getMyReadingList());
  }, [dispatch]);

  // Search Reading List on keystroke
  const searchReadingListHandler = (bookTitle) => {
    dispatch(readingActions.searchReadingList(bookTitle));
  };

  let content;

  // No items in Reading List
  if (readigListItems.length === 0) {
    content = (
      <Card className={classes["empty-list"]}>
        <p>There are no items in your reading list. Start adding some! 😏</p>
      </Card>
    );

    // Display searched items
  } else if (searchItems.length !== 0) {
    content = (
      <ul>
        {searchItems.map((item) => (
          <ReadingItem
            key={item.id}
            id={item.id}
            title={item.title}
            subject={item.subject}
            author={item.author}
            published={item.published}
            isCompleted={item.isCompleted}
          />
        ))}
      </ul>
    );

    // Display all items in Reading List
  } else {
    content = (
      <ul>
        {readigListItems.map((item) => (
          <ReadingItem
            key={item.id}
            id={item.id}
            title={item.title}
            subject={item.subject}
            author={item.author}
            published={item.published}
            isCompleted={item.isCompleted}
          />
        ))}
      </ul>
    );
  }

  return (
    <section className={classes.list}>
      <h2>My Reading List</h2>
      <SearchReadingList onSearch={searchReadingListHandler} />
      {content}
    </section>
  );
};

export default ReadingList;
