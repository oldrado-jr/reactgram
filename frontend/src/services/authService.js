import { api, requestConfig } from '../utils/config';

// Register an user
const register = async (data) => {
  const config = requestConfig('POST', data);

  try {
    const response = await fetch(`${api}/users/register`, config);
    const jsonResponse = await response.json();

    if (jsonResponse) {
      localStorage.setItem('user', JSON.stringify(jsonResponse));
    }

    return jsonResponse;
  } catch (error) {
    console.error(error);
  }
};

const authService = {
  register,
};

export default authService;
