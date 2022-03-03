import Head from "next/head";
import { useRouter } from "next/router";
import style from "../../styles/Main.module.css";
import parse from "html-react-parser";
import { getAllPages, getAPageBySlug } from "../../components/api";
import Link from "next/link";
import { Icon } from "../../components/UI/Icon";
import { useDispatch } from "react-redux";
import { setDarkMode } from "../../store/settingsSlice";
import { useEffect } from "react";

export default function SinglePage({ page }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log(localStorage.getItem("darkmode"))
    if (localStorage.getItem("darkmode") === "true") {
      dispatch(setDarkMode(true));
    }
  },[]);

  return (
    <>
      <Head>
        <title>{page.title} - Emre Güney Personal Blog</title>
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
                <Link href={`/pages/${router.query.pageSlug}`}>
                  <a>{page.title}</a>
                </Link>
              </div>
              <h2>{page.title}</h2>
            </header>
            <div className={style.postContextWrapper}>
              <section className={style.postContext}>
                {parse(page.text)}
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths = async () => {
  const { data } = await getAllPages();

  const paths = data.map((page) => ({
    params: { pageSlug: page.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  try {
    const page = await getAPageBySlug(params.pageSlug);
    return {
      props: {
        page: page.data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
