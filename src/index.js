import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import counter from './reducers/index';
import './index.css';

let store = createStore(counter);
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App/>
      <Route/>
    </div>
  </Provider>,
  document.getElementById('root')
);