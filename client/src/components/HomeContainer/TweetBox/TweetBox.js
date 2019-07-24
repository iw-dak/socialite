import React, { Component } from 'react';
import './TweetBox.scss';
import { AuthStore } from '../../../helpers';
import TweetContext from '../../../context/tweets/TweetContext';

class TweetBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tweet: ''
    }
  }

  handleChange = e => {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.tweet === '') {
      alert("Saisissez un tweet ⚠️");
      return;
    }

    this.props.saveTweet(this.state.tweet).then((tweet) => {
      this.setState({
        tweet: ''
      })

      this.props.onUpdateFeeds(tweet);
      alert("✅ Votre tweet a été posté");
    }).catch(response => {
      console.log("===>", response)
      alert(response.errorMessage);
    });
  }

  render() {
    let user = AuthStore.getUser();

    return (
      <div className="TweetBox rounded">
        <div className="Wrapper">
          <div className="UserProfil">
            <img className="rounded-circle" src="https://lorempixel.com/570/400?t=1563270497823" alt={`${user.firstname} ${user.lastname}`} title={`${user.firstname} ${user.lastname}`} />
          </div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="tweet" placeholder="Quoi de neuf ?" value={this.state.tweet} onChange={this.handleChange} />
          </form>
        </div>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <TweetContext.Consumer>
    {({ saveTweet }) => <TweetBox
      {...props}
      saveTweet={saveTweet}
      ref={ref}
    />
    }
  </TweetContext.Consumer>
));
