const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const SecurityRouter = require('./routes/security');
const verifyToken = require('./middlewares/security');
const TweetRouter = require('./routes/tweet');
const UserRouter = require('./routes/user');
const CommentRouter = require('./routes/comment');
const MessageRouter = require('./routes/message');

const app = express();

app.use(cors());
app.use(bodyparser.json())
app.use('/', SecurityRouter);
app.use(verifyToken);
app.use('/tweets', TweetRouter);
app.use('/users', UserRouter);
app.use('/comments', CommentRouter);
app.use('/messages', MessageRouter);
app.listen(3000, () => console.log("Listening"));
