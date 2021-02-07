import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// 用于覆盖上面定义的变量
import './App.global.css';

import SideBar from './layouts/sidebar/index';
import Main from './layouts/main/index';

import routes from './routers/index';

export default function App() {
  return (
    <Router>
      <Switch>
        <div className="layout">
          <div className="sidebar">
            <SideBar />
          </div>
          <div className="main">
            <Main>
              {routes.map((e) => {
                return <Route path={e.path} component={e.component} />;
              })}
            </Main>
          </div>
        </div>
      </Switch>
    </Router>
  );
}
