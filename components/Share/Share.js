import {
  FacebookShareButton,
  EmailShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  LinkedinShareButton,
} from "react-share";
import { TfiFacebook } from "react-icons/tfi";
import { BsTwitter } from "react-icons/bs";
import { BsReddit } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";

const Share = (props) => {
  console.log(`https://flash-news24.netlify.app/${props.url.articleId}`);
  return (
    <div className="flex justify-center w-full my-10">
      <div className="flex items-center justify-between w-full gap-2 text-lg text-white">
        <div className="w-full  h-[50px] bg-[#3b5998] hover:bg-[#2b4782]">
          <FacebookShareButton
            url={`https://flash-news24.netlify.app/${props.url.articleId}`}
            quote="good news!!!"
            hashtag="#muo"
            className="flex items-center justify-center w-full h-full gap-2"
          >
            <p className="md:block vvs:hidden">Share</p>{" "}
            <TfiFacebook className="text-2xl" />
          </FacebookShareButton>
        </div>
        <div className="w-full  h-[50px] bg-[#00acee] hover:bg-[#008cc3]">
          <TwitterShareButton
            url={`https://flash-news24.netlify.app/${props.url.articleId}`}
            title="here will be a title soon"
            hashtag="#muo"
            className="flex items-center justify-center w-full h-full gap-2"
          >
            <p className="md:block vvs:hidden">Tweet</p>{" "}
            <BsTwitter className="text-2xl" />
          </TwitterShareButton>
        </div>
        <div className="w-full  h-[50px] bg-b5 hover:bg-[#444]">
          <EmailShareButton
            url={`https://flash-news24.netlify.app/${props.url.articleId}`}
            subject="watch this:"
            className="flex items-center justify-center w-full h-full gap-2"
          >
            <p className="md:block vvs:hidden">Email</p>{" "}
            <MdEmail className="text-2xl" />
          </EmailShareButton>
        </div>
        <div className="w-full  h-[50px] bg-[#25d366] hover:bg-[#16b14f]">
          <WhatsappShareButton
            url={`https://flash-news24.netlify.app/${props.url.articleId}`}
            title="here will be the title"
            separator="  "
            className="flex items-center justify-center w-full h-full gap-2"
          >
            <p className="md:block vvs:hidden">Share</p>{" "}
            <IoLogoWhatsapp className="text-2xl" />
          </WhatsappShareButton>
        </div>
        <div className="w-full  h-[50px] bg-[#0072b1] hover:bg-[#00689f]">
          <LinkedinShareButton
            url={`https://flash-news24.netlify.app/${props.url.articleId}`}
            title="here will be a title soon"
            className="flex items-center justify-center w-full h-full gap-2"
          >
            <p className="md:block vvs:hidden">Share</p>{" "}
            <BsLinkedin className="text-2xl" />
          </LinkedinShareButton>
        </div>
        <div className="w-full  h-[50px] bg-[#FF4500] hover:bg-[#e53d00]">
          <RedditShareButton
            url={`https://flash-news24.netlify.app/${props.url.articleId}`}
            title="here will be a title soon"
            className="flex items-center justify-center w-full h-full gap-2"
          >
            <p className="md:block vvs:hidden">Share</p>{" "}
            <BsReddit className="text-2xl" />
          </RedditShareButton>
        </div>
      </div>
    </div>
  );
};

export default Share;
