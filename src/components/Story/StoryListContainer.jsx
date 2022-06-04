import { connect } from "react-redux";
import { fetchPosts } from "../../redux/actions";
import StoryList from "./StoryList";
import React from "react";
import Navibar from "../../components/common/Navibar";
import styled from "styled-components";

const mapStateToProps = (state) => {
  const {
    posts: { isFetching, items },
  } = state;
  return {
    isLoading: isFetching,
    posts: items,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPosts()),
});

// const wrapper = connect(mapStateToProps, mapDispatchToProps);
// // const StoryListContainer = wrapper(StoryList);
// const StoryListContainer = StoryList;
// export default StoryListContainer;

export default function StoryListContainer() {
  return (
    <Sections>
      <Navibar />
      <div>
        <StoryList />
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
    "storyList";
`;
