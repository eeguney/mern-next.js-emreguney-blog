import { useState, useEffect } from "react";
import { Icon } from "../../../../components/UI/Icon";
import { Editor } from "@tinymce/tinymce-react";
import style from "../../../../styles/Admin.module.css";
import {
  getAllCategories,
  getAllPost,
  uploadImage,
} from "../../../../components/api";
import slugger from "../../../../utils/slugger";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  let initialize = {
    title: "",
    category: "",
    thumbnail: "",
    slug: "",
    text: "",
    tags: ""
  };
  const [form, setform] = useState(initialize);
  const [toggle, settoggle] = useState({ all: true, add: false });
  const [dropdown, setdropdown] = useState({
    category: { status: false, value: "" },
    tag: { status: false, value: "" },
  });
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const allPosts = async () => {
    const posts = await getAllPost();
    setPosts(posts.data);
    const categories = await getAllCategories();
    setCategories(categories.data);
  };
  
  useEffect(() => {
    allPosts();
  }, []);

  const [intags, setIntags] = useState([]);

  const TagSpan = () => {
    return (
      <>
        {intags.map((item) => (
          <span>{item}</span>
        ))}
      </>
    );
  };

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

  const handleTags = (event) => {
    if (event.key === ",") {
      if (form.tags.length > 2) {
        const newTag = form.tags;
        intags.push(newTag.split(",").slice(0).join(""));
        setform({ ...form, tags: "" });
      }
    }
    if (event.key === "Backspace") {
      if (form.tags === "") {
        setIntags(intags.filter((element, index) => index < intags.length - 1));
      }
    }
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

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setform({...form, thumbnail: i.name})
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async () => {
    const body = new FormData();
    body.append("file", image);
    await uploadImage(body);
  };

  const submit = (e) => {
    e.preventDefault()
    console.log({ ...form, tags: intags })
  }

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
          <div className={style.formItem}>
            <div className={style.thumbnailSelect}>
            <label>Thumbnail:</label>
              <div className={style.dropImage}>
              <input type="file" name="myImage" onChange={uploadToClient} />
              <p>Drop or select a thumbnail</p>
              {image && (<img src={createObjectURL} className={style.thumbnailPreview} />) }
              </div>
              {image && (
                <button type="submit" onClick={uploadToServer}>
                  Save
                </button>
              )}
            </div>
          </div>
          <div className={style.formColumnItem}>
            <label>Category:</label>
            <div className={style.categorySelect}>
              <button type="button" name="category" onClick={dropdownHandler}>
                { form.category != "" ? form.category : "SELECT" } 
              </button>
              <div
                className={`${style.dropdown} ${
                  dropdown.category.status ? style.active : style.hidden
                }`}
              >
                {categories.map((category) => (
                  <button type="button" className={form.category == category.slug && style.activeCategory } onClick={() => setform({ ...form, category: category.slug })}>
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className={style.formItem}>
            <label>Tag:</label>
            <div className={style.tags_area}>
              <div className={style.tags_styled}>
                {intags.length > 0 ? <TagSpan /> : ""}
              </div>
              <input
                type="text"
                name="tags"
                className={style.tags}
                placeholder="Type some tags seperated with comma.."
                value={form.tags}
                onKeyUp={handleTags}
                onChange={formHandler}
              />
            </div>
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
          <button type="submit" className={style.submitButton}>ADD POST</button>
        </form>
      )}
    </div>
  );
};
