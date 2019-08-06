import React from 'react'
import { Route, Switch, Redirect, withRouter} from 'react-router-dom'

import { Layout } from '../../components/ui/global/Layout';
import { Home } from '../../components/routes/home/Home';
import { About } from '../../components/routes/home/About';
import { Contact } from '../../components/routes/home/Contact';
import { Signup } from '../../components/routes/home/Signup';
import { None } from '../../components/routes/home/None';

const Auth = {
  isAuthenticated: false,
  authenticate(cb: () => void) {
    this.isAuthenticated = true
    setTimeout(cb, 1000)
  },
  signout(cb: () => void) {
    this.isAuthenticated = false
    setTimeout(cb, 1000)
  }
}

class Login extends React.Component<{location: any}> {
  state = {
    redirectToReferrer: false,
  }
  login = () => {
    Auth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }: {component: any, path: string}) => (
  <Route {...rest} render={(props) => (
    Auth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }} />
  )} />
)

const AuthButton = withRouter(({ history }) => (
  Auth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        Auth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

export const AuthRoutes = () => {
  return (
      <Route render={() => (
        <Layout authenticated={Auth.isAuthenticated}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path='/dashboard' component={AuthButton} />
            <Route component={None} />
          </Switch>
      </Layout>
      )} />
  )
}

export default AuthRoutes;
