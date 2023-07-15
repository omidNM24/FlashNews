import React, { useState, useEffect } from "react";
import { createClient } from "@sanity/client";
import PageLayout from "@/components/PageLayout/PageLayout";

const client = createClient({
  projectId: "jiq87vtf",
  dataset: "production",
  apiVersion: "v2021-10-21",
  useCdn: false,
});

const News = ({ newsArticles }) => {
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    async function fetchHotNews() {
      const tenHotNews = await client.fetch(
        `*[_type == "newsArticle"]
        | order(views desc)[0..6]
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

  return <PageLayout newsArticles={newsArticles} trendingArticles={trending} />;
};

export async function getStaticProps() {
  try {
    const newsArticles = await client.fetch(
      `*[_type == "newsArticle"] | order(publishedAt desc) {
          ...,
          "mainImage": mainImage.asset->
        }`
    );

    return {
      props: {
        newsArticles,
      },
      revalidate: 1200,
    };
  } catch (error) {
    console.log("Error fetching data:", error);
    return {
      props: {
        newsArticles: null,
      },
    };
  }
}

export default News;
