import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import AuthLogin, { Authenticate, PrivateRoute } from '../../utilities/auth/Authentication';

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
          <Layout auth={Authenticate.hasAuthenticated}>
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
