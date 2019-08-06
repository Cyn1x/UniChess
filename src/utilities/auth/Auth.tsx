import React from 'react'
import { Route, Switch, Redirect, withRouter} from 'react-router-dom'

import { Layout } from '../../components/ui/global/Layout';
import { Home } from '../../components/routes/home/Home';
import { About } from '../../components/routes/home/About';
import { Contact } from '../../components/routes/home/Contact';
import { Login } from './Login';
import { Signup } from '../../components/routes/home/Signup';
import { None } from '../../components/routes/home/None';
import { Dashboard } from '../../components/routes/dashboard/Dashboard';

const isAuthenticated = {
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

const PrivateRoute = ({ component: Component, ...rest }: {component: any, path: string}) => (
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

export const AuthRoutes = () => {
  return (
      <Route render={() => (
        <Layout authenticated={isAuthenticated.hasAuthenticated}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Auth} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
            <Route component={None} />
          </Switch>
      </Layout>
      )} />
  )
}

export default AuthRoutes;
