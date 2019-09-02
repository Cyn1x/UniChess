import React from 'react'
import { connect } from "react-redux";
import { AppState } from "../../utilities/store";
import { Route, Redirect } from 'react-router-dom'
import { SystemState } from "../../utilities/store/system/types";
import { updateSession } from "../../utilities/store/system/actions";
import { Login } from '../../home/dynamic/Login';

export const Auth = {
    // hasAuthenticated: false,
    hasAuthenticated: true,
    authenticate(cb: () => void) {
        this.hasAuthenticated = true
        setTimeout(cb, 1000)
    },
    signout(cb: () => void) {
        this.hasAuthenticated = false
        setTimeout(cb, 1000)
    }
}

interface IAuthenticate {
    updateSession: typeof updateSession;
    system: SystemState;
    location: any;
}

class Authenticate extends React.Component<IAuthenticate> {
    state = {
        redirectToReferrer: false,
        userName: ""
    }

    login = () => {
        Auth.authenticate(() => {
            this.setState(() => ({
                redirectToReferrer: true,
                userName: "myUser"
            }))
            this.props.updateSession({
                loggedIn: true,
                session: "my_session",
                userName: this.state.userName,
            });
        })
    }
    
    static hasAuthenticated: boolean;
    
    render() {
        const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
        const { redirectToReferrer } = this.state
        
        if (redirectToReferrer === true) {
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
    system: state.system
});

export default connect(
    mapStateToProps,
    { updateSession }
)(Authenticate);
