import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Context, {FireBaseContext} from './FireBaseContext';
import Conetxt from './FireBaseContext';
import firebase from 'firebase';
ReactDOM.render(
  <FireBaseContext.Provider value={{firebase}}>
 <Context>
  <App /></Context>
  </FireBaseContext.Provider>
  ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
