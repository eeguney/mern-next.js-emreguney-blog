import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentData,
  setCommentData,
  toggleComment,
} from "../../../store/settingsSlice";
import style from "../../../styles/Main.module.css";
import { addComment, fetchCommentByPostID } from "../../api";
import { Icon } from "../../UI/Icon";
import Fade from "react-reveal/Fade";
import { useRouter } from "next/router";
import { CommentsForm } from "./CommentsForm";
import dateShow from "../../../utils/dateShow";

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

export const CommentsModal = ({ postID }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.settings.comments);
  const [addImage, setAddImage] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      const fetchedcomments = await fetchCommentByPostID(postID);
      dispatch(setCommentData(fetchedcomments.data));
    };
    getComments();
  }, []);
  const CommentLi = ({ data, children, last }) => {
    const [addCommentToComment, setaddCommentToComment] = useState(false);
    const date = Math.ceil(
      Math.abs(new Date(data.createdAt) - new Date()) / (1000 * 60 * 60 * 24)
    );
    return (
        <li>
          <div className={style.commentItem}>
            <div className={style.userInfo}>
              <img src={data.imageUrl} alt={data.fullname} />
              <span className={style.name}>{data.fullname}</span>
            </div>
            <div className={style.comment}>
              <div className={style.meta}>
                <span>{dateShow(date)}</span>
                <span>
                  <Icon.Like size="15" />0
                </span>
                <span>
                  <Icon.SubmitIcon size="15" />0
                </span>
              </div>
              <p>{data.comment}</p>
              <div className={style.controller}>
                <button type="button">
                  <Icon.Like size="15" />
                  Like
                </button>
                {!last && (
                  <button
                    type="button"
                    onClick={() => setaddCommentToComment(!addCommentToComment)}
                  >
                    <Icon.SubmitIcon size="15" />
                    Comment
                  </button>
                )}
              </div>
              {addCommentToComment && (
                <CommentsForm data={data} children={children} last={last} />
              )}
            </div>
          </div>
          {children}
        </li>
    );
  };

  return (
    <section className={`${style.commentsSection} ${style.fixedComments}`}>
      <button
        type="button"
        className={style.closeButton}
        onClick={() => {
          dispatch(toggleComment());
          router.push(router.asPath.replace("#comments", ""), undefined, {
            shallow: true,
          });
        }}
      >
        <Icon.Close size="18" />
      </button>
      <label>
        <h3>Comments</h3>
        <div className={style.right}>
          <span>
            {comments.count === 1 ? (
              <>
                <strong>1</strong> comment
              </>
            ) : comments.count > 1 ? (
              <>
                <strong>{comments.count}</strong> comments
              </>
            ) : (
              <>
                <strong>No</strong> comment
              </>
            )}
          </span>
        </div>
      </label>
      <div className={style._inner}>
        <div className={style.commentsWrapper}>
          <Formik
            initialValues={{
              fullname: "",
              email: "",
              comment: "",
              image: "",
              parentID: null,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const res = await addComment(postID, values);
              dispatch(addCommentData(res.data));
            }}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <form onSubmit={handleSubmit}>
                <div className={style.addComment}>
                  <div className={style.commentRow}>
                    <div className={style.fullname}>
                      <input
                        type="text"
                        placeholder="Your name..."
                        name="fullname"
                        values={values.fullname}
                        onChange={handleChange}
                      />
                      {errors.fullname ? (
                        <span
                          className={style.error}
                          data-error={errors.fullname}
                        >
                          <Icon.Error size="21" />
                        </span>
                      ) : null}
                    </div>
                    <div className={style.email}>
                      <input
                        type="text"
                        placeholder="Your email adress..."
                        name="email"
                        values={values.email}
                        onChange={handleChange}
                      />
                      {errors.email ? (
                        <span className={style.error} data-error={errors.email}>
                          <Icon.Error size="21" />
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className={style.textareaArea}>
                    <textarea
                      placeholder="Leave a comment..."
                      name="comment"
                      values={values.comment}
                      onChange={handleChange}
                    />
                    {errors.comment ? (
                      <span className={style.error} data-error={errors.comment}>
                        <Icon.Error size="21" />
                      </span>
                    ) : null}
                  </div>

                  <div className={style.dropdownImage}>
                    <button type="button" onClick={() => setAddImage(true)}>
                      <Icon.Plus size="20" /> ADD IMAGE
                    </button>
                    {addImage && (
                      <div className={style.imageArea}>
                        <input
                          type="text"
                          placeholder="Enter your image url..."
                          name="image"
                          values={values.image}
                          onChange={handleChange}
                        />
                        {errors.image ? (
                          <span
                            className={style.error}
                            data-error={errors.image}
                          >
                            <Icon.Error size="21" />
                          </span>
                        ) : null}
                      </div>
                    )}
                  </div>
                  <button type="submit" className={style.submitComment}>
                    <Icon.SubmitIcon size="24" />
                  </button>
                </div>
              </form>
            )}
          </Formik>
          <div className={style.comments}>
            <ul>
              {comments.data
                .filter((item) => item.parentID === null)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((comment, index) => (
                  <>
                    <CommentLi key={index} data={comment}>
                      {comments.data
                        .filter((item) => item.parentID === comment._id)
                        .map((childComment, index) => (
                          <ul>
                            <CommentLi key={index} data={childComment}>
                              {comments.data
                                .filter(
                                  (item) => item.parentID === childComment._id
                                )
                                .map((child2Comment, index) => (
                                  <ul>
                                    <CommentLi
                                      key={index}
                                      data={child2Comment}
                                      last={true}
                                    />
                                  </ul>
                                ))}
                            </CommentLi>
                          </ul>
                        ))}
                    </CommentLi>
                  </>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
