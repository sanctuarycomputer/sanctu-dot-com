import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HackerDojo from './lib/HackerDojo';

window.HackerDojo = HackerDojo;
ReactDOM.render(<App />, document.getElementById('root'));
