import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { like, resetMessage, searchPhotos } from '../../slices/photoSlice';

import useQuery from '../../hooks/useQuery';

import PhotoItem from '../../components/PhotoItem';
import LikeContainer from '../../components/LikeContainer';

import './styles.css';

function Search() {
  const query = useQuery();
  const search = query.get('q');

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  // Load photos
  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);

  // Like a photo
  const handleLike = (photo) => {
    dispatch(like(photo._id));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="search">
      <h2>Você está buscando por: {search}</h2>
      {photos && photos.map((photo) => (
        <div key={photo._id}>
          <PhotoItem photo={photo} />
          <LikeContainer photo={photo} user={user} handleLike={() => handleLike(photo)} />
          <Link className="btn" to={`/photos/${photo._id}`}>Ver mais</Link>
        </div>
      ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Não foram encontrados resultados para sua busca...
        </h2>
      )}
    </div>
  );
}

export default Search;
