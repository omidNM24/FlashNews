import React, { useState } from "react";
import Link from "next/link";

const NavItem = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className="z-10 flex flex-col h-8 mt-2 text-base font-medium tracking-tight transition-all duration-500"
      onClick={() => (props.close ? close(true) : "")}
    >
      <Link
        href={props.url}
        className={`text-lg text-w2  ${props.active ? "text-w4" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {props.title}
      </Link>
      <span
        className={`line ${isHovered || props.active ? "" : "hidden"}`}
      ></span>
    </li>
  );
};

export default NavItem;
