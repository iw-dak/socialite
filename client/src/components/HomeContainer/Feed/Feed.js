import React, { useState } from 'react';
import './Feed.scss';
import comment from "./icons/comment.svg";
import retweet from "./icons/retweet.svg";
import like from "./icons/like.svg";
import likeFilled from "./icons/like-filled.svg";
import { formatDate, formatHours, AuthStore } from '../../../helpers';
import TweetContext from '../../../context/tweets/TweetContext';
import Comment from './Comment/Comment';

const Feed = ({ feed, updateLikes }) => {
  const autUser = AuthStore.getUser();

  const [liked, setLiked] = useState(feed.likes.indexOf(autUser._id) !== -1);
  const [currentFeed, setCurrentFeed] = useState(feed);
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

  const updateFeed = (feed) => {
    setCurrentFeed(feed);
    setLikeCount(feed.likes.length);
    setLikeCount(feed.likes.indexOf(autUser._id) !== -1);
  }

  return <div className="Feed rounded mb-2">
    <div className="UserProfil mt-2">
      <img className="rounded-circle" src={`${currentFeed.user.image}`} alt="User Profil" />
      <span className="UserName">{currentFeed.user.username}</span>
    </div>

    <div className="ContentWrapper">
      <div className="FeedHeader">
        <span className="UserName">
          {currentFeed.user.firstname} {currentFeed.user.lastname}
        </span>

        <span className="FeedTime">{formatDate(currentFeed.createdAt)} à {formatHours(currentFeed.createdAt)}</span>
      </div>

      <div className="FeedContent">{currentFeed.text}</div>

      <div className="FeedMetas">
        <div className="FeedMeta comments">
          <a href="#comment" data-toggle="modal" data-target={`#tweetComment-${currentFeed._id}`}><img src={comment} alt="Commenter" title="Commenter" /></a>
          <span className="FeedCount CommentCount">{currentFeed.comments.length}</span>
          <Comment feed={currentFeed} onUpdateFeed={updateFeed} />
        </div>

        <div className="FeedMeta retweets">
          <a href="#retweet"><img src={retweet} alt="Retweeter" title="Retweeter" /></a>
          <span className="FeedCount RetweetCount">{currentFeed.retweeters.length}</span>
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
