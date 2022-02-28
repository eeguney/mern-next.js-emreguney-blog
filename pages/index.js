import Head from "next/head";
import { getAllPost, getGitHub } from "../components/api";
import { Main } from "./../components/Main/Main";

export default function Home({ blogList, gitHub }) {
  return (
    <>
      <Head>
        <title>Emre Güney Personal Blog</title>
        <meta name="description" content="Frontend developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main page={1} blogList={blogList} gitHub={gitHub} />
    </>
  );
}

export const getStaticProps = async () => {
  const response = await getAllPost();
  const gitHub = await getGitHub();

  return {
    props: {
      blogList: response.data.slice(0,15),
      gitHub:  gitHub.data,
    },
  };
};
