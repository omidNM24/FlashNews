import React, { useState, useEffect } from "react";
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

import { createClient } from "@sanity/client";
const client = createClient({
  projectId: "jiq87vtf",
  dataset: "production",
  token: process.env.REACT_APP_TOKEN,
  apiVersion: "v2021-10-21",
  useCdn: false,
});

const Share = (props) => {
  const [error, setError] = useState(null);
  async function incShareCount(company) {
    try {
      await client
        .patch(props.id)
        .inc({ [`shares.${company}`]: 1 })
        .commit();
    } catch (error) {
      console.error("Error while adding share count:", error);
    }
  }
  const handleEmailShare = () => {
    const subject = encodeURIComponent(props.title);
    const body = encodeURIComponent(
      `Check out this article: https://flash-news24.netlify.app/${props.url.articleId}`
    );

    const emailLink = `mailto:?subject=${subject}&body=${body}`;
    window.open(emailLink, "_blank");

    setTimeout(() => {
      incShareCount("email");
    }, 1000);
  };
  return (
    <div className="flex justify-center w-full my-10">
      <div className="flex items-center justify-between w-full gap-2 text-lg text-white">
        <div className="w-full  h-[50px] bg-[#3b5998] hover:bg-[#2b4782]">
          <FacebookShareButton
            url={`https://flash-news24.netlify.app/${props.url.articleId}`}
            quote={props.title}
            hashtag="#muo"
            className="flex items-center justify-center w-full h-full gap-2"
            onClick={() => incShareCount("facebook")}
          >
            <p className="md:block vvs:hidden">Share</p>{" "}
            <TfiFacebook className="text-2xl" />
          </FacebookShareButton>
        </div>
        <div className="w-full  h-[50px] bg-[#00acee] hover:bg-[#008cc3]">
          <TwitterShareButton
            url={`https://flash-news24.netlify.app/${props.url.articleId}`}
            title={props.title}
            hashtag="#muo"
            className="flex items-center justify-center w-full h-full gap-2"
            onClick={() => incShareCount("twitter")}
          >
            <p className="md:block vvs:hidden">Tweet</p>{" "}
            <BsTwitter className="text-2xl" />
          </TwitterShareButton>
        </div>
        <div className="w-full  h-[50px] bg-b5 hover:bg-[#444]">
          <EmailShareButton
            url={`https://flash-news24.netlify.app/${props.url.articleId}`}
            subject={props.title}
            className="flex items-center justify-center w-full h-full gap-2"
            onClick={() => handleEmailShare()}
          >
            <p className="md:block vvs:hidden">Email</p>{" "}
            <MdEmail className="text-2xl" />
          </EmailShareButton>
        </div>
        <div className="w-full  h-[50px] bg-[#25d366] hover:bg-[#16b14f]">
          <WhatsappShareButton
            url={`https://flash-news24.netlify.app/${props.url.articleId}`}
            title={props.title}
            separator="  "
            className="flex items-center justify-center w-full h-full gap-2"
            onClick={() => incShareCount("whatsApp")}
          >
            <p className="md:block vvs:hidden">Share</p>{" "}
            <IoLogoWhatsapp className="text-2xl" />
          </WhatsappShareButton>
        </div>
        <div className="w-full  h-[50px] bg-[#0072b1] hover:bg-[#00689f]">
          <LinkedinShareButton
            url={`https://flash-news24.netlify.app/${props.url.articleId}`}
            title={props.title}
            className="flex items-center justify-center w-full h-full gap-2"
            onClick={() => incShareCount("linkedIn")}
          >
            <p className="md:block vvs:hidden">Share</p>{" "}
            <BsLinkedin className="text-2xl" />
          </LinkedinShareButton>
        </div>
        <div className="w-full  h-[50px] bg-[#FF4500] hover:bg-[#e53d00]">
          <RedditShareButton
            url={`https://flash-news24.netlify.app/${props.url.articleId}`}
            title={props.title}
            className="flex items-center justify-center w-full h-full gap-2"
            onClick={() => incShareCount("reddit")}
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
