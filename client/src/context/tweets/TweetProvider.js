import React, { Component } from 'react';
import TweetContext from './TweetContext';
import API from '../../api';

const api = new API()
api.createEntity({ name: 'tweets' })

class TweetProvider extends Component {

  state = {
    saveTweet: (tweet) => {
      return new Promise((resolve, reject) => {
        api.endpoints.tweets.create({
          text: tweet
        }).then(({ data }) => {
          console.log(data);
          resolve();
        }).catch((error) => {
          console.log(error);
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
    getAllTweets: () => {
      return new Promise((resolve, reject) => {
        api.endpoints.tweets.getAll().then(({ data }) => {
          resolve(data);
        }).catch((error) => {
          console.log(error);
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
    }
  }

  render() {
    return (
      <TweetContext.Provider value={this.state}>
        {this.props.children}
      </TweetContext.Provider>
    );
  }
}


export default TweetProvider;
