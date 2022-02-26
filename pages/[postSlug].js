import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { setCommentCount, toggleComment } from "../store/settingsSlice";
import { Icon } from "../components/UI/Icon";
import {
  getAPostBySlug,
  getCountofComment,
  nextPost,
  prevPost,
} from "../components/api";
import style from "./../styles/Main.module.css";
import { useRouter } from "next/router";
import { ScrollFetch } from "../components/Main/ScrollFetch/ScrollFetch";

export default function SinglePost({ post, prev, next }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const [initialprevNext, setinitialprevNext] = useState({
    prevPost: prev ? prev : [],
    nextPost: next ? next : [],
  });
  const [currentPost, setcurrentPost] = useState(post);
  const [loadedPost, setloadedPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setinitialprevNext({ ...initialprevNext, prevPost: prev, nextPost: next });
  }, [prev, next]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => window.removeEventListener("scroll", infiniteScroll);
  }, [currentPost]);

  useEffect(() => {
    const getCountofComments = async () => {
      const count = await getCountofComment(post._id);
      dispatch(setCommentCount(count.count));
    };
    getCountofComments();
  }, []);

  const infiniteScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    } else {
      const ID = currentPost._id;
      setLoading(true);
      const findNextPost = await nextPost(ID);
      if (findNextPost.data[0] && loadedPost.length < 9) {
        const newPost = await getAPostBySlug(findNextPost.data[0].slug);
        setTimeout(() => {
          setcurrentPost(newPost.data);
          const joined = loadedPost.concat(newPost.data);
          setloadedPost(joined);
          router.push("/" + newPost.data.slug, undefined, { shallow: true });
          setLoading(false);
        }, 1000);
      } else {
        return;
      }
    }
  };

  return (
    <>
      <Head>
        <title>{currentPost.title} - Emre Güney Personal Blog</title>
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
                <img src={post.thumbnail} alt={post.title} />
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
                {initialprevNext.prevPost.length > 0 && (
                  <div className={style.prev}>
                    <Link href={`/${initialprevNext.prevPost[0].slug}`}>
                      <a>
                        <label>
                          <Icon.LeftArrow size="24" /> Older Post
                        </label>
                        <div className={style.content}>
                          <img
                            src={initialprevNext.prevPost[0].thumbnail}
                            alt={initialprevNext.prevPost[0].title}
                          />
                          <h3>{initialprevNext.prevPost[0].title}</h3>
                        </div>
                      </a>
                    </Link>
                  </div>
                )}
                {initialprevNext.nextPost.length > 0 && (
                  <div className={style.next}>
                    <Link href={`/${initialprevNext.nextPost[0].slug}`}>
                      <a>
                        <label>
                          Newer Post <Icon.RightArrow size="24" />
                        </label>
                        <div className={style.content}>
                          <h3>{initialprevNext.nextPost[0].title}</h3>
                          <img
                            src={initialprevNext.nextPost[0].thumbnail}
                            alt={initialprevNext.nextPost[0].title}
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
                      {settings.count === 1 ? (
                        <>
                          There is <strong>1</strong> comment
                        </>
                      ) : settings.count > 1 ? (
                        <>
                          There are <strong>${settings.count}</strong> comments
                        </>
                      ) : (
                        <>
                          There is <strong>no</strong> comment
                        </>
                      )}
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

            {/* infinite scroll */}
            <div className={style.loadedPosts}>
              {loadedPost.map((post, index) => (
                <ScrollFetch key={index} post={post} />
              ))}
              {/* loading spinner */}
              {loading && (
                <div className={style.loadingSpinner}>
                  <Icon.Spinner />
                  <label>Loading...</label>
                </div>
              )}
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
