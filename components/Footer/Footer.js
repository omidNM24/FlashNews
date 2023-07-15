import { TfiFacebook } from "react-icons/tfi";
import { BsTwitter } from "react-icons/bs";
import { SiYoutube } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-4 mt-4 text-base text-gray-200 bg-b2">
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="text-2xl">ما را دنبال کنید:</h2>
        <div className="flex items-center justify-center gap-3">
          <a
            href="/"
            className="text-2xl hover:text-white hover:bg-[#3b5998] p-2 transition-all"
            target="_blank"
          >
            <TfiFacebook />
          </a>
          <a
            href="/"
            className="text-2xl hover:text-white hover:bg-[#00acee] p-2 transition-all"
            target="_blank"
          >
            <BsTwitter />
          </a>
          <a
            href="/"
            className="p-2 text-2xl transition-all hover:text-white hover:bg-red-600"
            target="_blank"
          >
            <SiYoutube />
          </a>
          <a
            href="/"
            className="p-2 text-2xl transition-all hover:text-white hover:bg-gradient-to-r hover:from-yellow-400 hover:via-red-600 hover:to-purple-700"
            target="_blank"
          >
            <RiInstagramFill />
          </a>
        </div>
        <p className="text-sm text-zinc-400">
          .Copyright © {new Date().getFullYear()} ____ News. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
