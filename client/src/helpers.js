import React from "react"
import {
  Route,
  Redirect
} from "react-router-dom";

export function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        AuthStore.isAuthenticated() ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/auth/login",
                redirectUrl: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

export const AuthStore = {
  storeToken(token) {
    return new Promise((resolve, reject) => {
      localStorage.setItem('token', token);
      if (localStorage.getItem('token')) {
        resolve();
      } else {
        reject();
      }
    });
  },
  storeUserInfo(userInfo) {
    return new Promise((resolve, reject) => {
      localStorage.setItem('user', JSON.stringify(userInfo));
      if (localStorage.getItem('token')) {
        resolve();
      } else {
        reject();
      }
    });
  },
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  isAuthenticated() {
    return (localStorage.getItem('token') && localStorage.getItem('user'));
  },
  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

};
