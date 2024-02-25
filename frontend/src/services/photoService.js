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

// Delete a photo
const deletePhoto = async (id, token) => {
  const config = requestConfig('DELETE', null, token);

  try {
    return await fetch(`${api}/photos/${id}`, config)
      .then((response) => response.json())
      .catch((err) => err);
  } catch (error) {
    console.error(error);
  }
};

// Update a photo
const updatePhoto = async (data, id, token) => {
  const config = requestConfig('PUT', data, token);

  try {
    return await fetch(`${api}/photos/${id}`, config)
      .then((response) => response.json())
      .catch((err) => err);
  } catch (error) {
    console.error(error);
  }
};

// Get a photo by id
const getPhoto = async (id, token) => {
  const config = requestConfig('GET', null, token);

  try {
    return await fetch(`${api}/photos/${id}`, config)
      .then((response) => response.json())
      .catch((err) => err);
  } catch (error) {
    console.error(error);
  }
};

// Like a photo
const like = async (id, token) => {
  const config = requestConfig('PATCH', null, token);

  try {
    return await fetch(`${api}/photos/${id}/likes`, config)
      .then((response) => response.json())
      .catch((err) => err);
  } catch (error) {
    console.error(error);
  }
};

const photoService = {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
  getPhoto,
  like,
};

export default photoService;
