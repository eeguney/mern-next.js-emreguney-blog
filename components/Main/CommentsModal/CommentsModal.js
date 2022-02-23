import { useDispatch } from "react-redux";
import { toggleComment } from "../../../store/settingsSlice";
import style from "../../../styles/Main.module.css";
import { Icon } from "../../UI/Icon";

export const CommentsModal = () => {
  const dispatch = useDispatch();
  return (
    <section className={`${style.commentsSection} ${style.fixedComments}`}>
      <button type="button" className={style.closeButton} onClick={() => dispatch(toggleComment())}>
        <Icon.Close size="18" />
      </button>
      <label>
          <h3>Comments</h3>
          <div className={style.right}>
            <span>
              There is <strong>5</strong> comments
            </span>
          </div>
        </label>
      <div className={style._inner}>
        <div className={style.commentsWrapper}>
          <div className={style.addComment}>
            <textarea placeholder="Leave a comment..." />
            <button type="button" className={style.submitComment}>
              <Icon.SubmitIcon size="24" />
            </button>
          </div>
          <div className={style.comments}>
            <ul>
              <li>
                <div className={style.commentItem}>
                  <div className={style.userInfo}>
                    <img
                      src="https://genki.fueko.net/content/images/size/w800/2021/05/photo-1613420568020-0c0e3764d499.jpeg"
                      alt="Emre Güney"
                    />
                    <span className={style.name}>Emre Güney</span>
                  </div>
                  <div className={style.comment}>
                    <div className={style.meta}>
                      <span>2 hours ago</span>
                      <span>
                        <Icon.Like size="15" />0
                      </span>
                      <span>
                        <Icon.SubmitIcon size="15" />0
                      </span>
                    </div>
                    <p>
                      Utilitatis causa amicitia est quaesita. Quae quo sunt
                      excelsiores, eo dant clariora indicia naturae. Sed haec
                      quidem liberius ab eo dicuntur et saepius. Et ille ridens:
                      Video, inquit, quid agas; Tum ille timide vel potius
                      verecunde: Facio, inquit. An hoc usque quaque, aliter in
                      vita.{" "}
                    </p>
                    <div className={style.controller}>
                      <button type="button">
                        <Icon.Like size="15" />
                        Like
                      </button>
                      <button type="button">
                        <Icon.SubmitIcon size="15" />
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
                <ul>
                  <li>
                    <div className={style.commentItem}>
                      <div className={style.userInfo}>
                        <img
                          src="https://genki.fueko.net/content/images/size/w800/2021/05/photo-1613420568020-0c0e3764d499.jpeg"
                          alt="Emre Güney"
                        />
                        <span className={style.name}>Emre Güney</span>
                      </div>
                      <div className={style.comment}>
                        <div className={style.meta}>
                          <span>2 hours ago</span>
                          <span>
                            <Icon.Like size="15" />0
                          </span>
                          <span>
                            <Icon.SubmitIcon size="15" />0
                          </span>
                        </div>
                        <p>
                          Utilitatis causa amicitia est quaesita. Quae quo sunt
                          excelsiores, eo dant clariora indicia naturae. Sed
                          haec quidem liberius ab eo dicuntur et saepius. Et
                          ille ridens: Video, inquit, quid agas; Tum ille timide
                          vel potius verecunde: Facio, inquit. An hoc usque
                          quaque, aliter in vita.{" "}
                        </p>
                        <div className={style.controller}>
                          <button type="button">
                            <Icon.Like size="15" />
                            Like
                          </button>
                          <button type="button">
                            <Icon.SubmitIcon size="15" />
                            Comment
                          </button>
                        </div>
                        <div className={style.addCommenttoComment}>
                          <input type="text" placeholder="Leave a comment" />
                          <button type="button">
                            <Icon.SubmitIcon size="15" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <div className={style.commentItem}>
                          <div className={style.userInfo}>
                            <img
                              src="https://genki.fueko.net/content/images/size/w800/2021/05/photo-1613420568020-0c0e3764d499.jpeg"
                              alt="Emre Güney"
                            />
                            <span className={style.name}>Emre Güney</span>
                          </div>
                          <div className={style.comment}>
                            <div className={style.meta}>
                              <span>2 hours ago</span>
                              <span>
                                <Icon.Like size="15" />0
                              </span>
                              <span>
                                <Icon.SubmitIcon size="15" />0
                              </span>
                            </div>
                            <p>
                              Utilitatis causa amicitia est quaesita. Quae quo
                              sunt excelsiores, eo dant clariora indicia
                              naturae. Sed haec quidem liberius ab eo dicuntur
                              et saepius. Et ille ridens: Video, inquit, quid
                              agas; Tum ille timide vel potius verecunde: Facio,
                              inquit. An hoc usque quaque, aliter in vita.{" "}
                            </p>
                            <div className={style.controller}>
                              <button type="button">
                                <Icon.Like size="15" />
                                Like
                              </button>
                              <button type="button">
                                <Icon.SubmitIcon size="15" />
                                Comment
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <div className={style.commentItem}>
                  <div className={style.userInfo}>
                    <img
                      src="https://genki.fueko.net/content/images/size/w800/2021/05/photo-1613420568020-0c0e3764d499.jpeg"
                      alt="Emre Güney"
                    />
                    <span className={style.name}>Emre Güney</span>
                  </div>
                  <div className={style.comment}>
                    <div className={style.meta}>
                      <span>2 hours ago</span>
                      <span>
                        <Icon.Like size="15" />0
                      </span>
                      <span>
                        <Icon.SubmitIcon size="15" />0
                      </span>
                    </div>
                    <p>
                      Utilitatis causa amicitia est quaesita. Quae quo sunt
                      excelsiores, eo dant clariora indicia naturae. Sed haec
                      quidem liberius ab eo dicuntur et saepius. Et ille ridens:
                      Video, inquit, quid agas; Tum ille timide vel potius
                      verecunde: Facio, inquit. An hoc usque quaque, aliter in
                      vita.{" "}
                    </p>
                    <div className={style.controller}>
                      <button type="button">
                        <Icon.Like size="15" />
                        Like
                      </button>
                      <button type="button">
                        <Icon.SubmitIcon size="15" />
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className={style.commentItem}>
                  <div className={style.userInfo}>
                    <img
                      src="https://genki.fueko.net/content/images/size/w800/2021/05/photo-1613420568020-0c0e3764d499.jpeg"
                      alt="Emre Güney"
                    />
                    <span className={style.name}>Emre Güney</span>
                  </div>
                  <div className={style.comment}>
                    <div className={style.meta}>
                      <span>2 hours ago</span>
                      <span>
                        <Icon.Like size="15" />0
                      </span>
                      <span>
                        <Icon.SubmitIcon size="15" />0
                      </span>
                    </div>
                    <p>
                      Utilitatis causa amicitia est quaesita. Quae quo sunt
                      excelsiores, eo dant clariora indicia naturae. Sed haec
                      quidem liberius ab eo dicuntur et saepius. Et ille ridens:
                      Video, inquit, quid agas; Tum ille timide vel potius
                      verecunde: Facio, inquit. An hoc usque quaque, aliter in
                      vita.{" "}
                    </p>
                    <div className={style.controller}>
                      <button type="button">
                        <Icon.Like size="15" />
                        Like
                      </button>
                      <button type="button">
                        <Icon.SubmitIcon size="15" />
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
