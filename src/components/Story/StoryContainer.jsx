import { connect } from "react-redux";
import { find } from "lodash";
import { fetchPost } from "../../redux/actions";
import Story from "./Story";
import React from "react";
import Navibar from "../../components/common/Navibar";
import styled from "styled-components";

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { id, slug },
    },
  } = ownProps;
  console.log("id", id);
  const post = find(state.posts.items, { id });
  return { id, post, slug };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPost: (id, slug) => dispatch(fetchPost(id, slug)),
});

// const wrapper = connect(mapStateToProps, mapDispatchToProps);
// // const StoryContainer = wrapper(Story);
// const StoryContainer = Story;
// export default StoryContainer;

export default function StoryContainer() {
  return (
    <Sections>
      <Navibar />
      <div>
        <Story />
      </div>
    </Sections>
  );
}

const Sections = styled.div`
  box-sizing: border-box;
  display: grid;
  position: relative;
  height: 100vh;
  grid-template-rows: 0.15fr 0.85fr;
  grid-template-areas:
    "navibar"
    "story";
`;
