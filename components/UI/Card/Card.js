import Image from "next/image";
import Link from "next/link";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import style from "../../../styles/Card.module.css";
import dateShow from "../../../utils/dateShow";

export const Card = ({ post }) => {
  const date = Math.ceil(
    Math.abs(new Date(post.createdAt) - new Date()) / (1000 * 60 * 60 * 24)
  );
  return (
    <Fade duration={400}>
      <Zoom duration={400}>
        <div className={style.card}>
          <article className="hoverGoTop">
            {post.tags.length > 0 && (
              <header>
                {post.tags.map((tag, index) => (
                  <Link key={index} href="/" alt="tag">
                    <a>{tag.name}</a>
                  </Link>
                ))}
              </header>
            )}
            {post.thumbnail !== "" && post.thumbnail && (
              <Link href={"/"+post.slug}>
                <a>
                  <div className={style.thumb}>
                    <img src={post.thumbnail} alt={post.title} />
                  </div>
                </a>
              </Link>
            )}
            <footer>
              <h3>
                <Link href={"/"+post.slug}>
                  <a>{post.title}</a>
                </Link>
              </h3>
              <div className={style.bottom}>
                <div className={style.date}>{dateShow(date)}</div>
                <button type="button" className={style.seeAll}>
                  <Link href={"/"+post.slug}>
                    <a>READ</a>
                  </Link>
                </button>
              </div>
            </footer>
          </article>
        </div>
      </Zoom>
    </Fade>
  );
};
