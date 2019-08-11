import React from 'react';
import { Route, Switch } from 'react-router-dom'

import { Dashboard } from '../dashboard/Dashboard';
import { PlayArea } from '../../game/PlayArea';
import { Account } from '../dashboard/Account';
import { None } from '../global/None';

export const DashRoutesManager = () => {
    return (
        <Route render={() => (
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route path='/dashboard' component={Dashboard} />
                    <Route path="/account" component={Account} />
                    <Route path='/play' component={PlayArea} />
                    <Route component={None} />
                </Switch>
        )} />
    )
}

export default DashRoutesManager;
