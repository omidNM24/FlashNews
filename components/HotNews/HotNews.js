import Link from "next/link";

const HotNews = ({ data }) => {
  return (
    <Link
      href={`/${data.slug.current}`}
      className="transition link hover:shadow-lg"
    >
      <div
        className="transition w-full h-[400px] bg-cover bg-no-repeat bg-center text-white flex flex-col justify-end cursor-pointer z-20 shadow-[inset_0_0_10px_black]  box-border items-start "
        style={{
          backgroundImage: `url(${data.mainImage.url})`,
        }}
      >
        <div className=" p-5 flex flex-col justify-between h-[50%] bg-white bg-opacity-70 xxs:p5 vvs:px-2">
          <h1 className="text-3xl font-semibold leading-tight text-b2">
            {data.title}
          </h1>
          <p className="my-2 text-lg text-b3 line-clamp-2 xs:text-lg xxs:line-clamp-2 vvs:text-base vvs:hidden">
            {data.excerpt}
          </p>

          <p className="pr-1 my-0 text-base border-r-2 border-red-400 text-b4 text-opacity-80">
            {data.tags}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HotNews;
