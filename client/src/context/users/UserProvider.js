import React, { Component } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import API from '../../api';
import { AuthStore } from '../../helpers';

const api = new API()
api.createEntity({ name: 'users' })

class UserProvider extends Component {

  state = {
    userLogin: (user) => {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_API_URL}/login`, {
          email: user.email,
          password: user.password
        }).then(({ data }) => {
          AuthStore.storeToken(data.token).then(() => {
            AuthStore.storeUserInfo(data.user).then(() => {
              resolve();
            }).catch(() => {
              reject();
            });
          }).catch(() => {
            reject();
          });
        }).catch((error) => {
          // Error 😨
          if (error.response) {
            if (error.response.status === 422) {
              reject({
                errorMessage: error.response.data
              });
            } else if (error.response.status === 500) {
              reject({
                errorMessage: "🤔 Une erreur inattendue s'est produite, réessayez ou contactez un administrateur"
              });
            } else {
              reject({
                errorMessage: error.response.data
              });
            }
          } else if (error.request) {
            reject({
              errorMessage: "Une erreur inattendue s'est produite, réessayez ou contactez un administrateur"
            });
          } else {
            // Something happened in setting up the request and triggered an Error
            reject({
              errorMessage: error.message
            });
          }
        });
      });
    },
    userRegister: (user) => {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_API_URL}/register`, {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: user.password
        }).then(({ data }) => {
          AuthStore.storeToken(data.token).then(() => {
            AuthStore.storeUserInfo(data.user).then(() => {
              resolve();
            }).catch(() => {
              reject({
                errorMessage: "User store error"
              });
            });
          }).catch(() => {
            reject({
              errorMessage: "Token store error"
            });
          });
        }).catch((error) => {
          // Error 😨
          if (error.response) {
            if (error.response.status === 422) {
              reject({
                errorMessage: error.response.data
              });
            }

            if (error.response.status === 500) {
              reject({
                errorMessage: "Une erreur inattendue s'est produite, réessayez ou contactez un administrateur"
              });
            }

            if (error.response.status === 400) {
              reject({
                errorMessage: error.response.data
              });
            }
          } else if (error.request) {
            reject({
              errorMessage: "Une erreur inattendue s'est produite, réessayez ou contactez un administrateur"
            });
          } else {
            // Something happened in setting up the request and triggered an Error
            reject({
              errorMessage: error.message
            });
          }
        });
      });
    },
    getRandomUser: () => {
      return new Promise((resolve, reject) => {
        api.endpoints.users.getSpecific({ id: 'random' }).then(({ data }) => {
          resolve(data);
        }).catch((error) => {
          // Error 😨
          if (error.response) {
            if (error.response.status === 422) {
              reject({
                errorMessage: error.response.data
              });
            }

            if (error.response.status === 500) {
              reject({
                errorMessage: "Une erreur inattendue s'est produite, réessayez ou contactez un administrateur"
              });
            }

            if (error.response.status === 400) {
              reject({
                errorMessage: error.response.data
              });
            }
          } else if (error.request) {
            reject({
              errorMessage: "Une erreur inattendue s'est produite, réessayez ou contactez un administrateur"
            });
          } else {
            // Something happened in setting up the request and triggered an Error
            reject({
              errorMessage: error.message
            });
          }
        });
      });
    },
    followUser: (userId) => {
      return new Promise((resolve, reject) => {
        api.endpoints.users.patch({ id: 'follow' }, {
          userId: userId
        }).then(({ data }) => {
          resolve(data);
        }).catch((error) => {
          console.log(error);
          // Error 😨
          if (error.response) {
            if (error.response.status === 401) {
              reject({
                errorMessage: error.response.data
              });
            }

            if (error.response.status === 500) {
              reject({
                errorMessage: "Une erreur inattendue s'est produite, réessayez ou contactez un administrateur"
              });
            }

          } else if (error.request) {
            reject({
              errorMessage: "Une erreur inattendue s'est produite, réessayez ou contactez un administrateur"
            });
          }
        });
      });
    },
    unFollowUser: (userId) => {
      return new Promise((resolve, reject) => {
        api.endpoints.users.patch({ id: 'unfollow' }, {
          userId: userId
        }).then(({ data }) => {
          resolve(data);
        }).catch((error) => {
          console.log(error);
          // Error 😨
          if (error.response) {
            if (error.response.status === 401) {
              reject({
                errorMessage: error.response.data
              });
            }

            if (error.response.status === 500) {
              reject({
                errorMessage: "Une erreur inattendue s'est produite, réessayez ou contactez un administrateur"
              });
            }

          } else if (error.request) {
            reject({
              errorMessage: "Une erreur inattendue s'est produite, réessayez ou contactez un administrateur"
            });
          }
        });
      });
    }
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}


export default UserProvider;
