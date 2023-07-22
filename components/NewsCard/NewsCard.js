import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function newsCard(props) {
  const [hovered, setHovered] = useState(false);
  const zoomStyle = { transform: "scale(1.1)" };

  return (
    <Link key={props.id} href={`/${props.slug}`} className="link">
      <div
        className="w-full h-[500px] flex justify-center cursor-pointer md:bg-white md:h-[500px] xs:h-[250px] vvs:h-[150px]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="grid w-full grid-rows-2 transition hover:shadow-lg active:shadow-none md:grid-rows-2 md:grid-cols-1 bg-none vvs:grid-cols-3 vvs:grid-rows-1 ">
          <div className="overflow-hidden">
            <Image
              className="w-full h-[250px] object-cover transition-all duration-200 xs:h-[250px]  vvs:h-[150px]"
              src={props.image.url}
              width={400}
              height={300}
              alt={props.image.alt}
              style={hovered ? zoomStyle : {}}
            />
          </div>
          <div className="flex flex-col justify-between gap-4 pt-0 xs:px-5 xs-py-2 vvs:p-2 md:col-span-1 vvs:col-span-2">
            <div>
              <h1 className="mb-2 text-xl font-semibold tracking-tight line-clamp-3 text-b2 xxs:text-xl vvs:text-base ">
                {props.title}
              </h1>
              <p className="font-base text-b3 line-clamp-4 xs:line-clamp-4 vvs:hidden">
                {props.excerpt}
              </p>
            </div>
            <p className="pr-1 text-xs border-r-2 border-red-600 text-b5 ">
              {props.tags.slice(0, 1)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default newsCard;
