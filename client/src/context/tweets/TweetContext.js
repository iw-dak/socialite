import { createContext } from "react";

const TweetContext = createContext({
  saveTweet: () => { },
  getAllTweets: () => { },
  updateLikes: () => { },
  sendMessage: () => { }
});

export default TweetContext;
