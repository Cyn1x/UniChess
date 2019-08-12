import React from 'react';
import { Route, Switch } from 'react-router-dom'

import { PlayArea } from '../../game/PlayArea';
import { Account } from '../dashboard/Account';
import { None } from '../global/None';
import { DashSplash } from '../dashboard/DashSplash';

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
