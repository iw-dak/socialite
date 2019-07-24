import React, { useState, useEffect } from 'react';
import './FeedUser.scss';
import UserContext from '../../../context/users/UserContext';
import { AuthStore } from '../../../helpers';
import TweetContext from '../../../context/tweets/TweetContext';

const FeedUser = ({ getRandomUser, followUser, unFollowUser, sendMessage }) => {
  const [user, setUser] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [messageText, setMessageText] = useState('');
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

  const handleChangeMessage = (e) => {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    setMessageText(value);
  }

  const message = (e) => {
    e.preventDefault();
    if (messageText === '') {
      alert('Saisissez un message');
      return;
    }

    sendMessage(user._id, messageText).then((data) => {

    }).catch((error) => {
      console.log("Erreur lors de l'envoi du message");
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
              <button className="rounded" data-toggle="modal" data-target="#messageModal">Message</button>
            </div>

            <div className="modal fade" id="messageModal" tabIndex="-1" role="dialog" aria-labelledby="messageModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <form onSubmit={message}>

                    <div className="modal-header">
                      <h5 className="modal-title" id="messageModalLabel">Envoyer un message</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    <div className="modal-body">
                      <textarea className="form-control" name="messageText" value={messageText} id="commentBoxContent" rows="5" onChange={handleChangeMessage}></textarea>
                    </div>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                      <button type="submit" className="btn btn-primary">Envoyer</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
      }

    </div>
  );
}

export default React.forwardRef((props, ref) => (
  <UserContext.Consumer>
    {({ getRandomUser, followUser, unFollowUser }) => <TweetContext.Consumer>
      {({ sendMessage }) => <FeedUser
        {...props}
        getRandomUser={getRandomUser}
        followUser={followUser}
        unFollowUser={unFollowUser}
        sendMessage={sendMessage}
        ref={ref}
      />}
    </TweetContext.Consumer>
    }
  </UserContext.Consumer>
));
