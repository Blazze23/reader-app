import { Routes, Route } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Layout from "./components/Layout/Layout";
import ReadingList from "./pages/ReadingList";
import FindBooks from "./pages/FindBooks";
import Notification from "./components/UI/Notificaiton";
import { useDispatch, useSelector } from "react-redux";
import { readingActions } from "./store/reading-slice";
import BookDetails from "./pages/BookDetails";

function App() {
  const dispatch = useDispatch();
  const readingNotification = useSelector(
    (state) => state.reading.notification
  );
  const searchNotification = useSelector((state) => state.search.notification);

  useEffect(() => {
    // Clearing notifications after 2 seconds
    setTimeout(() => {
      dispatch(readingActions.clearNotification());
    }, 2000);
  }, [dispatch, readingNotification]);

  return (
    <Fragment>
      {readingNotification && (
        <Notification
          status={readingNotification.status}
          title={readingNotification.title}
          message={readingNotification.message}
        />
      )}
      {searchNotification && (
        <Notification
          status={searchNotification.status}
          title={searchNotification.title}
          message={searchNotification.message}
        />
      )}
      <Layout>
        <Routes>
          <Route path="/" element={<ReadingList />} />
          <Route path="/findbooks" element={<FindBooks />} />
          <Route path="/bookdetails/*" element={<BookDetails />} />
        </Routes>
      </Layout>
    </Fragment>
  );
}

export default App;
