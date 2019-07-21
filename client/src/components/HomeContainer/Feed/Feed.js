import React, { Component } from 'react';
import './Feed.scss';
import comment from "./icons/comment.svg";
import retweet from "./icons/retweet.svg";
import like from "./icons/like.svg";

class Feed extends Component {

  render() {
    return (
      <div className="Feed rounded mb-2">
        <div className="UserProfil mt-2">
          <img className="rounded-circle" src="https://lorempixel.com/570/400?t=15632704787897823" alt="User Profil" />
          <span className="UserName">@dachic</span>
        </div>

        <div className="ContentWrapper">
          <div className="FeedHeader">
            <span className="UserName">
              Adam Malick
            </span>

            <span className="FeedTime">13 fév. 2019 - 14:51</span>
          </div>

          <div className="FeedContent">Quoi de Nunc volutpat ipsum nulla, sed fringilla est dapibus vitae. Proin sed augue eu erat luctus condimentum eget in turpis...Quoi de Nunc volutpat ipsum nulla, sed fringilla est dapibus vitae. Proin sed augue eu erat luctus condimentum eget in turpis...</div>

          <div className="FeedMetas">
            <div className="FeedMeta comments">
              <a href="#comment"><img src={comment} alt="Commenter" /></a>
              <span className="FeedCount CommentCount">27</span>
            </div>

            <div className="FeedMeta retweets">
              <a href="#retweet"><img src={retweet} alt="Retweeter" /></a>
              <span className="FeedCount RetweetCount">39</span>
            </div>

            <div className="FeedMeta likes">
              <a href="#like"><img src={like} alt="Liker" /></a>
              <span className="FeedCount LikeCount">455</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
