import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const horizontalNewsCard = ({ article }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/${article.slug.current}`} className="link">
      <div
        className="relative grid w-full grid-cols-3 bg-white border cursor-pointer h-72 hover:shadow-md xs:h-72 vvs:h-52"
        key={article._id}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="col-span-1 overflow-hidden">
          <Image
            className="object-cover w-full transition-all duration-200 h-72 xs:h-72 vvs:h-52"
            src={article.mainImage.url}
            alt={article.title}
            width={500}
            height={500}
            style={hovered ? { transform: "scale(1.1)" } : {}}
          />
        </div>
        <div className="flex flex-col justify-between col-span-2 p-5">
          <div>
            <h1 className="mb-4 text-2xl font-semibold tracking-tight text-b2 xxs:text-2xl vvs:text-xl">
              {article.title}
            </h1>
            <p className="text-lg text-b3 md:text-lg vvs:text-base line-clamp-4 xs:line-clamp-4 vvs:hidden">
              {article.excerpt}
            </p>
          </div>
          <p className="pr-1 mx-0 text-base border-r-2 border-red-500 text-b5 justify-self-end xs:text-base vvs:text-sm">
            {article.tags.slice(0, 1)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default horizontalNewsCard;
