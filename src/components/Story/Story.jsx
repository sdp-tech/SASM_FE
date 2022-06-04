import React, { PureComponent } from "react";
import PropTypes from "prop-types";
// import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { getFullYear } from "../../helpers/utilities";

const footerHeight = 300;
const contentStyle = {
  minHeight: `calc(100vh - ${footerHeight}px)`,
};
const paperStyle = { padding: 16 };

const Story = () => {
  //   static propTypes = {
  //     fetchPost: PropTypes.func.isRequired,
  //     id: PropTypes.string.isRequired,
  //     post: PropTypes.shape({
  //       content: PropTypes.string,
  //       date: PropTypes.instanceOf(Date),
  //       maintitle: PropTypes.string,
  //     }),
  //     slug: PropTypes.string.isRequired,
  //   };

  const infos = require("./data.json");
  console.log("info", infos.Story);
  const posts = infos.Story;
  console.log("posts", posts);

  //   componentDidMount() {
  //     const { fetchPost, id, post, slug } = this.props;
  //     if (!post) {
  //       fetchPost(id, slug);
  //     }
  //   }

  const _renderProgress = () => {
    return (
      <div style={{ ...paperStyle, textAlign: "center" }}>
        <br />
        <CircularProgress size={80} thickness={6} />
      </div>
    );
  };

  const _renderPost = () => {
    const { mainTitle, date, content } = posts;
    console.log("mainTitle", mainTitle, content);
    return (
      <Paper zdepth={0} style={paperStyle}>
        <article>
          <h1>{mainTitle}</h1>
          {/* <time dateTime={date}>{moment(date).fromNow()}</time> */}
          <br />
          <br />
          <Divider />
          {content &&
            content
              .split("\n")
              .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </article>
      </Paper>
    );
  };

  //   render() {
  return (
    <>
      <div>
        <div style={contentStyle}>
          {posts ? _renderPost() : _renderProgress()}
          {/* {this.props.post ? _renderPost() : _renderProgress()} */}
        </div>
        <Divider />
        <Paper zdepth={0} style={paperStyle}>
          {/* <footer>Copyright {getFullYear()} Acme Corp.</footer> */}
          <footer>list</footer>
        </Paper>
      </div>
    </>
  );
  //   }
};
export default Story;
