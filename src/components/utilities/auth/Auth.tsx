import React from 'react'
import { Route, Redirect, withRouter} from 'react-router-dom'

import { Login } from '../../routes/home/Login';

export const isAuthenticated = {
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

class Auth extends React.Component<{location: any}> {
  state = {
    redirectToReferrer: false,
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
          pathname: '/',
          state: { from: props.location }
        }} />
  )} />
)

 const AuthButton = withRouter(({ history }) => (
  isAuthenticated.hasAuthenticated ? (
    <p>
      <button onClick={() => {
        isAuthenticated.signout(() => history.push('/'))
        }}>Sign out</button>
    </p>
  ) : (
    null
  )
))

export default Auth;
