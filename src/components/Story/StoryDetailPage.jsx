import React from "react";
import StoryContentBox from "./components/StoryDetailBox";
import { useParams } from "react-router-dom";

const StoryDetail = () => {
  const params = useParams();

  return (
    <>
      <StoryContentBox id={params.id} />
    </>
  );
};

export default StoryDetail;
