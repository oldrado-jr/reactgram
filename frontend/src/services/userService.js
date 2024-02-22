import { api, requestConfig } from '../utils/config';

// Get user details
const profile = async (data, token) => {
  const config = requestConfig('GET', data, token);

  try {
    return await fetch(`${api}/users/profile`, config)
      .then((response) => response.json())
      .catch((err) => err);
  } catch (error) {
    console.error(error);
  }
};

// Update user details
const updateProfile = async (data, token) => {
  const config = requestConfig('PUT', data, token, true);

  try {
    return await fetch(`${api}/users`, config)
      .then((response) => response.json())
      .catch((err) => err);
  } catch (error) {
    console.error(error);
  }
};

// Get user details
const getUserDetails = async (id) => {
  const config = requestConfig('GET');

  try {
    return await fetch(`${api}/users/${id}`, config)
      .then((response) => response.json())
      .catch((err) => err);
  } catch (error) {
    console.error(error);
  }
};

const userService = {
  profile,
  updateProfile,
  getUserDetails,
};

export default userService;
