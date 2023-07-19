import React, { useState, useEffect } from "react";
import styles from "./../styles/Home.module.css";
import { createClient } from "@sanity/client";
import NewsCard from "@/components/NewsCard/NewsCard";
import Trending from "@/components/Trending/Trending";
import Link from "next/link";
import Weather from "@/components/Weather/Weather";
import HotNews from "@/components/HotNews/HotNews";
const client = createClient({
  projectId: "jiq87vtf",
  dataset: "production",
  apiVersion: "v2021-10-21",
  useCdn: false,
});
import Head from "next/head";

export default function Home({ sportArticles, newsArticles, hotNewsArticle }) {
  if (!(sportArticles || newsArticles || hotNewsArticle)) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <h1 className="text-4xl font-semibold text-red-800 xxs:text-4xl vs:text-3xl vvs:text-2xl">
          خطا حین گرفتن اطلاعات
        </h1>
      </div>
    );
  }
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    async function fetchHotNews() {
      const tenHotNews = await client.fetch(
        `*[_type in ["newsArticle", "sportArticles", "hotNewsArticles"]]
        | order(views desc)[0..7]
        {
          "title": title,
          "mainImage": mainImage.asset->,
          tags,
          slug,
          "views" : views
        }`
      );

      setTrending(tenHotNews);
    }
    fetchHotNews();
  }, []);

  return (
    <div className="flex justify-center w-full">
      <Head>
        <title>مهم ترین اخبار روز افغانستان و جهان | نیوز فلش</title>
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
          content=" خبر ها, اخبار افغانستان, اخبار تازه, فلش نیوز,اخبار روز"
        ></meta>
      </Head>
      <div className="grid min-h-screen grid-cols-4 xl:w-10/12 xl:grid-cols-4 lg:w-11/12 lg:grid-cols-4 md:w-11/12 vvs:w-full vvs:grid-cols-1">
        <div className="flex flex-col items-center col-span-3 gap-5 md:p-5 vvs:p-0">
          <HotNews data={hotNewsArticle} />
          <div className="box-border flex flex-col justify-center gap-5 p-2 items-left ">
            <h3 className="text-3xl font-bold text-b2">
              <Link className="link " href="/news">
                اخبار
              </Link>
            </h3>
            <div className="grid items-center justify-center w-full grid-cols-3 gap-5 md:grid vvs:flex vvs:flex-col vvs:divide-y vvs:divide-w4">
              {newsArticles.map((article) => (
                <NewsCard
                  key={article._id}
                  title={article.title}
                  excerpt={article.excerpt}
                  image={{ url: article.mainImage.url, alt: article.title }}
                  tags={article.tags}
                  id={article._id}
                  slug={article.slug.current}
                />
              ))}
            </div>
          </div>

          <div className="box-border flex flex-col justify-center gap-5 p-2 items-left ">
            <h3 className="text-3xl font-bold text-b2">
              <Link className="link" href="/sports">
                ورزش
              </Link>
            </h3>
            <div className="grid items-center justify-center w-full grid-cols-3 gap-5 md:grid vvs:flex vvs:flex-col vvs:divide-y vvs:divide-w4">
              {sportArticles.map((article) => (
                <NewsCard
                  key={article._id}
                  title={article.title}
                  excerpt={article.excerpt}
                  image={{ url: article.mainImage.url, alt: article.title }}
                  tags={article.tags}
                  id={article._id}
                  slug={article.slug.current}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-1 trendingMainContainer xl:flex-col lg:flex lg:flex-col md:grid md:grid-cols-3 sm:grid-cols-3">
          <div className="col-span-2">
            <Trending data={trending} />
          </div>
          <Weather />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const newsArticles = await client.fetch(
      `*[_type == "newsArticle"] | order(publishedAt desc) [0...3] {
        ...,
        "mainImage": mainImage.asset->
      }`
    );

    const sportArticles = await client.fetch(
      `*[_type == "sportArticles"] | order(publishedAt desc) [0...3] {
        ...,
        "mainImage": mainImage.asset->
      }`
    );

    const hotNewsArticle = await client.fetch(
      `*[_type == "hotNewsArticles"] | order(publishedAt desc) [0] {
        ...,
        "mainImage": mainImage.asset->
      }`
    );

    return {
      props: {
        newsArticles,
        sportArticles,
        hotNewsArticle,
      },
      revalidate: 600,
    };
  } catch (error) {
    return {
      props: {
        newsArticles: null,
        sportArticles: null,
        hotNewsArticle: null,
      },
    };
  }
}
