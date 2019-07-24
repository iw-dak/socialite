import React, { useState } from 'react';
import './Feed.scss';
import comment from "./icons/comment.svg";
import retweet from "./icons/retweet.svg";
import like from "./icons/like.svg";
import likeFilled from "./icons/like-filled.svg";
import { formatDate, formatHours } from '../../../helpers';
import TweetContext from '../../../context/tweets/TweetContext';

const Feed = ({ feed, updateLikes }) => {

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(feed.likes.length);

  function handleLike(e) {
    e.preventDefault();
    updateLikes(feed._id).then(data => {
      setLiked(data.status);
      setLikeCount(data.tweet.likes.length)
    }).catch(error => {
      alert("Impossible d'aimer");
    });
  }

  return <div className="Feed rounded mb-2">
    <div className="UserProfil mt-2">
      <img className="rounded-circle" src={`${feed.user.image}`} alt="User Profil" />
      <span className="UserName">{feed.user.username}</span>
    </div>

    <div className="ContentWrapper">
      <div className="FeedHeader">
        <span className="UserName">
          {feed.user.firstname} {feed.user.lastname}
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
          <a href="#like" onClick={handleLike}><img src={liked ? likeFilled : like} alt="Aimer" title="Aimer" /></a>
          <span className="FeedCount LikeCount">{likeCount}</span>
        </div>
      </div>
    </div>
  </div>
}

export default React.forwardRef((props, ref) => (
  <TweetContext.Consumer>
    {({ updateLikes }) => <Feed
      {...props}
      updateLikes={updateLikes}
      ref={ref}
    />
    }
  </TweetContext.Consumer>
));
