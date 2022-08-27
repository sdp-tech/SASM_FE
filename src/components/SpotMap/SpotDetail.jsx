import * as React from "react";
import { List } from "@mui/material";
import DetailCard from "./SpotDetail/DetailCard.js";

export default function SpotDetail(props) {
  console.log("hihi", props, props.children);
  const { modalClose } = props;

  return (
    <>
      <List
        style={{ maxHeight: "100%", overflow: "auto", padding: "10px" }}
        sx={{
          // gridArea: "spotlist",

          boxSizing: "border-box",
          position: "fixed",
          top: "16.3%",
          left: "28.7%",
          padding: "0px",
          margin: "0px",
          width: "100%",
          // height: "100%",
          height: "82.2%",
          overflow: "hidden",
          maxWidth: 360,
          bgcolor: "#F0F8FF",
        }}
      >
        <DetailCard
          ID={props.id}
          ImageURL={props.rep_pic}
          StoreName={props.StoreName}
          StoreType={props.StoreType}
          OpeningHours={props.mon_hours}
          Address={props.Address}
        />

        {/* <CloseButton></CloseButton> */}
        <button onClick={modalClose}>X</button>
      </List>
    </>
  );
}
