import React, { Component } from 'react';
import CommentContext from './CommentContext';
import API from '../../api';

const api = new API()
api.createEntity({ name: 'comments' })

class CommentProvider extends Component {

  state = {
    postComment: (tweetId, comment) => {
      return new Promise((resolve, reject) => {
        api.endpoints.comments.create({
          text: comment,
          tweet: tweetId
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
      <CommentContext.Provider value={this.state}>
        {this.props.children}
      </CommentContext.Provider>
    );
  }
}


export default CommentProvider;
