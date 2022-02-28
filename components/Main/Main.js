import Link from "next/link";
import style from "../../styles/Main.module.css";
import { Icon } from "../UI/Icon";
import { AboutMe } from "./AboutMe";
import { FastLinks } from "./FastLinks";
import { Posts } from "./Posts/Posts";

export const Main = ({ page, blogList, totalCount }) => {
  return (
    <div id={style.main}>

      <AboutMe style={style} />
      <FastLinks style={style} />

      <div className={style.container}>
        <div className={style.title}>
          <h3>Blog Posts</h3>
          <Link href="/" alt="See All">
            <a className={style.seeAll}>
              <Icon.Menu2 size="40" />
            </a>
          </Link>
        </div>

        <Posts page={page} blogList={blogList} totalCount={totalCount} style={style} />

      </div>
    </div>
  );
};
