import React, { useState, useEffect } from "react";
import { createClient } from "next-sanity";
import Comment from "@/components/Comment/Comment";
import Share from "@/components/Share/Share";
import urlBuilder from "@sanity/image-url";
import Recomended from "@/components/Recomended/Recomended";
import { BiTimeFive } from "react-icons/bi";
import Link from "next/link";
import dotenv from "dotenv";
dotenv.config();
import htm from "htm";
import vhtml from "vhtml";
import { toHTML, uriLooksSafe } from "@portabletext/to-html";
import Image from "next/image";
import Head from "next/head";

const html = htm.bind(vhtml);

const client = createClient({
  projectId: "jiq87vtf",
  dataset: "production",
  token: process.env.REACT_APP_TOKEN,
  apiVersion: "v2021-10-21",
  useCdn: false,
});

const urlFor = (source) =>
  urlBuilder({ projectId: "jiq87vtf", dataset: "production" }).image(source);

const ArticleDetails = ({ data, url }) => {
  const [similarArticles, setSimilarArticles] = useState([]);
  const date = new Date(data.publishedAt);
  const formatedDate = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}`;
  if (data == undefined) {
    return <p>Loading...</p>;
  }

  const tags = data.tags;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsArticles =
          await client.fetch(`*[_type == "newsArticle" || _type == "sportArticles" || _type == 'hotNewsArticles']{
          "tags": tags[],
          "title": title,
          "date": publishedAt,
          "slug": slug,
          "mainImage": mainImage.asset->
        }`);
        const similar = [];
        newsArticles.forEach((article) => {
          tags.forEach((tag) => {
            if (
              article.tags.includes(tag) &&
              article.slug.current !== data.slug.current
            ) {
              similar.push(article);
            }
          });
        });
        setSimilarArticles(similar);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [data]);

  console.log(data.content);
  const myPortableTextComponents = {
    types: {
      image: ({ value }) =>
        html`<img className="w-full" src=${urlFor(value.asset)} />`,
      callToAction: ({ value, isInline }) =>
        isInline
          ? html`<a className="bg-red-500" href="${value.url}"
              >${value.text}</a
            >`
          : html`<div class="callToAction">${value.text}</div>`,
    },
  };
  return (
    <div className="flex justify-center w-full text-base">
      <Head>
        <title>{data.title} | نیوز فلش</title>
        <meta name="description" content={data.excerpt}></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta name="keywords" content={data.tags.join(" ")}></meta>
      </Head>
      <div className="min-h-screen pt-5 xl:w-6/12 lg:w-7/12 md:w-8/12 sm:w-9/12 xs:w-10/12 vvs:w-11/12">
        <h1 className="text-4xl font-semibold text-b2 sm:text-4xl vvs:text-3xl">
          {data.title}
        </h1>
        <p className="flex items-center gap-1 my-4 tracking-wider text-gray-700 xs:text-base vvs:text-sm">
          <BiTimeFive className="text-lg" /> {formatedDate}
        </p>
        <Image
          className="w-full my-5"
          src={data.mainImage.url}
          width={1080}
          height={720}
          alt={data.title}
        />
        <article className="max-w-full leading-[1.5] my-0 text-lg prose xs:text-lg vvs:text-base">
          <div
            className="my-0"
            dangerouslySetInnerHTML={{
              __html: toHTML(data.content, {
                components: myPortableTextComponents,
              }),
            }}
          />
        </article>

        <Comment data={data} />
        <Share />
        {similarArticles.length !== 0 ? (
          <div>
            <h1 className="mb-4 text-3xl font-semibold tracking-tight text-b4">
              مطالب مشابه{" "}
            </h1>
            {similarArticles.map((similarArticle) => {
              const date = new Date(similarArticle.date);
              const formatedDate = `${date.getFullYear()}/${
                date.getMonth() + 1
              }/${date.getDate()}`;
              return (
                <Link
                  className="link"
                  key={similarArticle.slug}
                  href={`/${similarArticle.slug.current}`}
                >
                  <Recomended
                    bgImage={similarArticle.mainImage}
                    title={similarArticle.title}
                    date={formatedDate}
                    slug={similarArticle.slug}
                  />
                </Link>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const articleIds =
    await client.fetch(`*[_type == "newsArticle" || _type == "sportArticles" || _type == 'hotNewsArticles']{
    slug
  }`);
  const paths = articleIds.map((article) => ({
    params: { articleId: `${article.slug.current}` },
  }));
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const newsArticles =
    await client.fetch(`*[slug.current == "${params.articleId}"]{
          ...,
          "mainImage": mainImage.asset->,
          "content": content[],
          "views" : views,
          'reactions' : reactions
        }`);
  try {
    await client.patch(newsArticles[0]._id).inc({ views: 1 }).commit();
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      data: newsArticles[0],
      url: params,
    },
    revalidate: 3600,
  };
}

export default ArticleDetails;
