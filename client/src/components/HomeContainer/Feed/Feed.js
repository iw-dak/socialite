import React from 'react';
import './Feed.scss';
import comment from "./icons/comment.svg";
import retweet from "./icons/retweet.svg";
import like from "./icons/like.svg";
import { formatDate, formatHours } from '../../../helpers';

const Feed = ({ feed }) => <>
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

        <span className="FeedTime">{formatDate(feed.createdAt)} à {formatHours(feed.createdAt)}</span>
      </div>

      <div className="FeedContent">{feed.text}</div>

      <div className="FeedMetas">
        <div className="FeedMeta comments">
          <a href="#comment"><img src={comment} alt="Commenter" title="Commenter" /></a>
          <span className="FeedCount CommentCount">{feed.comments.length}</span>
        </div>

        <div className="FeedMeta retweets">
          <a href="#retweet"><img src={retweet} alt="Retweeter" title="Retweeter" /></a>
          <span className="FeedCount RetweetCount">{feed.retweeters.length}</span>
        </div>

        <div className="FeedMeta likes">
          <a href="#like"><img src={like} alt="Liker" title="Liker" /></a>
          <span className="FeedCount LikeCount">{feed.likes.length}</span>
        </div>
      </div>
    </div>
  </div>
</>

export default Feed;
