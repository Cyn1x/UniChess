import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { Login } from '../../routes/home/Login';

export const isAuthenticated = {
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

class AuthLogin extends React.Component<{location: any}> {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    isAuthenticated.authenticate(() => {
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
      <Login clicked={this.login}/>
    )
  }
}

export const PrivateRoute = ({ component: Component, ...rest }: {component: any, path: string}) => (
  <Route {...rest} render={(props) => (
    isAuthenticated.hasAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

export default AuthLogin;
