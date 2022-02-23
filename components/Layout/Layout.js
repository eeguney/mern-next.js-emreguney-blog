import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Aside } from "../Main/Aside/Aside";
import { CommentsModal } from "../Main/CommentsModal/CommentsModal";

export const Layout = ({ children }) => {
  const settings = useSelector((state) => state.settings);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeOutAndScale");

  useEffect(() => {
    setTransitionStage("fadeInAndScale");
  }, []);

  useEffect(() => {
    if (children !== displayChildren) setTransitionStage("fadeOutAndScale");
  }, [children, setDisplayChildren, displayChildren]);

  return (
    <div className="site-layout">
      <div className={`search-area ${settings.search ? "open" : ""}`}>
        <label>Search:</label>
        <input
          type="text"
          placeholder="What are you looking for?"
          autoComplete="false"
          spellCheck="false"
        />
      </div>
      <Aside toggle={settings.drawer} />
      <div
        className={`page-container ${
          settings.drawer ? "pageContainerIsOpen" : ""
        } ${settings.search ? "searchIsOpen" : ""}`}
      >
        <Header />
        <div
          onTransitionEnd={() => {
            if (transitionStage === "fadeOutAndScale") {
              setDisplayChildren(children);
              setTransitionStage("fadeInAndScale");
            }
          }}
          className={`${transitionStage} ${
            settings.drawer ? "pageContainerIsOpen" : ""
          } ${settings.search ? "searchIsOpen" : ""}`}
        >
          {displayChildren}
        </div>
        <Footer />
      </div>
      {settings.comments.status && <CommentsModal />}
    </div>
  );
};
