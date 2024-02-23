import { api, requestConfig } from '../utils/config';

// Publish an user photo
const publishPhoto = async (data, token) => {
  const config = requestConfig('POST', data, token, true);

  try {
    return await fetch(`${api}/photos`, config)
      .then((response) => response.json())
      .catch((err) => err);
  } catch (error) {
    console.error(error);
  }
};

// Get user photos
const getUserPhotos = async (id, token) => {
  const config = requestConfig('GET', null, token);

  try {
    return await fetch(`${api}/users/${id}/photos`, config)
      .then((response) => response.json())
      .catch((err) => err);
  } catch (error) {
    console.error(error);
  }
};

const photoService = {
  publishPhoto,
  getUserPhotos,
};

export default photoService;
