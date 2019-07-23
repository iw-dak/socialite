import { createContext } from "react";

const TweetContext = createContext({
  saveTweet: () => { },
  getAllTweets: () => { }
});

export default TweetContext;
