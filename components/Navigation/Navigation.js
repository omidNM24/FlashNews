import React, { useState } from "react";
import logo from "../../public/images/logo.png";
import NavItem from "./NavItem";
import { useRouter } from "next/router";
import { AiOutlineMenu } from "react-icons/ai";
import SlideOver from "../SlideOver/SlideOver";
import Search from "./../Search/Search";
import { MdOutlineClose } from "react-icons/md";

function Navigation() {
  const [status, setStatus] = useState(false);
  const router = useRouter();
  const { pathname } = router;

  const Closebtn = () => {
    return (
      <button
        type="button"
        className="text-white"
        onClick={() => setStatus(false)}
      >
        <span className="sr-only">Close panel</span>
        <MdOutlineClose className="w-6 h-6" aria-hidden="true" />
      </button>
    );
  };

  const overlay = () => (
    <div
      className="absolute inset-0 bg-black bg-opacity-40"
      onClick={() => setStatus(false)}
    ></div>
  );

  return (
    <div className="z-50 flex items-center justify-between h-16 max-w-full px-10 text-white bg-black">
      <div className="flex items-center gap-5">
        <img className="w-[50px] h-[50px]" src={logo.src} alt="logo" />
      </div>
      <div>
        <AiOutlineMenu
          className="text-3xl cursor-pointer md:hidden vvs:block"
          onClick={() => {
            setStatus(!status);
          }}
        />
        <SlideOver
          className="hidden"
          open={status}
          Closebtn={Closebtn}
          overlay={overlay}
          close={(stat) => {
            setStatus(stat);
          }}
        />
        <ul className="flex items-center gap-5 list-none md:flex vvs:hidden">
          <NavItem url="/" title="صفحه اصلی" active={pathname == "/"} />
          <NavItem url="news" title="خبر ها" active={pathname == "/news"} />
          <NavItem url="sports" title="ورزش" active={pathname == "/sports"} />
          <Search />
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
