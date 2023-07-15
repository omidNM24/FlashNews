import React, { useState, useEffect } from "react";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "jiq87vtf",
  dataset: "production",
  token: process.env.REACT_APP_TOKEN,
  apiVersion: "v2021-10-21",
  useCdn: false,
});

const Comment = ({ data }) => {
  const [reactions, setReactions] = useState(data.reactions);

  const sortedReactions = Object.entries(reactions)
    .sort(([, valueA], [, valueB]) => valueB - valueA)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  const [activeKey, setActiveKey] = useState("");

  const textToEmoji = {
    thumbsUp: "👍",
    thumbsDown: "👎",
    sad: "😔",
    angry: "😡",
    party: "🎉",
    heart: "❤️",
    fire: "🔥",
    crying: "😭",
    cool: "😎",
    clap: "👏",
  };

  useEffect(() => {
    const comment = localStorage.getItem(`hasCommented_${data._id}`);
    if (comment !== null) {
      const parsedComment = JSON.parse(comment);
      setActiveKey(parsedComment.emoji);
    }
  }, [data._id]);

  const clickHandler = async (emoji) => {
    const updatedReactions = { ...reactions };
    if (emoji == activeKey) {
      setReactions(updatedReactions);
      updatedReactions[emoji]--;
      setActiveKey("");
      await client
        .patch(data._id)
        .dec({ [`reactions.${emoji}`]: 1 })
        .commit();
      localStorage.removeItem(`hasCommented_${data._id}`);
      //   localStorage.removeItem(`hasCommented_${data._id}`);

      return;
    } else if (activeKey && emoji !== activeKey) {
      localStorage.setItem(
        `hasCommented_${data._id}`,
        JSON.stringify({
          emoji: emoji,
        })
      );
      setReactions(updatedReactions);
      updatedReactions[emoji]++;
      updatedReactions[activeKey]--;
      setActiveKey(emoji);
      await client
        .patch(data._id)
        .dec({ [`reactions.${activeKey}`]: 1 })
        .commit();
      await client
        .patch(data._id)
        .inc({ [`reactions.${emoji}`]: 1 })
        .commit();
      return;
    }
    setReactions(updatedReactions);
    setActiveKey(emoji);
    updatedReactions[emoji]++;
    await client
      .patch(data._id)
      .inc({ [`reactions.${emoji}`]: 1 })
      .commit();
    localStorage.setItem(
      `hasCommented_${data._id}`,
      JSON.stringify({
        emoji: emoji,
      })
    );
  };

  return (
    <div dir="ltr" className="flex justify-center w-full my-5">
      <div
        className={`flex items-center justify-between lg:w-8/12  xs:overflow-visible vvs:overflow-x-scroll vvs:w-11/12 center`}
      >
        {Object.entries(sortedReactions).map(([key, value], i) => (
          <div
            key={key}
            className={`flex flex-col items-center  justify-center ${
              key == activeKey ? "opacity-100" : "opacity-70"
            } cursor-pointer transition text-3xl w-full h-[80px] hover:text-4xl active:text-3xl select-none hover:opacity-100`}
            onClick={() => clickHandler(key)}
          >
            <p className="drop-shadow-md ">{textToEmoji[key]}</p>
            <p
              className={`text-xl text-b5 ${
                key == activeKey ? "font-semibold" : ""
              }`}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
