import Link from "next/link";

const LatestNewsLayout = ({ newsArticles }) => {
  const squareArticles = [newsArticles[1], newsArticles[2]];

  return (
    <div className="flex flex-col items-center justify-center w-full gap-5 xs:gap-5 vvs:gap-3">
      <Link href={`/${newsArticles[0].slug.current}`} className="link">
        <div
          className="w-full h-[350px] bg-cover bg-no-repeat bg-center text-white flex flex-col justify-end items-start shadow-[inset_0_-200px_200px_10px_rgba(0,0,0,0.961)] cursor-pointer p-5 box-border hover:shadow-[inset_0_-200px_200px_10px_rgba(0,0,0,0.875)]"
          style={{
            backgroundImage: `url(${newsArticles[0].mainImage.url})`,
          }}
        >
          <h1 className="text-4xl font-semibold leading-relaxed tracking-tight shadow-md text-w2 md:text-4xl xxs:text-3xl vvs:text-3xl">
            {newsArticles[0].title}
          </h1>
          <p className="my-2 text-lg text-w4 line-clamp-2 xxs:line-clamp-2 vvs:hidden">
            {newsArticles[0].excerpt}
          </p>
          <p className="pr-1 my-0 text-base border-r-2 border-red-400 text-w5 text-opacity-80">
            {newsArticles[0].tags.slice(0, 1)}
          </p>
        </div>
      </Link>
      <div className="box-border grid justify-center w-full grid-cols-2 gap-5 xs:gap-5 vvs:gap-3">
        {squareArticles.map((article) => (
          <Link
            href={`/${article.slug.current}`}
            key={article._id}
            className="link "
          >
            <div
              className="w-full h-[350px] bg-center xs:h-[350px] vvs:h-[250px] bg-cover shadow-[inset_0_-250px_100px_-70px_rgb(0,0,0)] flex flex-col box-border justify-end text-w2 p-5 cursor-pointer hover:shadow-[inset_0_-250px_100px_-90px_rgb(0,0,0)]"
              style={{
                backgroundImage: `url(${article.mainImage.url})`,
              }}
            >
              <h1 className="text-xl tracking-tight line-clamp-2 text-w2 xs:text-xl vvs:text-lg">
                {article.title}
              </h1>
              <p className="my-2 text-base text-w3 line-clamp-2 xs:line-clamp-2 vvs:hidden">
                {article.excerpt}
              </p>
              <p className="pr-1 my-0 text-base border-r-2 border-red-400 text-w3 text-opacity-80 xs:text-base vvs:text-sm">
                {article.tags}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestNewsLayout;
