import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { AppState } from '../../utilities/store';

import { connectSocket } from '../store/socket/actions';
import { updateSessionState } from '../../utilities/store/system/actions';
import { SystemState } from "../store/system/types";

import Login from '../../home/dynamic/Login';

export const Auth = {
    hasAuthenticated: false,
    authenticate(cb: () => void) {
        this.hasAuthenticated = true
        setTimeout(cb, 1000)
    },
    signout(cb: () => void) {
        this.hasAuthenticated = false
        setTimeout(cb, 1000)
    }
}

interface IAuthenticateDispatchProps {
    connectToSockets: () => void;
    updateSessionState: (systemState: SystemState) => void;
  }

interface IAuthenticate {
    connectToSockets: () => void;
    updateSessionState: (systemState: SystemState) => void;
    system: SystemState;
    location: any;
}

class Authenticate extends React.Component<IAuthenticate> {    
    state = {
        loggedIn: false,
        redirectToDashboard: false,
        userName: ""
    }

    login = (name: string) => {
        Auth.authenticate(() => {
            this.setState(() => ({
                redirectToDashboard: true,
                userName: name
            }))
            this.props.connectToSockets();
            this.props.updateSessionState({
                loggedIn: this.state.loggedIn,
                session: "sessionId",
                userName: this.state.userName
            });
        })
    }

    signout = () => {
        
    }
    
    static hasAuthenticated: boolean;
    
    render() {
        const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
        const { redirectToDashboard } = this.state
        
        if (redirectToDashboard === true) {
            return <Redirect to={from} />
        }
        
        return (
            <Login clicked={this.login} />
        )
    }
}

export const PrivateRoute = ({ component: Component, ...rest }: { component: any, path: string }) => (
    <Route {...rest} render={(props) => (
        Auth.hasAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: '/dashboard' }
        }} />
    )} />
)

const mapStateToProps = (state: AppState) => ({
    system: state.systemState,
    socket: state.socketState
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): IAuthenticateDispatchProps => ({
    connectToSockets: () => dispatch(connectSocket()),
    updateSessionState: (systemState: SystemState) => dispatch(updateSessionState(systemState))
});

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);
