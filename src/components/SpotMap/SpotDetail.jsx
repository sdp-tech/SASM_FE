import * as React from "react";
import { List } from "@mui/material";
import DetailCard from "./SpotDetail/DetailCard.js";

export default function SpotDetail(props) {
  // console.log("hihi", props, props.children);
  // console.log("hihi2", props.children[0]);
  // console.log("hihi2", props.children[2]);

  return (
    <>
      <List
        style={{ maxHeight: "100%", overflow: "auto", padding: "10px" }}
        sx={{
          position: "fixed",
          top: "64px",
          left: "28%",
          padding: "0px",
          margin: "0px",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          maxWidth: 360,
          bgcolor: "#F0F8FF",
          // border: "1px solid red",
        }}
      >
        <DetailCard
          ImageURL={props.rep_pic}
          StoreName={props.StoreName}
          StoreType={props.StoreType}
          OpeningHours={props.mon_hours}
          Address={props.Address}
        />
      </List>
    </>
  );
}
