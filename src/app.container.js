import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = state => {
  return {
    loading: state.commonReducer.loading,
  }
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

