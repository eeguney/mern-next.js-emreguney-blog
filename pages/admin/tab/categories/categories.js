import { useState, useEffect } from "react";
import { getAllCategories } from "../../../../components/api";
import { Icon } from "../../../../components/UI/Icon";
import style from "../../../../styles/Admin.module.css";
export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [toggle, settoggle] = useState({ all: true, add: false });

  const toggler = async (e) => {
    settoggle({ all: false, add: false, [e.target.name]: true });
  };

  useEffect(() => {
     const allCategories = async () => {
       const categories = await getAllCategories()
       setCategories(categories.data)
     }
     allCategories()
   }, [])

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
          Add Category
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
            { categories.map((category) => (
              <div className={style.item}>
              <div>{category.title}</div>
              <div>{category.slug}</div>
              <div>Actions</div>
            </div>
            )) }
          </section>
        </div>
      )}
      {toggle.add && 
      <form className={style.form}>
          <div className={style.formItem}>
              <label>Title:</label>
              <input type="text" placeholder="Title" />
          </div>
          <div className={style.formColumnItem}>
            <label>Link:</label>
            <input type="text" className={style.slugInput} placeholder="Type some title..." />
          </div>
      </form>
      }
    </div>
  );
};
