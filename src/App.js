import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'styles/app.scss';

import MainContainer from 'containers/MainContainer';
import CaseStudyContainer from 'containers/CaseStudyContainer';

class App extends Component {
  componentDidMount() {
    console.log(`
    ╦ ╦┌─┐┬  ┌─┐┌─┐┌┬┐┌─┐  ┌┬┐┌─┐  ┌┬┐┬ ┬┌─┐  ╔╦╗┌─┐ ╦┌─┐
    ║║║├┤ │  │  │ ││││├┤    │ │ │   │ ├─┤├┤    ║║│ │ ║│ │
    ╚╩╝└─┘┴─┘└─┘└─┘┴ ┴└─┘   ┴ └─┘   ┴ ┴ ┴└─┘  ═╩╝└─┘╚╝└─┘
    `);

    console.log('Explore window.HackerConsole for more info', window.HackerConsole);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            path='/:caseStudySlug'
            exact={true}
            component={CaseStudyContainer}
          />
          <Route
            path='/'
            component={MainContainer}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
