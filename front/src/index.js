import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import reducerUser from './redux/Users/reducer';
import reducerNews from './redux/News/reducer';
import reducerTopics from './redux/Topics/reducer';
import reducerMainPageTOpic from './redux/MainPageTopic/reducer';
import reducerTests from './redux/Tests/reducer';
import reducerGroups from './redux/Groups/reducer';

// thunk!
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// //combinereducer!!!
const rootReducer = combineReducers({
  User: reducerUser,
  News: reducerNews,
  Topics: reducerTopics,
  MainPage: reducerMainPageTOpic,
  Test: reducerTests,
  Group: reducerGroups,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
