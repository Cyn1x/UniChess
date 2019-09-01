import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Login } from '../../home/dynamic/Login';

export const Authenticate = {
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

interface IAuthenticate {
    location: any;
}

class AuthLogin extends React.Component<IAuthenticate> {
    state = {
        redirectToReferrer: false,
        message: ""
    }
    
    login = () => {
        Authenticate.authenticate(() => {
            this.setState(() => ({
                redirectToReferrer: true
            }))
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
        Authenticate.hasAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} />
    )} />
)

export default AuthLogin;
