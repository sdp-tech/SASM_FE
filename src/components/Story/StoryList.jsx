import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import Waypoint from "react-waypoint";
// import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { truncate } from "../../helpers/utilities";

export const TRUNCATION_LIMIT = 150;

const StoryList = () => {
  const infos = require("./data.json");
  console.log("info", infos.Story);
  const posts = infos.Story;

  //   render() {
  //     const { fetchPosts, isLoading, posts } = this.props;

  return (
    <>
      {/* <Navibar /> */}
      <div>
        {/* posts */}
        {posts.map(({ id, maintitle, content, date, slug }, index) => (
          <List key={index}>
            <Link
              to={`/story/${id}/${slug}`}
              style={{ textDecoration: "none" }}
            >
              <ListItem>
                <article style={{ lineHeight: 1.35 }}>
                  <h2>
                    <strong>{maintitle}</strong>
                  </h2>
                  <p>{truncate(content, TRUNCATION_LIMIT)}&hellip;</p>
                  <div style={{ textAlign: "right" }}>
                    {/* <time dateTime={date}>{moment(date).fromNow()}</time> */}
                  </div>
                </article>
              </ListItem>
            </Link>
            <Divider />
          </List>
        ))}

        {/* waypoint */}
        {/* {!isLoading && <Waypoint onEnter={fetchPosts} />} */}
        <br />
        <br />

        {/* progress */}
        <div style={{ textAlign: "center" }}>
          {/* <CircularProgress size={80} thickness={6} /> */}
        </div>
        <br />
      </div>
    </>
  );
  //   }
};

export default StoryList;
