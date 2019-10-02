import React from 'react'
import { connect } from "react-redux";
import { Dispatch, Action } from 'redux';
import { AppState } from "../../utilities/store";
import { Route, Redirect } from 'react-router-dom'
import { connectSocket } from "../store/socket/actions"
import { updateSession } from "../../utilities/store/system/actions";
import { SystemState } from "../store/system/types";
import { Login } from '../../home/dynamic/Login';

export const Auth = {
    hasAuthenticated: false,
    // hasAuthenticated: true,
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
    updateSession: (systemState: SystemState) => void;
  }

interface IAuthenticate {
    connectToSockets: () => void;
    updateSession: (systemState: SystemState) => void;
    system: SystemState;
    location: any;
}

class Authenticate extends React.Component<IAuthenticate> {    
    state = {
        loggedIn: false,
        redirectToDashboard: false,
        userName: ""
    }

    login = (props: any) => {
        console.log(props)
        Auth.authenticate(() => {
            this.setState(() => ({
                redirectToDashboard: true,
                userName: props
            }))
            this.props.connectToSockets();
            this.props.updateSession({
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
            state: { from: props.location }
        }} />
    )} />
)

const mapStateToProps = (state: AppState) => ({
    system: state.systemState,
    socket: state.socketState
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): IAuthenticateDispatchProps => ({
    connectToSockets: () => dispatch(connectSocket()),
    updateSession: (systemState: SystemState) => dispatch(updateSession(systemState))
});

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);
