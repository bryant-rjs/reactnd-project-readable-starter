import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
// Redux Stuff
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import axios from 'axios'
import thunk from 'redux-thunk'
import reducer from './reducers'

const api = 'http://localhost:3001'

//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk, logger)
  )
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();

//store.dispatch({type: "FOO"});
store.dispatch((dispatch) => {
  //dispatch({type: "FOO"});
  // do something async
  // axios.get('http://localhost:3001/posts', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'mode': 'cors',
  //     'Authorization': '1018',
  //   }
  // }).then(res => {
  //   console.log("hello");
  //   console.log(res.data);
  // });

  fetch('http://localhost:3001/posts', {
    headers: {
      'Content-Type': 'application/json',
      'mode': 'cors',
      'Authorization': '1018',
    }
    }).then(res => res.json())
    .then(data => {
      console.log(data);
    });

})
//store.dispatch({type: "BAR"});
