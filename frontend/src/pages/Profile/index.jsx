import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { profile } from '../../slices/userSlice';
import { uploads } from '../../utils/config';

import './styles.css';

function Profile() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  // Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // Fill form with user data
  useEffect(() => {
    if (!user) {
      return;
    }

    setName(user.name);
    setEmail(user.email);
    setBio(user.bio || '');
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0];

    setPreviewImage(image);

    // update image state
    setProfileImage(image);
  };

  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">
        Adicione uma imagem de perfil e conte mais sobre você...
      </p>
      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profileImage}`
          }
          alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          disabled
          value={email || ''}
        />
        <label>
          <span>Imagem do perfil:</span>
          <input
            type="file"
            onChange={handleFile}
          />
        </label>
        <label>
          <span>Bio:</span>
          <input
            type="text"
            placeholder="Descrição do perfil"
            value={bio || ''}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <input
            type="password"
            placeholder="Digite sua nova senha"
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Atualizar" />
      </form>
    </div>
  );
}

export default Profile;
