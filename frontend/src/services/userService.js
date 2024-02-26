import { api, fetchAPI, requestConfig } from '../utils/config';

// Get user details
const profile = async (data, token) => {
  const config = requestConfig('GET', data, token);

  try {
    return await fetchAPI(`${api}/users/profile`, config);
  } catch (error) {
    console.error(error);
  }
};

// Update user details
const updateProfile = async (data, token) => {
  const config = requestConfig('PUT', data, token, true);

  try {
    return await fetchAPI(`${api}/users`, config);
  } catch (error) {
    console.error(error);
  }
};

// Get user details
const getUserDetails = async (id) => {
  const config = requestConfig('GET');

  try {
    return await fetchAPI(`${api}/users/${id}`, config);
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
