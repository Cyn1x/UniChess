import React from 'react';
import { Route, Switch } from 'react-router-dom'

import { Account } from '../dynamic/Account';
import { None } from '../../global/dynamic/None';
import Lobby from '../dynamic/Lobby';
import PlayArea from '../dynamic/PlayArea';

export function DashRoutesManager({ match }: {match: any}) {
    return (
        <Switch>
            <Route path="/dashboard/account" component={Account} />
            <Route path={"/dashboard/play"} component={PlayArea} />
            <Route exact path={match.url} render={() => (
                    <Lobby match={match}/>
            )}/>
            <Route component={None} />
        </Switch>
    )
}

export default DashRoutesManager;
