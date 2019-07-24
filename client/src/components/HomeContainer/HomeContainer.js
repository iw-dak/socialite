import React, { Component } from 'react';
import Feed from './Feed/Feed';
import TweetBox from './TweetBox/TweetBox';
import FeedUser from './FeedUser/FeedUser';
// import SearchBox from './SearchBox/SearchBox';
// import Trends from './Trends/Trends';
import './HomeContainer.scss';
import TweetContext from '../../context/tweets/TweetContext';

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feeds: []
    }
  }

  componentDidMount() {
    this.props.getAllTweets().then((data) => {
      this.setState({
        feeds: data
      })
    });
  }

  updateFeeds = (feed) => {
    var dataFeeds = [
      feed,
      ...this.state.feeds
    ];

    dataFeeds = dataFeeds.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    this.setState({
      feeds: dataFeeds
    });

  }

  render() {
    return (
      <div className="HomeContainer">

        {/* <div className="container-fluid pt-4 pb-4">
          <div className="row">
            <div className="col-9">
              <SearchBox />
            </div>
          </div>
        </div> */}

        <div className="container-fluid pt-0 pb-4 pt-4">
          <div className="row">
            <div className="col-9 TweetBoxWrapper">
              <TweetBox onUpdateFeeds={this.updateFeeds} />
              <hr />
              {(this.state.feeds.length > 0) &&
                this.state.feeds.map((feed, index) => <Feed key={feed._id} feed={feed} />)}
            </div>

            <div className="col-3">
              <FeedUser />
              {/* <Trends /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <TweetContext.Consumer>
    {({ getAllTweets }) => <HomeContainer
      {...props}
      getAllTweets={getAllTweets}
      ref={ref}
    />
    }
  </TweetContext.Consumer>
));
