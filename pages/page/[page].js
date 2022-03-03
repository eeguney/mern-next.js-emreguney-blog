import Head from "next/head";
import { useRouter } from "next/router";
import { ITEM_PER_PAGE } from "../../constants/constants";
import { getAllPost, getCountofPosts, getGitHub } from "../../components/api";
import { Main } from "./../../components/Main/Main";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setDarkMode } from "../../store/settingsSlice";

export default function Page({ blogList, gitHub, totalCount }) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("darkmode") === "true") {
      dispatch(setDarkMode(true));
    }
  }, []);
  return (
    <>
      <Head>
        <title>Page 2 - Emre Güney Personal Blog</title>
        <meta name="description" content="Frontend developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main
        page={Number(router.query.page)}
        blogList={blogList}
        gitHub={gitHub}
        totalCount={totalCount}
      />
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  try {
    const response = await getAllPost();
    const gitHub = await getGitHub();
    const totalCount = await getCountofPosts();
    return {
      props: {
        blogList: response.data.slice(
          Number(query.page) * ITEM_PER_PAGE - ITEM_PER_PAGE,
          Number(query.page) * ITEM_PER_PAGE
        ),
        gitHub: gitHub.data,
        totalCount: totalCount.data.count,
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
