import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  return (
    <header>
      <nav className={classes.nav}>
        <h3 className={classes.logo}>Reader</h3>
        <ul>
          <li>
            <NavLink
              to="/"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              My Reading List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/findbooks"
              className={(navData) => (navData.isActive ? classes.active : "")}
            >
              Find Books
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
