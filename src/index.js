import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const HackerConsole = {  
  listeners: [],
  on(eventName, callback) {
    HackerConsole.listeners.push({ eventName, callback });
  },
  emit(eventName) {
    HackerConsole.listeners.filter(l => l.eventName === eventName).forEach(c => c.callback());
  },
  disableNightmode() {
    HackerConsole.emit('disableNightMode');
  },
  applyForJob() {
    console.log("Please email hello@sanctuary.computer for more information!");
  }
}

window.HackerConsole = HackerConsole;

ReactDOM.render(<App />, document.getElementById('root'));
