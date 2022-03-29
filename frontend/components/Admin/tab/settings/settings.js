import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { getAllSettings, updateSettings } from "../../../../components/api";
import { Icon } from "../../../../components/UI/Icon";
import { updateSettingState } from "../../../../store/settingsSlice";
import style from "../../../../styles/Admin.module.css";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid"),
  postperpage: Yup.number()
    .required("Required")
    .min(5, "Too short")
    .max(50, "Too long"),
  authorinfo: Yup.string().min(2, "Too short").max(4000, "Too long"),
  author: Yup.string().min(3, "Too short").max(100, "Too long"),
  github: Yup.string().min(3, "Too short").max(100, "Too long"),
  twitter: Yup.string().min(3, "Too short").max(100, "Too long"),
});

export const Settings = () => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [initial, setinitial] = useState({});

  const getSettings = async () => {
    const { data } = await getAllSettings();
    setinitial({ ...data[0] });
    setloading(true);
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <div className={style.tabItem}>
      <h2>Settings</h2>
      {!loading ? (
        "Loading..."
      ) : (
        <Formik
          initialValues={initial}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values) => {
            try {
              const res = await updateSettings(values);
              dispatch(updateSettingState(res.data));
              alert("Saved...")
            } catch (error) {}
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <form className={style.form} onSubmit={handleSubmit}>
              <div className={style.formItem}>
                <label>Post per page:</label>
                <input
                  type="number"
                  placeholder="Default 15"
                  min="5"
                  max="50"
                  name="postperpage"
                  values={values.postperpage}
                  value={values.postperpage}
                  onChange={handleChange}
                />
                {errors.postperpage ? (
                  <span className={style.error} data-error={errors.postperpage}>
                    <Icon.Error size="21" />
                  </span>
                ) : null}
              </div>
              <div className={style.formItem}>
                <label>Author short info:</label>
                <input
                  type="text"
                  name="authorinfo"
                  values={values.authorinfo}
                  value={values.authorinfo}
                  onChange={handleChange}
                />
                {errors.authorinfo ? (
                  <span className={style.error} data-error={errors.authorinfo}>
                    <Icon.Error size="21" />
                  </span>
                ) : null}
              </div>
              <div className={style.formItem}>
                <label>Author name:</label>
                <input
                  type="text"
                  name="author"
                  values={values.author}
                  value={values.author}
                  onChange={handleChange}
                />
                {errors.author ? (
                  <span className={style.error} data-error={errors.author}>
                    <Icon.Error size="21" />
                  </span>
                ) : null}
              </div>
              <div className={style.formItem}>
                <label>Github:</label>
                <input
                  type="text"
                  placeholder="Example: eeguney"
                  name="github"
                  values={values.github}
                  value={values.github}
                  onChange={handleChange}
                />
                {errors.github ? (
                  <span className={style.error} data-error={errors.github}>
                    <Icon.Error size="21" />
                  </span>
                ) : null}
              </div>
              <div className={style.formItem}>
                <label>Twitter:</label>
                <input
                  type="text"
                  placeholder="Example: eeguney"
                  name="twitter"
                  values={values.twitter}
                  value={values.twitter}
                  onChange={handleChange}
                />
                {errors.twitter ? (
                  <span className={style.error} data-error={errors.twitter}>
                    <Icon.Error size="21" />
                  </span>
                ) : null}
              </div>
              <div className={style.formItem}>
                <label>Email:</label>
                <input
                  type="text"
                  placeholder="Example: emreguney@outlook.com.tr"
                  name="email"
                  values={values.email}
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email ? (
                  <span className={style.error} data-error={errors.email}>
                    <Icon.Error size="21" />
                  </span>
                ) : null}
              </div>
              <button type="submit" className={style.submitButton}>
                SAVE
              </button>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};
