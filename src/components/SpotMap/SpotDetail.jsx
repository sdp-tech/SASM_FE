import * as React from "react";
import { List } from "@mui/material";
import DetailCard from "./SpotDetail/DetailCard.js";

export default function SpotDetail(props) {
  return (
    <>
      <List
        style={{ maxHeight: "100%", overflow: "auto", padding: "10px" }}
        sx={{
          position: "fixed",
          top: "64px",
          left: "380px",
          padding: "0px",
          margin: "0px",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          maxWidth: 360,
          bgcolor: "#F0F8FF"
        }}
      >
        <DetailCard
          ImageURL={props.ImageURL}
          StoreName={props.StoreName}
          StoreType={props.StoreType}
          OpeningHours={props.OpeningHours}
          Address={props.Address}
        />
      </List>
    </>
  );
}
