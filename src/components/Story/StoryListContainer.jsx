import { connect } from "react-redux";
import { fetchPosts } from "../../redux/actions";
import StoryList from "./StoryList";

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

const wrapper = connect(mapStateToProps, mapDispatchToProps);
// const StoryListContainer = wrapper(StoryList);
const StoryListContainer = StoryList;
export default StoryListContainer;
