import React, { useState } from "react";
import Trending from "@/components/Trending/Trending";
import LatestNewsLayout from "@/components/LatestNewsLayout/LatestNewsLayout";
import Weather from "../Weather/Weather";
import HorizontalNewsCard from "../horizontalNewsCard/horizontalNewsCard";
import Head from "next/head";

const PageLayout = ({ newsArticles, trendingArticles }) => {
  const remainingArticles = newsArticles.slice(3);

  return (
    <div className="flex justify-center w-full">
      <Head>
        <title>مهم ترین اخبار روز افغانستان و جهان | افغان خبر</title>
        <meta
          name="description"
          content="با صفحه خبری ما در جریان آخرین اخبار و به روزرسانی‌ها از سراسر جهان باشید."
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          name="keywords"
          content=" خبر ها, اخبار افغانستان, اخبار تازه,افغان خبر,اخبار روز"
        ></meta>
      </Head>
      <div className="flex gap-[50px] xl:w-10/12 lg:flex-row lg:w-11/12 md:w-11/12 vvs:flex-col min-h-screen">
        <div className="w-full flex flex-col items-center pt-5 md:pt-5 vvs:pt-0 gap-[50px]">
          <LatestNewsLayout
            newsArticles={[newsArticles[0], newsArticles[1], newsArticles[2]]}
          />
          <div className="flex flex-col gap-5">
            {remainingArticles.map((article) => (
              <HorizontalNewsCard key={article._id} article={article} />
            ))}
          </div>
        </div>
        <div className="trendingMainContainer">
          <Trending data={trendingArticles} />
          <Weather />
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
