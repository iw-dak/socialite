import React, { Component } from 'react';
import './TweetBox.scss';

class TweetBox extends Component {

  handleSubmit = () => {
    console.log("HandleSubmit");
  }

  render() {
    return (
      <div className="TweetBox rounded">
        <div className="Wrapper">
          <div className="UserProfil">
            <img className="rounded-circle" src="https://lorempixel.com/570/400?t=1563270497823" alt="User Profil" />
          </div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Quoi de neuf ?" />
          </form>
        </div>
      </div>
    );
  }
}

export default TweetBox;
