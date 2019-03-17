import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import MenuBar from 'menu/MenuBar.js';
import history from 'utils/history.js';
import Home from 'views/Home/Home.js';
import Photos from 'views/Photos/Photos.js';
import Detail from 'views/Detail/Detail.js';
import NewPlant from 'views/NewPlant/NewPlant.js';

class App extends Component {
  render() {
    return (
      <div>
        <MenuBar />
        <Router history={history}>
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route path={'/photos'} component={Photos} />
            <Route path={'/plant/:id'} component={Detail} />
            <Route path={'/new'} component={NewPlant} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
