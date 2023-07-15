import React, { useState, useEffect } from "react";
import { createClient } from "@sanity/client";
import PageLayout from "@/components/PageLayout/PageLayout";

const client = createClient({
  projectId: "jiq87vtf",
  dataset: "production",
  apiVersion: "v2021-10-21",
  useCdn: false,
});

const Sports = ({ sportsArticles }) => {
  console.log(sportsArticles);
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    async function fetchHotSportArticles() {
      const tenHotNews = await client.fetch(
        `*[_type == "sportArticles"]
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
    fetchHotSportArticles();
  }, []);

  return (
    <PageLayout newsArticles={sportsArticles} trendingArticles={trending} />
  );
};

export async function getStaticProps() {
  try {
    const sportsArticles = await client.fetch(
      `*[_type == "sportArticles"] | order(publishedAt desc) {
          ...,
          "mainImage": mainImage.asset->
        }`
    );

    return {
      props: {
        sportsArticles,
      },
      revalidate: 1200,
    };
  } catch (error) {
    console.log("Error fetching data:", error);
    return {
      props: {
        sportsArticles: null,
      },
    };
  }
}

export default Sports;
