import { useState, useEffect } from "react";
import { Icon } from "../../../../components/UI/Icon";
import { Editor } from "@tinymce/tinymce-react";
import Link from "next/link";
import style from "../../../../styles/Admin.module.css";
import {
  addAPage,
  deleteAPage,
  editAPage,
  getAllPages,
  getAPageBySlug,
} from "../../../../components/api";
import slugger from "../../../../utils/slugger";

export const Pages = () => {
  const [toggle, settoggle] = useState({ all: true, add: false });
  const [editMode, setEditMode] = useState(false);
  const [pages, setPages] = useState([]);
  let initialize = {
    title: "",
    slug: "",
    text: "",
  };
  const [form, setform] = useState(initialize);

  const allPages = async () => {
    const pages = await getAllPages();
    setPages(pages.data);
  };

  useEffect(() => {
    allPages();
  }, []);

  const toggler = async (e) => {
    settoggle({ all: false, add: false, [e.target.name]: true });
  };

  const slugChanger = (event) => {
    setform({ ...form, slug: slugger(event.target.value) });
  };

  const textHandler = (text) => {
    setform({ ...form, text: text });
  };

  const formHandler = (event) => {
    if (event.target.name === "title") {
      setform({
        ...form,
        title: event.target.value,
        slug: slugger(event.target.value),
      });
    } else {
      setform({
        ...form,
        [event.target.name]: event.target.value,
      });
    }
  };

  const deleteAPageHandler = async (pageID) => {
    var answer = window.confirm("This page will be deleted?");
    if (answer) {
      try {
        await deleteAPage(pageID);
        allPages();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editHandler = async (slug) => {
    setEditMode(true);
    settoggle({ all: false, add: true });
    const { data } = await getAPageBySlug(slug);
    setform(data);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (editMode) {
      try {
        await editAPage(form.slug, {
          ...form,
        });
        setEditMode(false);
        await allPages();
        settoggle({ add: false, all: true });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await addAPage(form);
        allPages();
        settoggle({ add: false, all: true });
      } catch (error) {
        console.log(error);
      }
    }
  };

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
          {editMode ? "Edit Page" : "Add Page"}
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
                <div>
                  <Link href={"/" + page.slug}>
                    <a>{page.title}</a>
                  </Link>
                </div>
                <div>{page.slug}</div>
                <div className={style.actions}>
                  <button
                    type="button"
                    onClick={() => deleteAPageHandler(page._id)}
                  >
                    <Icon.Delete size="15" />
                  </button>
                  <button type="button" onClick={() => editHandler(page.slug)}>
                    <Icon.Edit size="15" />
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
      )}
      {toggle.add && (
        <form className={style.form} onSubmit={submit}>
          <div className={style.formItem}>
            <label>Title:</label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={form.title}
              onChange={formHandler}
            />
          </div>
          <div className={style.formColumnItem}>
            <label>Link:</label>
            <input
              type="text"
              className={style.slugInput}
              name="slug"
              value={form.slug}
              onChange={slugChanger}
              placeholder="Type some title..."
            />
          </div>

          <Editor
            value={form.text}
            init={{
              height: 800,
              menubar: true,
              mobile: {
                menubar: false,
              },
            }}
            onEditorChange={(text) => textHandler(text)}
          />
          <button type="submit" className={style.submitButton}>
            {editMode ? "EDIT PAGE" : "ADD PAGE"}
          </button>
        </form>
      )}
    </div>
  );
};
