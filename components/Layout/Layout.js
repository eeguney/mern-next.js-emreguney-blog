import { useSelector } from "react-redux";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Aside } from "../Main/Aside/Aside";
import { CommentsModal } from "../Main/CommentsModal/CommentsModal";

export const Layout = ({ children }) => {
  const settings = useSelector((state) => state.settings);
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
    </div>
  );
};
