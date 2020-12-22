import React from 'react';
import { App, View } from 'framework7-react';
import { incrementCounter } from '../actions/index';
import { connect } from 'react-redux';
import routes from '../js/routes';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import index from '../reducers/index';


let store = createStore(index);
console.log(store.getState());


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
      <Provider store={store}>
        <div>
          <App params={this.state.f7params} >

            <View id="view-map" main tab tabActive url="/" />

          </App>
        </div>
      </Provider>
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