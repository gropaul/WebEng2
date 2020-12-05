import React, { Component } from 'react';
import { incrementCounter } from '../actions/index';
import { connect } from 'react-redux';
import './App.css';
import Maps from './Maps';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Maps></Maps>
      </div>
    );
  }
}

let mapStateToProps = function(state) {
  return {
    value: state.counter
  }
}
let mapDispatchToProps = {
  onIncrement: incrementCounter
}
let AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
