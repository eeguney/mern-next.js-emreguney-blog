import "../styles/globals.css";
import { Layout } from "../components/Layout/Layout";
import { Provider } from "react-redux";
import store from "../store/store";

function MyApp({ Component, gitHub, pageProps }) {
  return (
    <Provider store={store}>
      <Layout gitHub={gitHub}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
