import React from "react";
import CurationDetailBox from "./components/CurationDetailBox";

import { useParams } from "react-router-dom";

const CurationDetail = () => {
  const params = useParams();

  return (
    <>
      <CurationDetailBox id={params.id} />
    </>
  );
};

export default CurationDetail;
