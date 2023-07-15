import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";

const Search = ({ forSlideOver }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { pathname } = router;

  const handleSearch = () => {
    if (query.trim() !== "") {
      router.push(`/search?q=${query.trim()}`);
      setQuery("");
    }
  };

  return (
    <div
      className={`flex items-center ml-5 ${
        forSlideOver ? "w-full h-[45px]" : "w-[250px] h-[35px]"
      }  bg-b3`}
    >
      <input
        type="text"
        className="bg-b3 w-full h-full box-border border-0 p-[5px] text-white text-base focus:outline-none placeholder:text-w5"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => (e.key == "Enter" ? handleSearch() : "")}
        value={query}
        placeholder="جستجو"
      />
      <FaSearch
        className={`box-border w-[35px] h-full text-w4 text-lg p-[5px] ${
          query.trim() !== "" ? "text-white" : ""
        }`}
        onClick={handleSearch}
      />
    </div>
  );
};

export default Search;
