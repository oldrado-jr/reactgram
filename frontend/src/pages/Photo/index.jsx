import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPhoto } from '../../slices/photoSlice';

import PhotoItem from '../../components/PhotoItem';

import './styles.css';

function Photo() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { photo, loading, error, message } = useSelector((state) => state.photo);

  // Load photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
    </div>
  );
}

export default Photo;
