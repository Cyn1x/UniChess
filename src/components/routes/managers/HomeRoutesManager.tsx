import React from 'react';
import { Route, Switch } from 'react-router-dom'
import AuthLogin, { isAuthenticated, PrivateRoute } from '../../utilities/auth/AuthLogin';

import { Layout } from '../../ui/global/Layout';
import { Home } from '../home/Home';
import { About } from '../home/About';
import { Contact } from '../home/Contact';
import { Signup } from '../home/Signup';
import { None } from '../global/None';
import { Dashboard } from '../dashboard/Dashboard';

export const HomeRoutesManager = () => {
    return (
        <Route render={() => (
          <Layout authenticated={isAuthenticated.hasAuthenticated}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/login" component={AuthLogin} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute path='/dashboard' component={Dashboard} />
              <Route component={None} />
            </Switch>
        </Layout>
        )} />
    )
}
  
export default HomeRoutesManager;