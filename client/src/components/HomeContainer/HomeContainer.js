import React from 'react';
import Feed from './Feed/Feed';
import TweetBox from './TweetBox/TweetBox';
import FeedUser from './FeedUser/FeedUser';
import SearchBox from './SearchBox/SearchBox';
import Trends from './Trends/Trends';
import './HomeContainer.scss';

const HomeContainer = () => <>
  <div className="HomeContainer">

    <div className="container-fluid pt-4 pb-4">
      <div className="row">
        <div className="col-9">
          <SearchBox />
        </div>
      </div>
    </div>

    <div className="container-fluid pt-0 pb-4">
      <div className="row">
        <div className="col-9 TweetBoxWrapper">
          <TweetBox />
          <hr />
          <Feed />
          <Feed />
          <Feed />
          <Feed />
          <Feed />
          <Feed />
          <Feed />
          <Feed />
          <Feed />
          <Feed />
          <Feed />
          <Feed />
          <Feed />
        </div>
        <div className="col-3">
          <FeedUser />
          <Trends />
        </div>
      </div>
    </div>
  </div>
</>

export default HomeContainer;
