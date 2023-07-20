import React, { useState, useEffect } from "react";
import { createClient } from "@sanity/client";
import { useRouter } from "next/router";
import styles from "./search.module.css";
import HorizontalNewsCard from "@/components/horizontalNewsCard/horizontalNewsCard";
import { FaSadTear } from "react-icons/fa";
import { Head } from "next/document";

const Search = () => {
  const [sportsArticles, setSportsArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const [sortOption, setSortOption] = useState("تازه ترین");
  const [sortedArticles, setSortedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const content = ["تازه ترین", "قدیمی ترین", "پربازدید ترین"];

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = createClient({
          projectId: "jiq87vtf",
          dataset: "production",
          apiVersion: "v2021-10-21",
          useCdn: false,
        });
        setLoading(true);

        const query = router.query.q;
        setQuery(query);

        const articles = await client.fetch(
          `*[(_type == "newsArticle" || _type == "sportArticles" || _type == 'hotNewsArticles')&& (title match "*${query}*" || title match "*${query}")] | order(publishedAt desc) {
            ...,
            "mainImage": mainImage.asset->
          }`
        );

        setSportsArticles(articles);
        setLoading(false);
        setError(false);
      } catch (error) {
        setSportsArticles([]);
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [router.query.q]);

  useEffect(() => {
    // Sort articles whenever sportsArticles or sortOption changes
    let sortedData = [...sportsArticles];

    switch (sortOption) {
      case "تازه ترین":
        sortedData.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
        break;
      case "قدیمی ترین":
        sortedData.sort(
          (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)
        );
        break;
      case "پربازدید ترین":
        sortedData.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }

    setSortedArticles(sortedData);
  }, [sportsArticles, sortOption]);

  if (error) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <h1 className="text-4xl font-semibold text-red-800 xxs:text-4xl vs:text-3xl vvs:text-2xl">
          خطا حین گرفتن اطلاعات
        </h1>
      </div>
    );
  }

  const handleSort = (option) => {
    setSortOption(option);
  };

  if (loading) {
    return (
      <div className="flex justify-center w-full min-h-screen mt-5">
        <div className="w-[80%] flex flex-col justify-center items-center h-screen">
          <div className={styles.loading}></div>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  if (sortedArticles.length === 0) {
    return (
      <div className="flex justify-center w-full min-h-screen mt-5">
        <div className="w-[80%] flex flex-col justify-center items-center h-screen">
          <div className="w-[500px] md:w-[500px] vvs:w-full h-[500px] flex flex-col items-center justify-start text-center">
            <FaSadTear className="text-[250px] text-b7" />
            <h1 className="m-4 text-xl font-semibold text-b3">
              هیچ نتیجه‌ ای پیدا نشد
            </h1>
            <p className="text-base text-b5">
              متأسفیم، اما هیچ نتیجه‌ ای مطابق با جستجوی شما یافت نشد. لطفا با
              استفاده از کلمات کلیدی دیگر جستجو را مجددا انجام دهید یا معیارهای
              جستجو خود را دقیق‌تر کنید.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full min-h-screen mt-8">
      <div className="flex flex-col gap-4 xl:w-8/12 lg:w-9/12 md:w-10/12 vvs:w-11/12">
        <div className="flex justify-between relative h-[40px]">
          <h1 className="text-3xl font-medium text-b4 xs:text-3xl vvs:text-2xl">
            نتایج جستجو برای "
            <span className="font-semibold text-b2">{query}</span>"
          </h1>
          <div>
            <div
              className={`w-[150px] xs:w-[150px] vvs:w-[100px] h-[40px] relative flex flex-col bg-red-500 justify-start gap-4 m-0 p-0 box-border cursor-pointer z-10 ${
                show ? "h-[200px]" : ""
              }`}
            >
              <button
                className={`w-[150px] xs:w-[150px] vvs:w-[100px] h-[40px] border-none text-white absolute text-medium z-50 font-semibold bg-b3 ${
                  show ? "bg-b1" : ""
                }`}
                onClick={() => setShow(!show)}
              >
                Sort by
              </button>
              {show && (
                <div
                  className={`w-[150px] xs:w-[150px] vvs:w-[100px] h-[150px] flex flex-col gap-2 justify-center items-center p-2 pt-[40px] divide-y bg-white absolute   border border-b5 shadow-lg text-medium m-0 font-semibold z-10 ${styles.slideIn}`}
                >
                  {content.map((c) => (
                    <p
                      key={c}
                      className={`h-full w-full flex justify-center items-center m-0 ${
                        sortOption === c ? styles.sortOptionActive : ""
                      }`}
                      onClick={() => handleSort(c)}
                    >
                      {c}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {sortedArticles.map((article) => (
          <HorizontalNewsCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Search;
