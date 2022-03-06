import { useState, useEffect } from "react";
import {
  addACategory,
  deleteACategory,
  editACategory,
  getACategoryBySlug,
  getAllCategories,
} from "../../../../components/api";
import { Icon } from "../../../../components/UI/Icon";
import Link from "next/link";
import style from "../../../../styles/Admin.module.css";
import slugger from "../../../../utils/slugger";
export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [toggle, settoggle] = useState({ all: true, add: false });
  const [editMode, setEditMode] = useState(false);

  let initialize = {
    title: "",
    slug: "",
  };
  const [form, setform] = useState(initialize);

  const toggler = async (e) => {
    settoggle({ all: false, add: false, [e.target.name]: true });
  };

  const allCategories = async () => {
    const categories = await getAllCategories();
    setCategories(categories.data);
  };

  useEffect(() => {
    allCategories();
  }, []);

  const slugChanger = (event) => {
    setform({ ...form, slug: slugger(event.target.value) });
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

  const deleteACategoryHandler = async (categoryID) => {
    var answer = window.confirm("This category will be deleted?");
    if (answer) {
      try {
        await deleteACategory(categoryID);
        allCategories();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editHandler = async (slug) => {
    setEditMode(true);
    settoggle({ all: false, add: true });
    const { data } = await getACategoryBySlug(slug);
    setform(data);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (editMode) {
      try {
        await editACategory(form.slug, {
          ...form,
        });
        setEditMode(false);
        await allCategories();
        settoggle({ add: false, all: true });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await addACategory(form);
        allCategories();
        settoggle({ add: false, all: true });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={style.tabItem}>
      <h2>Categories</h2>
      <div className={style.bottomLinks}>
        <label>Links:</label>
        <button
          type="button"
          name="all"
          className={toggle.all ? style.active : null}
          onClick={toggler}
        >
          All Categories
        </button>
        <button
          type="button"
          name="add"
          className={toggle.add ? style.active : null}
          onClick={toggler}
        >
          {editMode ? "Edit Category" : "Add Category"}
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
            {categories.map((category) => (
              <div className={style.item}>
                <div>
                  <Link href={"/categories/" + category.slug}>
                    <a>{category.title}</a>
                  </Link>
                </div>
                <div>{category.slug}</div>
                <div className={style.actions}>
                  <button
                    type="button"
                    onClick={() => deleteACategoryHandler(category._id)}
                  >
                    <Icon.Delete size="15" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editHandler(category.slug)}
                  >
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
          <button type="submit" className={style.submitButton}>
            {editMode ? "EDIT CATEGORY" : "ADD CATEGORY"}
          </button>
        </form>
      )}
    </div>
  );
};
