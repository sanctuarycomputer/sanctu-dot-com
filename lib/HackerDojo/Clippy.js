const Clippy = {
  agents: [
    'Clippy',
    'Bonzi',
    'F1',
    'Genie',
    'Genius',
    'Links',
    'Merlin',
    'Peedy',
    'Rocky',
    'Rover'
  ],

  addAgent(agentName) {
    let say = '';
    if (!Clippy.agents.includes(agentName)) {
      say = `${agentName} is not a valid agent. Try one of ${Clippy.agents.join(
        ', '
      )} instead! <3`;
      agentName = Clippy.agents[0];
    }

    window.clippy.load(agentName, function(agent) {
      agent.show();
      if (say.length) agent.speak(say);
    });
  }
};

export default Clippy;
