import dynamic from "next/dynamic";

const Juzhen = dynamic(() => import('./Juzhen'));
const Clippy = dynamic(() => import('./Clippy'));

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
  addAgent(agentName) {
    Clippy.addAgent(agentName);
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
