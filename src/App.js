import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth'

import AppNavbar from './components/layouts/AppNavbar';
import Dashboard from './components/layouts/Dashboard';
import AddClient from './components/clients/addClient';
import editClient from './components/clients/editClient';
import showClient from './components/clients/showClient';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Settings from './components/settings/Settings';

function App() {
  return (
      <div>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
              <Route exact path="/" component={UserIsAuthenticated(Dashboard)} />
              <Route exact path="/client/add" component={UserIsAuthenticated(AddClient)} />
              <Route exact path="/client/edit/:id" component={UserIsAuthenticated(editClient)} />
              <Route exact path="/client/:id" component={UserIsAuthenticated(showClient)} />
              <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
              <Route exact path="/signup" component={UserIsNotAuthenticated(Signup)} />
              <Route exact path="/settings"component={UserIsAuthenticated(Settings)} />
              </Switch>
            </div>
          </div>
      </Router>
      </div>
    
  ) 
}

export default App;
