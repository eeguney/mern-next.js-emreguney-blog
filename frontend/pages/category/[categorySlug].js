import Head from "next/head";
import { getPostsByCategory } from "../../components/api";
import { Main } from "./../../components/Main/Main";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { setDarkMode } from "../../store/settingsSlice";

export default function CategoryPage({ blogList }) {
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
        <title>Category {router.query.categorySlug} - Emre Güney Personal Blog</title>
        <meta name="description" content="Frontend developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main page={1} blogList={blogList} noTop={true} title={`Category: ${router.query.categorySlug}`} />
    </>
  );
}


export const getServerSideProps = async ({ query }) => {
  try {
    const response = await getPostsByCategory(query.categorySlug);
  return {
    props: {
      blogList: response.data,
    },
  };
  } catch (error) {
    console.log(error)
  }
};
