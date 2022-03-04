import { useEffect, useState } from "react";
import {
  deleteAComment,
  getAllComments,
  getAllPages,
  getCountofCategories,
  getCountofPosts,
} from "../../../../components/api";
import { Icon } from "../../../../components/UI/Icon";
import style from "../../../../styles/Admin.module.css";
import { Card } from "./Card";
export const Main = () => {
  const [data, setdata] = useState({
    posts: "",
    categories: "",
    pages: [],
    comments: [],
  });

  const getData = async () => {
    const postCount = await getCountofPosts();
    const categoryCount = await getCountofCategories();
    const pages = await getAllPages();
    const comments = await getAllComments();
    setdata({
      posts: postCount.data.count,
      categories: categoryCount.data.count,
      pages: pages.data,
      comments: comments.data,
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const deleteComment = async (id) => {
    var answer = window.confirm("This comment will be deleted?");
    if (answer) {
      try {
        await deleteAComment(id);
        getData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={style.tabItem}>
      <div className={style.adminLayout}>
        <Card model={"small"}>
          <div className={style.small_inner}>
            <label>POST</label>
            <span>{data.posts}</span>
          </div>
        </Card>
        <Card model={"small-2"}>
          <div className={style.small_inner}>
            <label>CATEGORY</label>
            <span>{data.categories}</span>
          </div>
        </Card>
        <Card model={"big"}>
          <label>COMMENTS</label>
          <span className={style.info}>There are <strong>{data.comments.length > 0 ? data.comments.length : "no"}</strong> comments</span>
          <div className={style.listContainer}>
            {data.comments.map((comment) => (
              <li>
                <div className={style.personInfo}>
                  <div>
                    <label>Name:</label> {comment.fullname}
                  </div>
                  <div>
                    <label>Email:</label> {comment.email}
                  </div>
                </div>
                <p>{comment.comment}</p>
                <div className={style.controller}>
                  <button
                    type="button"
                    onClick={() => deleteComment(comment._id)}
                  >
                    <Icon.Delete size="15" />
                  </button>
                  <button type="button">GO TO POST</button>
                </div>
              </li>
            ))}
          </div>
        </Card>
        <Card model={"medium"}>
          <label>PAGES</label>
          <ul>
            {data.pages.map((page) => (
              <li>{page.title}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};
