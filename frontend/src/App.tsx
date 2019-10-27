import React from 'react';
import './App.css';
import { getTournamets } from './data/tournamentRepo';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

type stateType = { tournaments: string[] | undefined, selectedTournament: string | undefined };

class App extends React.Component<{}, stateType> {

  constructor(props: any) {
    super(props);

    this.state = {
      tournaments: undefined,
      selectedTournament: undefined
    }
  }

  componentDidMount() {
    getTournamets()
      .then(res => this.setState({
        tournaments: res
      }))
  }

  changeSelectedTournament(selected: string) {
    this.setState({
      selectedTournament: selected
    })
  }

  render() {
    return (
      <Router>
        <main>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <h1>About</h1>
            </Route>
            <Route path="/users">
              <h1>Users</h1>
            </Route>
            <Route path="/">
              <h1>Home</h1>
            </Route>
          </Switch>
        </main>
      </Router>
    )
  }
}

export default App;
