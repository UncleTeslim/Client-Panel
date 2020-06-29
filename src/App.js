import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNavbar from './components/layouts/AppNavbar';
import Dashboard from './components/layouts/Dashboard';
import AddClient from './components/clients/addClient';
import editClient from './components/clients/editClient';
import showClient from './components/clients/showClient';

function App() {
  return (
      <div>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/client/add" component={AddClient} />
                <Route exact path="/client/edit/:id" component={editClient} />
                <Route exact path="/client/:id" component={showClient} />
              </Switch>
            </div>
          </div>
      </Router>
      </div>
    
  ) 
}

export default App;
