import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Icon } from "../../../../components/UI/Icon";
import style from "../../../../styles/Admin.module.css";
import { ContentState, convertToRaw } from "draft-js";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getAllPages } from "../../../../components/api";
export const Pages = () => {
  const [toggle, settoggle] = useState({ all: true, add: false });
  const [pages, setPages] = useState([]);

  let _contentState = ContentState.createFromText("Sample content state");
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw); // ContentState JSON

  const toggler = async (e) => {
    settoggle({ all: false, add: false, [e.target.name]: true });
  };

  useEffect(() => {
    const allPages = async () => {
      const pages = await getAllPages()
      setPages(pages.data)
    }
    allPages()
  }, [])
  

  return (
    <div className={style.tabItem}>
      <h2>Pages</h2>
      <div className={style.bottomLinks}>
        <label>Links:</label>
        <button
          type="button"
          name="all"
          className={toggle.all ? style.active : null}
          onClick={toggler}
        >
          All Pages
        </button>
        <button
          type="button"
          name="add"
          className={toggle.add ? style.active : null}
          onClick={toggler}
        >
          Add Page
        </button>
      </div>
      {toggle.all && (
        <div className={`${style.gridCategory} ${style.grid}`}>
          <header>
            <div>Title</div>
            <div>Slug</div>
            <div>Actions</div>
          </header>
          <section>
            {pages.map((page) => (
              <div className={style.item}>
                <div>{page.title}</div>
                <div>{page.slug}</div>
                <div>Actions</div>
              </div>
            ))}
          </section>
        </div>
      )}
      {toggle.add && (
        <form className={style.form}>
          <div className={style.formItem}>
            <label>Title:</label>
            <input type="text" placeholder="Title" />
          </div>
          <div className={style.formColumnItem}>
            <label>Link:</label>
            <input
              type="text"
              className={style.slugInput}
              placeholder="Type some title..."
            />
          </div>
          <Editor
            defaultContentState={contentState}
            onContentStateChange={setContentState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
        </form>
      )}
    </div>
  );
};
