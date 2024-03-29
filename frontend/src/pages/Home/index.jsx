import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPhotos, resetMessage } from '../../slices/photoSlice';

import useResetComponentMessage from '../../hooks/useResetComponentMessage';
import useCheckAuth from '../../hooks/useCheckAuth';
import useHandleLike from '../../hooks/useHandleLike';

import PhotoItem from '../../components/PhotoItem';
import LikeContainer from '../../components/LikeContainer';
import Loading from '../../components/Loading';

import './styles.css';

function Home() {
  useCheckAuth();

  const dispatch = useDispatch();

  const resetComponentMessage = useResetComponentMessage(dispatch, resetMessage);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  // Load all photos
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  // Like a photo
  const handleLike = useHandleLike(dispatch, resetComponentMessage);

  if (loading) {
    return <Loading />;
  }

  return (
    <div id="home">
      {photos && photos.map((photo) => (
        <div key={photo._id}>
          <PhotoItem photo={photo} />
          <LikeContainer photo={photo} user={user} handleLike={() => handleLike(photo)} />
          <Link className="btn" to={`/photos/${photo._id}`}>Ver mais</Link>
        </div>
      ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Ainda não há fotos publicadas,&nbsp;
          <Link to={`/users/${user.id}`}>clique aqui</Link>.
        </h2>
      )}
    </div>
  );
}

export default Home;
