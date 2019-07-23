import React from 'react';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { PrivateRoute } from './helpers';
import UserProvider from './context/users/UserProvider';
import Logout from './components/Logout/Logout';
import TweetProvider from './context/tweets/TweetProvider';

const App = () => <>
  <UserProvider>
    <TweetProvider>
      <Router>
        <Switch>
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/register" component={Register} />
          <PrivateRoute path="/account/feeds" component={Home} />
          <PrivateRoute path="/account/profil" component={Home} />
          <PrivateRoute path="/logout" component={Logout} />
          <Route path="/auth/register" component={Register} />
          <Route exact path="/" render={() => <Redirect to="/auth/login" />} />
        </Switch>
      </Router>
    </TweetProvider>
  </UserProvider>
</>;

export default App;
