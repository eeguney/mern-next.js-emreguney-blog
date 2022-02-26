import { useState, useEffect } from "react";
import parse from "html-react-parser";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Icon } from "../../UI/Icon";
import { nextPost, prevPost } from "../../api";
import style from "./../../../styles/Main.module.css";
import { toggleComment } from "../../../store/settingsSlice";

export const ScrollFetch = ({ post }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [prevNext, setprevNext] = useState({
    prevPost: {},
    nextPost: {},
  });

  useEffect(() => {
    const fetchPrevNext = async () => {
      const prev = await prevPost(post._id);
      const next = await nextPost(post._id);
      setprevNext({ prevPost: prev.data[0], nextPost: next.data[0] });
    };
    fetchPrevNext();
  }, []);



  return (
    <div className={style.loadedPost}>
      <header>
        <h2>{post.title}</h2>
        <div className={style.postDesc}>
          <div className={style.postDescItem}>
            <label>Author:</label>
            <span>
              <Link href="">
                <a>Emre Güney</a>
              </Link>
            </span>
          </div>
          <div className={style.postDescItem}>
            <label>Date:</label>
            <span>2 days ago</span>
          </div>
          <div className={style.postDescItem}>
            <label>Comments:</label>
            <span>14</span>
          </div>
        </div>
        <div className={style.thumbnail}>
          <img src={post.thumbnail} alt={post.title} />
        </div>
      </header>
      <div className={style.postContextWrapper}>
        <section className={style.postContext}>{parse(post.text)}</section>
        <section className={style.postShare}>
          <label>Share this!</label>
          <div className={style.items}>
            <div className={style.item}>
              <Icon.Twitter size="40" />
            </div>
            <div className={style.item}>
              <Icon.GitHub size="40" />
            </div>
            <div className={style.item}>
              <Icon.Email size="40" />
            </div>
          </div>
        </section>
        <section className={style.nextPrev}>
          {prevNext.prevPost && (
            <div className={style.prev}>
              <Link href={`/${prevNext.prevPost.slug}`}>
                <a>
                  <label>
                    <Icon.LeftArrow size="24" /> Older Post
                  </label>
                  <div className={style.content}>
                    <img
                      src={prevNext.prevPost.thumbnail}
                      alt={prevNext.prevPost.title}
                    />
                    <h3>{prevNext.prevPost.title}</h3>
                  </div>
                </a>
              </Link>
            </div>
          )}
          {prevNext.nextPost && (
            <div className={style.next}>
              <Link href={`/${prevNext.nextPost.slug}`}>
                <a>
                  <label>
                    Newer Post <Icon.RightArrow size="24" />
                  </label>
                  <div className={style.content}>
                    <h3>{prevNext.nextPost.title}</h3>
                    <img
                      src={prevNext.nextPost.thumbnail}
                      alt={prevNext.nextPost.title}
                    />
                  </div>
                </a>
              </Link>
            </div>
          )}
        </section>
        <section className={`${style.commentsSection} `}>
          <label>
            <h3>Comments</h3>
            <div className={style.right}>
              <span>
                There is <strong>5</strong> comments
              </span>
              <button
                type="button"
                onClick={() => {dispatch(toggleComment(post._id));router.push(router.asPath+"#comments", undefined, { shallow: true })}}
                className={style.seeAllComments}
              >
                SEE ALL
              </button>
            </div>
          </label>
          <div className={style.commentsWrapper}>
            <div className={style.addComment}>
              <textarea
                placeholder="Leave a comment..."
                onClick={() => {dispatch(toggleComment(post._id));router.push(router.asPath+"#comments", undefined, { shallow: true })}}
              />
              <button type="button" className={style.submitComment}>
                <Icon.SubmitIcon size="24" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
