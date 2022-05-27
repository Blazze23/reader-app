import BookItem from "./BookItem";
import classes from "./BookList.module.css";

const BooksList = (props) => {
  return (
    <ul className={classes.list}>
      {props.searchResults.map((item) => (
        <BookItem
          key={item.id}
          id={item.id}
          title={item.title}
          subject={item.subject}
          author={item.author}
          published={item.published}
          cover={item.cover}
        />
      ))}
    </ul>
  );
};

export default BooksList;
