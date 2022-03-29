import React from "react";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import style from "../../../styles/Main.module.css";
import { Icon } from "../../UI/Icon";
import { addCommentData } from "../../../store/settingsSlice";
import { useDispatch } from "react-redux";
import { addComment } from "../../api";

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
export const CommentsForm = ({ data }) => {
  const dispatch = useDispatch();
  const [addImage, setAddImage] = useState(false);

  return (
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
        const res = await addComment(data.postID, values);
        dispatch(addCommentData(res.data));
      }}
    >
      {({ handleSubmit, handleChange, setFieldValue, values, errors }) => (
        <form onSubmit={handleSubmit}>
          <div className={style.commentWithParent}>
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
                  <span className={style.error} data-error={errors.fullname}>
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
                      <span className={style.error} data-error={errors.image}>
                        <Icon.Error size="21" />
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
              <button type="submit" className={style.submit} onClick={() => setFieldValue("parentID", data._id)}>
                <Icon.SubmitIcon size="24" />
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
