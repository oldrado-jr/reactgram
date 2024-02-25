import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { uploads } from '../../utils/config';
import { comment, getPhoto, like, resetMessage } from '../../slices/photoSlice';

import PhotoItem from '../../components/PhotoItem';
import LikeContainer from '../../components/LikeContainer';
import Message from '../../components/Message';

import './styles.css';

function Photo() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector((state) => state.photo);

  const [commentText, setCommentText] = useState('');

  // Load photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  // Add a like
  const handleLike = () => {
    dispatch(like(photo._id));

    resetComponentMessage();
  };

  // Add a comment
  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      comment: commentText,
      id: photo._id,
    };

    dispatch(comment(commentData));

    setCommentText('');

    resetComponentMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </div>
      {photo.comments && (
        <>
          <div className="comments">
            <h3>Comentários: ({photo.comments.length})</h3>
            <form onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Insira o seu comentário..."
                value={commentText || ''}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <input type="submit" value="Enviar" />
            </form>
            {photo.comments.length === 0 && <p>Não há comentários...</p>}
            {photo.comments.map(({ comment, userImage, userName, userId }) => (
              <div className="comment" key={comment}>
                <div className="author">
                  {userImage && (
                    <img
                      src={`${uploads}/users/${userImage}`}
                      alt={userName}
                    />
                  )}
                  <Link to={`/users/${userId}`}>
                    <p>{userName}</p>
                  </Link>
                </div>
                <p>{comment}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Photo;
