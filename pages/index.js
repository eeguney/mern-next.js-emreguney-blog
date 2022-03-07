import Head from "next/head";
import { getAllPost } from "../components/api";
import { Main } from "./../components/Main/Main";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setDarkMode } from "../store/settingsSlice";

export default function Home({ blogList }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("darkmode") === "true") {
      dispatch(setDarkMode(true));
    }
  },[]);

  return (
    <>
      <Head>
        <title>Emre Güney Personal Blog</title>
        <meta name="description" content="Frontend developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main page={1} blogList={blogList} />
    </>
  );
}

export const getServerSideProps = async () => {
  const response = await getAllPost();
  console.log("dene")
  return {
    props: {
      blogList: response.data.slice(0, 15)
    },
  };
};
