import { useRef } from "react";
import classes from "./FindBooksForm.module.css";

const FindBooksForm = (props) => {
  const searchInputRef = useRef();

  // Collecting query data from input and passing it to parent component
  const findBooksHandler = (event) => {
    event.preventDefault();

    const enteredQuery = searchInputRef.current.value;

    props.onSearch(enteredQuery);
  };

  return (
    <form className={classes.form} onSubmit={findBooksHandler}>
      <div className={classes.control}>
        <input
          id="searchBar"
          placeholder="Search..."
          type="text"
          ref={searchInputRef}
        />
      </div>
      <div className={classes.actions}>
        <button>Find Books</button>
      </div>
    </form>
  );
};

export default FindBooksForm;
