import React, { useState } from 'react';
import './Comment.scss';
import CommentContext from '../../../../context/comments/CommentContext';

const Comment = ({ feed, postComment, onUpdateFeed }) => {
  const [comment, setComment] = useState('');

  const handleChange = (e) => {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    setComment(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment === '') {
      alert("Saisissez un commentaire ⚠️");
      return;
    }

    postComment(feed._id, comment).then(data => {
      onUpdateFeed(data.tweet);
      setComment('');
    }).catch(error => {
      console.log(error);
    });
  }

  return <>
    <div className="Comment modal fade" id={`tweetComment-${feed._id}`} tabIndex="-1" role="dialog" aria-labelledby="tweetCommentLabel" aria-hidden="true">
      <form onSubmit={handleSubmit}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Commentaire sur un tweet</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <textarea className="form-control" name="comment" value={comment} id="commentBoxContent" rows="5" onChange={handleChange}></textarea>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Commenter</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </>
}

export default React.forwardRef((props, ref) => (
  <CommentContext.Consumer>
    {({ postComment }) => <Comment
      {...props}
      postComment={postComment}
      ref={ref}
    />
    }
  </CommentContext.Consumer>
));
