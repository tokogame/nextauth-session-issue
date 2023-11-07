import React from "react";
import { NextSeo } from "next-seo";

function index() {
  return (
    <div>
      <NextSeo noindex={true} />
    </div>
  );
}

export default index;
