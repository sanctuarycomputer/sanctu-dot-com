import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const HackerDojo = {  
  listeners: [],
  on(eventName, callback) {
    HackerDojo.listeners.push({ eventName, callback });
  },
  emit(eventName) {
    HackerDojo.listeners.filter(l => l.eventName === eventName).forEach(c => c.callback());
  },
  enableNightmode() {
    HackerDojo.emit('enableNightmode');
  },
  disableNightmode() {
    HackerDojo.emit('disableNightmode');
  },
  applyForJob() {
    console.log("Please email hello@sanctuary.computer for more information!");
  }
}

window.HackerDojo = HackerDojo;

ReactDOM.render(<App />, document.getElementById('root'));
