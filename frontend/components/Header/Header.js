import { useState } from "react";
import { Icon } from "../UI/Icon";
import { useDispatch, useSelector } from "react-redux";
import {
  darkmodeToggle,
  drawerToggle,
  searchToggle,
} from "../../store/settingsSlice";
import style from "../../styles/Header.module.css";

export const Header = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const [clicked, setclicked] = useState(false);

  const darkmodeToggler = () => {
    const darkmode = settings.darkMode
    dispatch(darkmodeToggle())
    localStorage.setItem("darkmode", !darkmode)
  }

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
        <div className={style.rightButtons}>
          <button
            type="button"
            className={`${style.searchButton} likeRipple`}
            onClick={() => {
              dispatch(searchToggle());
            }}
          >
            <Icon.Search size="25" />
          </button>
          <button
            type="button"
            onClick={darkmodeToggler}
            className={`${style.darkmodeButton}`}
          >
            <div
              className={`${style.switcher} ${
                settings.darkMode ? style.switchDark : ""
              }`}
            >
              <Icon.Sun size="25" />
              <Icon.Moon size="22" />
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
};
