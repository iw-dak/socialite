import React, { Component } from 'react';
import './FeedUser.scss';

class FeedUser extends Component {
  render() {
    return (
      <div className="FeedUser">
        <div className="line">
          <span className="description">Abonnements</span>
          <span className="descriptionCount">104</span>
        </div>

        <div className="line second">
          <div>
            <span className="description">Tweets</span>
            <span className="descriptionCount">322</span>
          </div>
          <div>
            <span className="description">Abonnés</span>
            <span className="descriptionCount">35</span>
          </div>
        </div>

        <div className="line third">
          <div className="UserProfil mt-2">
            <img className="rounded-circle" src="https://lorempixel.com/570/400?t=15632704787s897823" alt="User Profil" />
            <span className="Name">Adam Malick</span>
            <span className="UserName">@dachic</span>
          </div>
        </div>

        <div className="line buttons four">
          <button className="rounded">Follow</button>
          <button className="rounded">Message</button>
        </div>
      </div>
    );
  }
}

export default FeedUser;
