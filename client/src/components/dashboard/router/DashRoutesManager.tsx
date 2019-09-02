import React from 'react';
import { Route, Switch } from 'react-router-dom'

import { PlayArea } from '../dynamic/PlayArea';
import { Account } from '../dynamic/Account';
import { None } from '../../global/dynamic/None';
import { DashSplash } from '../dynamic/DashSplash';

export const DashRoutesManager = ({ match }: {match: any}) => {
    return (
        <Switch>
            <Route path="/dashboard/account" component={Account} />
            <Route path="/dashboard/play" component={PlayArea} />
            <Route exact path={match.url} render={() => (
                    <DashSplash match={match}/>
            )}/>
            <Route component={None} />
        </Switch>
    )
}

export default DashRoutesManager;
