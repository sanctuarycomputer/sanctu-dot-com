import Juzhen from './Juzhen';

const HackerDojo = {
  listeners: [],
  on(eventName, callback) {
    HackerDojo.listeners.push({ eventName, callback });
  },
  emit(eventName) {
    HackerDojo.listeners
      .filter(l => l.eventName === eventName)
      .forEach(c => c.callback());
  },
  toggleJuzhen() {
    Juzhen.toggle();
  },
  enableNightmode() {
    HackerDojo.emit('enableNightmode');
  },
  disableNightmode() {
    HackerDojo.emit('disableNightmode');
  },
  applyForJob() {
    console.log('Please email hello@sanctuary.computer for more information!');
  }
};

export default HackerDojo;
