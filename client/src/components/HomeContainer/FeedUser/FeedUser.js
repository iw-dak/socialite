import React, { useState, useEffect } from 'react';
import './FeedUser.scss';
import UserContext from '../../../context/users/UserContext';
import { AuthStore } from '../../../helpers';

const FeedUser = ({ getRandomUser, followUser, unFollowUser }) => {
  const [user, setUser] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const authUserId = AuthStore.getUser()._id;

  useEffect(() => {
    setTimeout(() => {
      getRandomUser().then(data => {
        setUser(data);
        const isFollower = data.followers.indexOf(authUserId);
        if (isFollower === -1) {
          setIsFollowing(false);
        } else {
          setIsFollowing(true);
        }
      }).catch(error => {
        console.log(error)
      });
    }, 1000);

  }, [getRandomUser, authUserId]);

  const follow = () => {
    followUser(user._id).then(data => {
      setUser(data.user);
      setIsFollowing(true);
    }).catch(error => {
      console.log(error);
      alert("Une erreur s'est produite. Réessayez");
    });
  }

  const unfollow = () => {
    unFollowUser(user._id).then(data => {
      setUser(data.user);
      setIsFollowing(false);
    }).catch(error => {
      alert("Une erreur s'est produite. Réessayez");
    });
  }

  return (
    <div className={`FeedUser rounded ${!user && 'loader'}`}>
      {
        !user ?
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          :
          <>
            <div className="line">
              <span className="description">Abonnements</span>
              <span className="descriptionCount">{user.followers.length}</span>
            </div>

            <div className="line second">
              <div>
                <span className="description">Tweets</span>
                <span className="descriptionCount">{user.tweets.length}</span>
              </div>

              <div>
                <span className="description">Abonnés</span>
                <span className="descriptionCount">{user.following.length}</span>
              </div>
            </div>

            <div className="line third">
              <div className="UserProfil mt-2">
                <img className="rounded-circle" src={`${user.image}`} alt="User Profil" />
                <span className="Name mt-2">{user.firstname} {user.lastname}</span>
                <span className="UserName">{user.username}</span>
              </div>
            </div>

            <div className="line buttons four">
              {isFollowing ? <button className="rounded" onClick={unfollow}>Ne plus suivre</button> :
                <button className="rounded" onClick={follow}>Suivre</button>}
              <button className="rounded">Message</button>
            </div>
          </>
      }

    </div>
  );
}

export default React.forwardRef((props, ref) => (
  <UserContext.Consumer>
    {({ getRandomUser, followUser, unFollowUser }) => <FeedUser
      {...props}
      getRandomUser={getRandomUser}
      followUser={followUser}
      unFollowUser={unFollowUser}
      ref={ref}
    />
    }
  </UserContext.Consumer>
));
