import React from 'react';
import { Router, Route, withRouter, Switch } from 'react-router-dom'
import { isAuthenticated } from '../../utilities/auth/Auth';

import { Dashboard } from '../dashboard/Dashboard';
import { Account } from '../dashboard/Account';
import { None } from '../global/None';

export const DashRoutes = () => {
    return (
        <Route render={() => (
            <Switch>
                <Route path='/dashboard' component={Dashboard} />
                <Route path="/account" component={Account} />
                <Route component={None} />
            </Switch>
        )} />
    )
}

export default DashRoutes;
