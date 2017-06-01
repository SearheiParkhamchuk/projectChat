import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import App from './components/App';
import reducer from './reducers';

const middleware = [
  thunk
];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

render(
  <App store={store} />,
  document.getElementById('root')
);
