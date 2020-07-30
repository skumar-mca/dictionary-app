import React, { Component } from "react";
import './App.css';
import AppRoutes from './app.routes.js';
import CustomLoader from './components/loader-component/index';
class App extends Component {
  render() {
    const { loading } = this.props;
    return (
      <div className="App">
        {loading && <CustomLoader />}
        <AppRoutes />
      </div>
    );
  }
}

export default App;
