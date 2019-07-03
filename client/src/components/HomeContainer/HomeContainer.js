import React from 'react';
import Feed from '../Feed/Feed';
import TweetBox from '../TweetBox/TweetBox';
import FeedUser from '../FeedUser/FeedUser';
import SearchBox from '../SearchBox/SearchBox';
import './HomeContainer.scss';

const HomeContainer = () => <>
  <div className="HomeContainer">

    <div className="container-fluid">
      <div className="row">
        <div className="col-9">
          <SearchBox />
        </div>
      </div>
    </div>

    <div className="container-fluid">
      <div className="row">
        <div className="col-9">
        <TweetBox />
          <Feed />
        </div>
        <div className="col-3">
          <FeedUser />
        </div>
      </div>
    </div>
  </div>
</>

export default HomeContainer;
