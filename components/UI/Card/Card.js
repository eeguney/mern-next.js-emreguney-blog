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
          <Link href={"/" + post.slug}>
            <a>
              <article className="hoverGoTop">
                {post.tags.length > 0 && (
                  <header>
                    {post.tags.map((tag, index) => (
                      <span key={index}>{tag.name}</span>
                    ))}
                  </header>
                )}
                {post.thumbnail !== "" && post.thumbnail && (
                  <div className={style.thumb}>
                    <img src={post.thumbnail} alt={post.title} />
                  </div>
                )}
                <footer>
                  <h3>{post.title}</h3>
                  <div className={style.bottom}>
                    <div className={style.date}>{dateShow(date)}</div>
                    <button type="button" className={style.seeAll}>
                      READ
                    </button>
                  </div>
                </footer>
              </article>
            </a>
          </Link>
        </div>
      </Zoom>
    </Fade>
  );
};
