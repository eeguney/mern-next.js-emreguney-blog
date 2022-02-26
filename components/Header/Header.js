import { useState } from "react";
import { Icon } from "../UI/Icon";
import { useDispatch } from "react-redux";
import { drawerToggle, searchToggle } from "../../store/settingsSlice";
import style from "../../styles/Header.module.css";

export const Header = () => {
  const dispatch = useDispatch();
  const [clicked, setclicked] = useState(false);
  return (
    <header id={style.header}>
      <nav>
        <button
          type="button"
          className={`likeRipple ${style.menuButton} ${
            clicked == true ? style.clicked : ""
          }`}
          onClick={() => {
            dispatch(drawerToggle());
            setclicked(!clicked);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <button type="button" className={`${style.searchButton} likeRipple`}  onClick={() => {
            dispatch(searchToggle());
          }}>
          <Icon.Search size="25" />
        </button>
      </nav>
    </header>
  );
};
