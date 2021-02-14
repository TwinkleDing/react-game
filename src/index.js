import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Game from './pages/game.js';
import Song from './pages/song.js';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path='/' component={Game}></Route>
      <Route path='/game' component={Game}></Route>
      <Route path='/song' component={Song}></Route>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
