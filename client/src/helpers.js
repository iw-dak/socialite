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
    return new Promise((resolve, reject) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (!localStorage.getItem('token') && !localStorage.getItem('user')) {
        resolve()
      } else {
        reject();
      }
    });
  },
  isAuthenticated() {
    return (localStorage.getItem('token') && localStorage.getItem('user'));
  },
  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
};

export function formatDate(date) {
  date = (new Date(date)); // toLocaleString('fr-FR')

  var monthNames = [
    "Janvier", "Février", "Mars",
    "Avril", "Mai", "Juin", "Juillet",
    "Août", "Septembre", "Octobre",
    "Novembre", "Décembre"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

export function formatHours(date) {
  date = (new Date(date)); // toLocaleString('fr-FR')
  return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
