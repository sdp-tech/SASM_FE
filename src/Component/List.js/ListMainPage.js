import React from "react";
import "./styles.css";
import data from "./component/dummy/data.json";

export default function ListMain() {
//   console.log("arrayData: ", typeof arrayData);
//   console.log(arrayData);
//   console.log("objectData: ", typeof objectData);
//   console.log(objectData);
    console.log("data: ", typeof data);
    console.log(data);
  const newArrayData = arrayData.map((item, index) => {
    return (
      <li key={index}>
        {item.name}({item.location}) from {item.day}
      </li>
    );
  });

  return (
    <div className="ListMain">
      <ul className="container">{newArrayData}</ul>
      <h1>{objectData.welcomeMessage}</h1>
      <h2>you connected to {objectData.localAddress}</h2>
      {objectData.isDevEnv ? (
        <span>this is development environment</span>
      ) : null}
    </div>
  );
}
