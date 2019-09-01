import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import AuthLogin, { isAuthenticated, PrivateRoute } from '../../utilities/auth/AuthLogin';

import { Layout } from '../../ui/global/Layout';
import { Home } from '../home/Home';
import { About } from '../home/About';
import { Contact } from '../home/Contact';
import { Signup } from '../home/Signup';
import { None } from '../global/None';
import DashRoutesManager from './DashRoutesManager';

export const HomeRoutesManager = () => {
    return (
      <BrowserRouter>
        <Route render={() => (
          <Layout auth={isAuthenticated.hasAuthenticated}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/login" component={AuthLogin} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute path='/dashboard' component={DashRoutesManager} />
              <Route component={None} />
            </Switch>
        </Layout>
        )} />
      </BrowserRouter>
    )
}
  
export default HomeRoutesManager;
