import React from "react";
import Router from "next/router";
import Head from "next/head";

import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";

import Header from "../components/Header/Header";

const queryClient = new QueryClient();

function Content({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    Router.events.on("routeChangeStart", () => setLoading(true));
    Router.events.on("routeChangeComplete", () => setLoading(false));
    Router.events.on("routeChangeError", () => setLoading(false));

    return () => {
      Router.events.off("routeChangeStart", () => setLoading(true));
      Router.events.off("routeChangeComplete", () => setLoading(false));
      Router.events.off("routeChangeError", () => setLoading(false));
    };
  }, []);

  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : (
        <>
          {/* Configure Shared session state */}
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>

          <Header subheader />
          <Component {...pageProps} />
        </>
      )}
    </>
  );
}

// top level component, should not get re-rendered
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Content Component={Component} pageProps={pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
