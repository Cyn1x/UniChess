import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
// Remove this and use store system state
import Authenticate, { Auth, PrivateRoute } from '../../utilities/auth/Authentication';

import { Layout } from '../../global/static/Layout';
import { Home } from '../dynamic/Home';
import { About } from '../dynamic/About';
import { Contact } from '../dynamic/Contact';
import { Signup } from '../dynamic/Signup';
import { None } from '../../global/dynamic/None';
import DashRoutesManager from '../../dashboard/router/DashRoutesManager';

export const HomeRoutesManager = () => {
    return (
      <BrowserRouter>
        <Route render={() => (
          // TODO: Remove this and use store system state
          <Layout auth={Auth.hasAuthenticated}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/login" component={Authenticate} />
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
