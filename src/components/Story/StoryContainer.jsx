import { connect } from "react-redux";
import { find } from "lodash";
import { fetchPost } from "../../redux/actions";
import Story from "./Story";

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

const wrapper = connect(mapStateToProps, mapDispatchToProps);
// const StoryContainer = wrapper(Story);
const StoryContainer = Story;
export default StoryContainer;
