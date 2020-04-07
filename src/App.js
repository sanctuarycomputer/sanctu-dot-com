import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'styles/app.scss';

import MainContainer from 'containers/MainContainer';
import CaseStudyContainer from 'containers/CaseStudyContainer';

class App extends Component {
  componentDidMount() {
    console.log('%c jobs: hello@sanctuary.computer', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');

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
