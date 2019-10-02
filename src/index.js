/*eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
// import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import reducer from './reducers/index'
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle'

const persistedState = loadState()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, persistedState, composeEnhancers(
  applyMiddleware(thunk)
));

store.subscribe(throttle(()=>{
  saveState({
    user: store.getState().user,
    allUsers: store.getState().allUsers,
    allSongs: store.getState().allSongs,
    allComments: store.getState().allComments
    // displaySong: store.getState().displaySong,
    // displayUser: store.getState().displayUser
  })
}, 2000))


ReactDOM.render(
<Provider store={store}>
  <Router>
    <App />
  </Router>
</Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
