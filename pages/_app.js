import "@/styles/globals.css";
import Navigation from "@/components/Navigation/Navigation";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./../store";
import Footer from "@/components/Footer/Footer";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export const store = configureStore({
  reducer: {
    mainState: stateReducer,
  },
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}
