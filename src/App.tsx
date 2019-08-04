import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import routes
import { Layout } from './components/home/ui/Layout'
import { Home } from './components/home/routes/Home';
import { About } from './components/home/routes/About';
import { Contact } from './components/home/routes/Contact';
import { Login } from './components/home/routes/Login';
import { Signup } from './components/home/routes/Signup';
import { None } from './components/home/routes/None'

// import static ui elements
import { GlobalStyle } from './default.styled'
import { NavigationBar } from './components/home/ui/Nav';
import { Footer } from './components/home/ui/Footer';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
        <Router>
          <NavigationBar />
          <Layout>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route component={None} />
              </Switch>
          </Layout>
        </Router>
      <Footer />
    </React.Fragment>
  );
}

export default App;
