import { TfiFacebook } from "react-icons/tfi";
import { FaLinkedinIn, FaGithub, FaGlobe } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-4 mt-4 text-base text-gray-200 bg-b2">
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="text-2xl">ما را دنبال کنید:</h2>
        <div className="flex items-center justify-center gap-3">
          <a
            href="https://m.facebook.com/profile.php/?id=100090176271304"
            className="text-2xl hover:text-white hover:bg-[#3b5998] p-2 transition-all"
            target="_blank"
          >
            <TfiFacebook />
          </a>
          <a
            href="https://github.com/omidNM24"
            className="p-2 text-2xl transition-all hover:text-white hover:bg-black"
            target="_blank"
          >
            <FaGithub />
          </a>
          <a
            href="https://af.linkedin.com/in/omid24"
            className="p-2 text-2xl transition-all hover:text-white hover:bg-[#0077b5]"
            target="_blank"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://omid24.netlify.app/"
            className="p-2 text-2xl transition-all hover:text-black hover:bg-white"
            target="_blank"
          >
            <FaGlobe />
          </a>
        </div>
        <p className="text-sm text-zinc-400">
          .Copyright © {new Date().getFullYear()} Omid Nomani. All rights
          reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
