import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Icon } from "../../../../components/UI/Icon";
import { ContentState, convertToRaw } from "draft-js";
import { Formik } from "formik";
import * as Yup from "yup";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import style from "../../../../styles/Admin.module.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getAllCategories, getAllPost } from "../../../../components/api";

const validationSchema = Yup.object({
  email: Yup.string().required("Reqired").email("Invalid"),
  fullname: Yup.string()
    .required("Required")
    .min(3, "Too short")
    .max(40, "Too long"),
  comment: Yup.string()
    .required("Required")
    .min(2, "Too short")
    .max(4000, "Too long"),
  image: Yup.string().min(7, "Too short").max(100, "Too long"),
});

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [toggle, settoggle] = useState({ all: true, add: false });
  const [dropdown, setdropdown] = useState({
    category: { status: false, value: "" },
    tag: { status: false, value: "" },
  });

  let _contentState = ContentState.createFromText("Sample content state");
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw); // ContentState JSON

  const toggler = async (e) => {
    settoggle({ all: false, add: false, [e.target.name]: true });
  };

  const dropdownHandler = (e) => {
    const section = e.target.name;
    setdropdown({
      ...dropdown,
      [section]: {
        ...dropdown[section],
        status: !dropdown[section].status,
      },
    });
  };

  useEffect(() => {
    const allPosts = async () => {
      const posts = await getAllPost();
      setPosts(posts.data);
      const categories = await getAllCategories();
      setCategories(categories.data);
    };
    allPosts();
  }, []);

  return (
    <div className={style.tabItem}>
      <h2>Posts</h2>
      <div className={style.bottomLinks}>
        <label>Links:</label>
        <button
          type="button"
          name="all"
          className={toggle.all ? style.active : null}
          onClick={toggler}
        >
          All Posts
        </button>
        <button
          type="button"
          name="add"
          className={toggle.add ? style.active : null}
          onClick={toggler}
        >
          Add Post
        </button>
      </div>
      {toggle.all && (
        <div className={style.grid}>
          <header>
            <div>Title</div>
            <div>Category</div>
            <div>Slug</div>
            <div>
              <Icon.Like size="18" />
            </div>
            <div>
              <Icon.SubmitIcon size="18" />
            </div>
            <div>Actions</div>
          </header>
          <section>
            {posts.map((post) => (
              <div className={style.item}>
                <div>{post.title}</div>
                <div>Category</div>
                <div>{post.slug}</div>
                <div>Like</div>
                <div>Comment</div>
                <div>Actions</div>
              </div>
            ))}
          </section>
        </div>
      )}
      {/* title, excerpt, slug, category, text, tags, thumbnail, author */}

      {toggle.add && (
        <Formik
          initialValues={{
            title: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {}}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <form onSubmit={handleSubmit} className={style.form}>
              <div className={style.formItem}>
                <label>Title:</label>
                <input type="text" placeholder="Title" name="title" />
              </div>
              <div className={style.formColumnItem}>
                <label>Link:</label>
                <input
                  type="text"
                  className={style.slugInput}
                  name="slug"
                  placeholder="Type some title..."
                />
              </div>
              <div className={style.formItem}>
                  <label>Category:</label>
                  <div className={style.categorySelect}>
                    <button
                      type="button"
                      name="category"
                      onClick={dropdownHandler}
                    >
                      SELECT
                    </button>
                    <div
                      className={`${style.dropdown} ${
                        dropdown.category.status ? style.active : style.hidden
                      }`}
                    >
                      {categories.map((category) => (
                        <button type="button" value={category.slug}>
                          {category.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={style.formItem}>
                  <label>Tag:</label>
                  <div className={style.categorySelect}>
                    <button type="button" name="tag" onClick={dropdownHandler}>
                      SELECT
                    </button>
                    <div
                      className={`${style.dropdown} ${
                        dropdown.tag.status ? style.active : style.hidden
                      }`}
                    >
                      {categories.map((category) => (
                        <button type="button" value={category.slug}>
                          {category.title}
                        </button>
                      ))}
                    </div>
                  </div>
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
        </Formik>
      )}
    </div>
  );
};
