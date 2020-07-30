import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import HomeActions from "../actions/home-actions";
import HomeComponent from "../components/home-component/index";
const mapStateToProps = state => {
  return {
    searchWord: state.homeReducer.searchWord,
    newSearchAdded: state.homeReducer.newSearchAdded
  };
};

const mapDispatchToProps = dispatch => ({
  searchWord: (searchWord, cb) => {
    HomeActions.searchWord(searchWord, cb, dispatch);
  },
  newSearchWordAdded: () => {
    HomeActions.newSearchWordAdded(dispatch);
  },
  getImg: (searchWord, cb) => {
    HomeActions.getImg(searchWord, cb)
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeComponent));
