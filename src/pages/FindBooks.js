import { useDispatch, useSelector } from "react-redux";
import { findBooksActions } from "../store/findBooks-slice";
import Card from "../components/UI/Card";
import BooksList from "../components/FindBooks/BooksList";
import classes from "./FindBooks.module.css";
import FindBooksForm from "../components/FindBooks/FindBooksForm";

const FindBooks = (props) => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.search.searchResults);

  // Fetching query data from the API
  const findBooksHandler = (queryData) => {
    // Setting pending status
    dispatch(findBooksActions.showPendingStatus());
    fetch(
      `http://openlibrary.org/search.json?q=${queryData}&mode=everything.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Remove pending status
        dispatch(findBooksActions.removeNotification());
        // Transforming fetched data and saving it to the store
        dispatch(findBooksActions.getSearchResults(data));
      });
  };
  return (
    <section className={classes.search}>
      <h2>Find Your Favorite Books</h2>
      <Card>
        <FindBooksForm onSearch={findBooksHandler} />
      </Card>
      <BooksList searchResults={searchResults} />
    </section>
  );
};

export default FindBooks;
