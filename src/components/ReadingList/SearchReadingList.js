import { useState } from "react";
import Card from "../UI/Card";
import classes from "./SearchReadingList.module.css";

const SearchReadingList = (props) => {
  const [enteredInput, setEnteredInput] = useState("");

  //
  const searchChangeHandler = (event) => {
    setEnteredInput(event.target.value);

    props.onSearch(enteredInput);
  };

  return (
    <Card>
      <form className={classes.form}>
        <div className={classes.control}>
          <input
            id="searchBar"
            placeholder="Search By Title..."
            type="text"
            value={enteredInput}
            onChange={searchChangeHandler}
          />
        </div>
      </form>
    </Card>
  );
};

export default SearchReadingList;
