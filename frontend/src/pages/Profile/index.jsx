import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs';

import { getUserDetails } from '../../slices/userSlice';
import {
  deletePhoto,
  getUserPhotos,
  publishPhoto,
  resetMessage
} from '../../slices/photoSlice';
import { uploads } from '../../utils/config';
import Message from '../../components/Message';

import './styles.css';

function Profile() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  // New form end edit form refs
  const newPhotoForm = useRef();

  // Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image,
    };

    // build form data
    const formData = new FormData();

    Object.keys(photoData).forEach(
      (key) => formData.append(key, photoData[key])
    );

    dispatch(publishPhoto(formData));

    setTitle('');

    resetComponentMessage();
  };

  // Change image state
  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
  };

  // Delete a photo
  const handleDelete = (id) => {
    dispatch(deletePhoto(id));

    resetComponentMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img
            src={`${uploads}/users/${user.profileImage}`}
            alt={user.name}
          />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth.id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe algum momento seu:</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Título para a foto:</span>
                <input
                  type="text"
                  placeholder="Insira um título"
                  value={title || ''}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                <span>Imagem:</span>
                <input type="file" onChange={handleFile} />
              </label>
              {!loadingPhoto && <input type="submit" value="Postar" />}
              {loadingPhoto && <input type="submit" value="Aguarde..." disabled />}
            </form>
          </div>
          {errorPhoto && <Message msg={errorPhoto} type="error" />}
          {messagePhoto && <Message msg={messagePhoto} type="success" />}
        </>
      )}
      <div className="user-photos">
        <h2>Fotos publicadas:</h2>
        <div className="photos-container">
          {photos && photos.map(({ _id, title, image }) => (
            <div className="photo" key={_id}>
              {image && (
                <img
                  src={`${uploads}/photos/${image}`}
                  alt={title}
                />
              )}
              {id === userAuth.id ? (
                <div className="actions">
                  <Link to={`/photos/${_id}`}>
                    <BsFillEyeFill />
                  </Link>
                  <BsPencilFill />
                  <BsXLg onClick={() => handleDelete(_id)} />
                </div>
              ) : (
                <Link className="btn" to={`/photos/${_id}`}>
                  Ver
                </Link>
              )}
            </div>
          ))}
          {photos.length === 0 && <p>Ainda não há fotos publicadas.</p>}
        </div>
      </div>
    </div>
  );
}

export default Profile;
