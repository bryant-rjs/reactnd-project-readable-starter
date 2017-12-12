import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const logger = store => next => action => {
  let result = next(action)
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

    <Provider store={store}>
      <BrowserRouter>
        <Route component={App}/>
      </BrowserRouter>
    </Provider>
  ,
  document.getElementById('root')
);

registerServiceWorker();
