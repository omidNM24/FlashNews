import React from "react";
import Image from "next/image";
import Link from "next/link";

const Trending = ({ data }) => {
  console.log(data);

  return (
    <div className="flex flex-col items-center gap-6 px-3 py-5 bg-white">
      <h1 className="m-0 text-xl font-medium tracking-tighter">
        پر بیننده ترین خبر ها
      </h1>
      <div className="flex flex-col gap-2 xl:flex lg:flex md:grid md:grid-rows-2 md:grid-cols-2">
        {data.map((trendingArticle) => (
          <Link
            href={"/" + trendingArticle.slug.current}
            className="link"
            key={trendingArticle.slug.current}
          >
            <div className="flex items-start gap-2 h-[80px] bg-gray-100 hover:bg-gray-200 cursor-pointer">
              <Image
                className="w-[100px] h-full object-cover"
                src={trendingArticle.mainImage.url}
                width={100}
                height={80}
                alt={trendingArticle.title}
              />

              <div className="flex flex-col justify-around h-full p-1">
                <h2 className="text-sm font-medium tracking-tight text-b2 line-clamp-2">
                  {trendingArticle.title}
                </h2>
                <p className="text-xs text-b4">{trendingArticle.tags}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Trending;
