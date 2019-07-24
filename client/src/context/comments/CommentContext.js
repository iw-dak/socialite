import { createContext } from "react";

const TweetContext = createContext({
  saveTweet: () => { },
  getAllTweets: () => { },
  updateLikes: () => { }
});

export default TweetContext;
