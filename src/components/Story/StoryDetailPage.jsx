import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StoryContentBox from "./components/StoryDetailBox";

import { Link, useParams } from "react-router-dom";

const StoryDetail = () => {
  const params = useParams();
  //   useEffect(() => {
  //     console.log("PP", params);
  //     console.log(params.id);
  //   }, []);

  return (
    <>
      <StoryContentBox id={params.id} />
      {/* <Link to={`/story/${params}`}>{params}</Link> */}
    </>
  );
};

export default StoryDetail;
