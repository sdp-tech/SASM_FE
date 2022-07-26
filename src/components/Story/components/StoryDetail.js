import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StoryContentBox from "./StoryDetailBox";

import { Link, useParams } from "react-router-dom";

const StoryDetail = () => {
  const params = useParams();
  //   useEffect(() => {
  //     console.log("PP", params);
  //     console.log(params.id);
  //   }, []);

  return (
    <>
      <span>현재 페이지 파라미터 : {params.id} </span>
      <StoryContentBox
        // key={index}
        id={params.id}
        // mainTitle={data.mainTitle}
        // storeName={data.storeName}
        // content={data.content}
      />
      {/* <Link to={`/story/${params}`}>{params}</Link> */}
    </>
  );
};

export default StoryDetail;

// import { useParams } from "react-router-dom";
// import { getInvoice } from "../data";

// export default function Invoice() {
//   let params = useParams();
//   let invoice = getInvoice(parseInt(params.invoiceId, 10));
//   return (
//     <main style={{ padding: "1rem" }}>
//       <h2>Total Due: {invoice.amount}</h2>
//       <p>
//         {invoice.name}: {invoice.number}
//       </p>
//       <p>Due Date: {invoice.due}</p>
//     </main>
//   );
// }
