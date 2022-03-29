import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Aside } from "../Main/Aside/Aside";
import { CommentsModal } from "../Main/CommentsModal/CommentsModal";

export const Layout = ({ children, gitHub, repo }) => {
  const router = useRouter();
  const settings = useSelector((state) => state.settings);
  const [percentage, setPercentage] = useState(0)
  
  useEffect(() => {
    window.addEventListener("scroll", percentageCalculate);
    percentageCalculate()
  }, []);

  const percentageCalculate = async () => {
    setPercentage(
      (document.documentElement.scrollTop) /
        (document.documentElement.offsetHeight - window.innerHeight - 200) *
        100
    );
  };

  return (
    <div className={`site-layout ${settings.darkMode ? "darkmode" : ""}`}>
      <div className={`search-area ${settings.search ? "open" : ""}`}>
        <label>Search:</label>
        <input
          type="text"
          placeholder="What are you looking for?"
          autoComplete="false"
          spellCheck="false"
        />
      </div>
      <Aside toggle={settings.drawer} gitHub={gitHub} repo={repo} />
      <div
        className={`page-container ${
          settings.drawer ? "pageContainerIsOpen" : ""
        } ${settings.search ? "searchIsOpen" : ""}`}
      >
        <Header />
        <div
          className={` ${settings.drawer ? "pageContainerIsOpen" : ""} ${
            settings.search ? "searchIsOpen" : ""
          }`}
        >
          {children}
        </div>
        <Footer />
      </div>
      {settings.comments.status && (
        <div className="commentBackDrop">
          <CommentsModal postID={settings.comments.postID} />
        </div>
      )}
      {router.pathname === "/[postSlug]" && (
        <div className="reading-percentage" style={{ "width": percentage+"%" }} />
      )}
    </div>
  );
};
