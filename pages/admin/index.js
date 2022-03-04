import { useState, useEffect } from "react";
import Head from "next/head";
import style from "../../styles/Admin.module.css";
import Link from "next/link";
import { Icon } from "../../components/UI/Icon";
import { Main } from "./tab/main/main";
import { Pages } from "./tab/pages/pages";
import { useDispatch } from "react-redux";
import { Posts } from "./tab/posts/posts";
import { Categories } from "./tab/categories/categories";
import { Settings } from "./tab/settings/settings";
import { setDarkMode } from "../../store/settingsSlice";

export default function Admin({ posts }) {
  const dispatch = useDispatch();

  const initialActiveTab = {
    main: true,
    posts: false,
    pages: false,
    categories: false,
    settings: false,
  };
  const [activeTab, setactiveTab] = useState(initialActiveTab);

  useEffect(() => {
    if (localStorage.getItem("darkmode") === "true") {
      dispatch(setDarkMode(true));
    }
  }, []);

  const resetActiveTab = () => {
    setactiveTab({ initialActiveTab });
  };

  const tabToggler = (e) => {
    resetActiveTab();
    setactiveTab({ [e.target.name]: true });
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard - Emre Güney Personal Blog</title>
        <meta name="description" content="Frontend developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id={style.main}>
        <div className={style.container}>
          <div className={style.singlePost}>
            <header>
              <div className={style.breadcrumb}>
                <Link href="/">
                  <a>Mainpage</a>
                </Link>
                <span>
                  <Icon.RightArrow size="19" />
                </span>
                <Link href="">
                  <a>Admin Dashboard</a>
                </Link>
              </div>
              <h2>Admin Dashboard</h2>
            </header>
            <div className={style.adminLinks}>
              <ul>
                <li>
                  <button
                    type="button"
                    name="main"
                    className={activeTab.main && style.active}
                    onClick={tabToggler}
                  >
                    Main
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    name="posts"
                    className={activeTab.posts && style.active}
                    onClick={tabToggler}
                  >
                    Posts
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    name="pages"
                    className={activeTab.pages && style.active}
                    onClick={tabToggler}
                  >
                    Pages
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    name="categories"
                    className={activeTab.categories && style.active}
                    onClick={tabToggler}
                  >
                    Categories
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    name="settings"
                    className={activeTab.settings && style.active}
                    onClick={tabToggler}
                  >
                    Settings
                  </button>
                </li>
              </ul>
            </div>
            <div className={style.tab}>
              {activeTab.main && <Main />}
              {activeTab.posts && <Posts posts={posts} />}
              {activeTab.pages && <Pages />}
              {activeTab.categories && <Categories />}
              {activeTab.settings && <Settings />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
