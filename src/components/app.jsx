import React from 'react';
import { App, View } from 'framework7-react';
import { incrementCounter } from '../actions/index';
import { connect } from 'react-redux';
import routes from '../js/routes';


export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Framework7 Parameters
      f7params: {
        // App routes
        routes: routes,
      },
    }
  }

  render() {
    return (
      <App params={this.state.f7params} >

        <View id="view-map" main tab tabActive url="/" />

      </App>
    )
  }
}

/*let mapStateToProps = function (state) {
  return {
    value: state.counter
  }
}
let mapDispatchToProps = {
  onIncrement: incrementCounter
}
let AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;*/