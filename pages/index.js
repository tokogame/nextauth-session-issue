import React from "react";

export default function Home({}) {
  return <div>Hello world</div>;
}
export async function getStaticProps(context) {
  return {
    props: {},
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every x seconds
    revalidate: 300,
  };
}
