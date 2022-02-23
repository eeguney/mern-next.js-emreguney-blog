import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useDispatch } from "react-redux";
import parse from "html-react-parser";
import { toggleComment } from "../store/settingsSlice";
import { Icon } from "../components/UI/Icon";
import { getAPostBySlug, nextPost, prevPost } from "../components/api";
import style from "./../styles/Main.module.css";

export default function SinglePost({ post, prev, next }) {
  const dispatch = useDispatch();
  const [prevNext, setprevNext] = useState({ prevPost: prev ? prev : [] , nextPost: next ? next: []  });
  const [loadedPost, setloadedPost] = useState([]);
  
  useEffect(() => {
    setprevNext({ prevPost: prev, nextPost: next})
  }, [prev, next])
  

  return (
    <>
      <Head>
        <title>Emre Güney Personal Blog</title>
        <meta name="description" content="Frontend developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id={style.main}>
        <div className={style.container}>
          <div className={style.singlePost}>
            <header>
              <div className={style.breadcrumb}>
                <Link href="/">
                  <a>Mainpage</a>
                </Link>
                <span>
                  <Icon.RightArrow size="19" />
                </span>
                <Link href="">
                  <a>{post.category ? post.category : "Uncategorized"}</a>
                </Link>
              </div>
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
                <img
                  src={post.thumbnail}
                  alt={post.title}
                />
              </div>
            </header>
            <div className={style.postContextWrapper}>
              <section className={style.postContext}>
                {parse(post.text)}
              </section>
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
                {prevNext.prevPost.length > 0 && (
                  <div className={style.prev}>
                    <Link href={`/${prevNext.prevPost[0].slug}`}>
                      <a>
                        <label>
                          <Icon.LeftArrow size="24" /> Older Post
                        </label>
                        <div className={style.content}>
                          <img
                            src={prevNext.prevPost[0].thumbnail}
                            alt={prevNext.prevPost[0].title}
                          />
                          <h3>
                          {prevNext.prevPost[0].title}
                          </h3>
                        </div>
                      </a>
                    </Link>
                  </div>
                )}
                {prevNext.nextPost.length > 0 && (
                  <div className={style.next}>
                    <Link href={`/${prevNext.nextPost[0].slug}`}>
                      <a>
                        <label>
                          Newer Post <Icon.RightArrow size="24" />
                        </label>
                        <div className={style.content}>
                          <h3>{prevNext.nextPost[0].title}</h3>
                          <img
                            src={prevNext.nextPost[0].thumbnail}
                            alt={prevNext.nextPost[0].title}
                          />
                        </div>
                      </a>
                    </Link>
                  </div>
                )}
              </section>
              <section className={`${style.commentsSection} `}>
                <label>
                  <h3 onClick={async () => getPrev()}>Comments</h3>
                  <div className={style.right}>
                    <span onClick={async () => getNext()}>
                      There is <strong>5</strong> comments
                    </span>
                    <button
                      type="button"
                      onClick={() => dispatch(toggleComment())}
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
                      onClick={() => dispatch(toggleComment())}
                    />
                    <button type="button" className={style.submitComment}>
                      <Icon.SubmitIcon size="24" />
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const post = await getAPostBySlug(params.postSlug);
  const prev = await prevPost(post.data._id);
  const next = await nextPost(post.data._id);
  return {
    props: {
      post: post.data,
      prev: prev.data,
      next: next.data,
    },
  };
};
