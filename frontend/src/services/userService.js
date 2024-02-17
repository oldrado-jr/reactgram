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

const userService = {
  profile,
};

export default userService;
