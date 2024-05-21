import AllTags from "../components/AllTags";
import TagFilter from "../components/TagFilter";
import { useState } from "react";

const TagDetails = () => {
  const [allTags, setAllTags] = useState(true);

  const setSeeFilter = () => {
    setAllTags(false);
  };

  const setSeeAll = () => {
    setAllTags(true);
  };

  return (
    <>
      {allTags ? (
        <AllTags allTags={allTags}>
          <button onClick={setSeeFilter}>See journey through time...</button>
        </AllTags>
      ) : (
        <TagFilter allTags={allTags} setAllTags={setAllTags}>
          <button onClick={setSeeAll}>See all locations...</button>
        </TagFilter>
      )}
    </>
  );
};

export default TagDetails;
